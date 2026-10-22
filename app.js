let currentUser = null;
let currentLessonIndex = -1;
let currentItemIndex = 0;
let recognition = null;
let isListening = false;
let canvas, ctx, isDrawing = false;

// --- LOGIN LOGIC ---
function login() {
    const role = document.getElementById('role').value;
    const name = document.getElementById('name').value.trim();
    const pass = document.getElementById('pass').value;
    const msg = document.getElementById('login-msg');

    if (!name) { msg.innerText = "Naam likhein!"; return; }

    if (role === 'admin') {
        if (name.toLowerCase() !== 'fauzan gorme' || pass !== 'Fauzan8087') {
            msg.innerText = "Admin details galat hain!"; return;
        }
        currentUser = { name: "Fauzan Gorme", role: "admin" };
    } else {
        if (pass !== 'Fauzan123') { msg.innerText = "Guest Password galat hai!"; return; }
        currentUser = { name: name, role: "guest" };
    }

    localStorage.setItem('app_user', JSON.stringify(currentUser));
    initApp();
}

function initApp() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'block';
    document.getElementById('user-name-display').innerText = currentUser.name;
    
    if (currentUser.role === 'admin') {
        document.getElementById('admin-panel').style.display = 'flex';
    } else {
        document.getElementById('logout-btn').style.display = 'block';
    }

    renderDashboard();
    setupSpeechRecognition();
    initCanvas();
}

function logout() {
    localStorage.removeItem('app_user');
    window.location.reload();
}

// --- DASHBOARD & LOCKING ---
function renderDashboard() {
    const dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = '';
    
    let unlockedLevel = parseInt(localStorage.getItem('unlocked_level') || '0');

    qaidaData.forEach((lesson, index) => {
        const isLocked = index > unlockedLevel && currentUser.role !== 'admin';
        let html = `
            <div class="lesson-card ${isLocked ? 'locked' : ''}" onclick="${isLocked ? '' : `openLesson(${index})`}">
                ${isLocked ? '<span class="lock-icon">🔒</span>' : ''}
                <h3>${lesson.title}</h3>
                <p>${lesson.desc}</p>
            </div>
        `;
        dashboard.innerHTML += html;
    });
}

function unlockAll() {
    localStorage.setItem('unlocked_level', qaidaData.length);
    renderDashboard();
}

// --- LESSON VIEW ---
function openLesson(index) {
    currentLessonIndex = index;
    currentItemIndex = 0; 
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('lesson-view').style.display = 'flex';
    loadLetter();
}

function loadLetter() {
    const lesson = qaidaData[currentLessonIndex];
    const item = lesson.items[currentItemIndex];
    
    document.getElementById('current-letter').innerText = item.ar;
    document.getElementById('current-roman').innerText = item.ro;
    document.getElementById('bg-letter').innerText = item.ar;
    
    // Reset UI
    document.getElementById('voice-status').innerText = "Mic dabayein aur bolain";
    document.getElementById('voice-status').className = "voice-status";
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('canvas-box').style.display = 'none';
    document.getElementById('clear-btn').style.display = 'none';
    clearCanvas();
    
    playAudio();
}

function closeLesson() {
    document.getElementById('lesson-view').style.display = 'none';
    document.getElementById('dashboard').style.display = 'grid';
    if(isListening) recognition.stop();
}

// --- AUDIO ---
function playAudio() {
    const item = qaidaData[currentLessonIndex].items[currentItemIndex];
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(item.ro);
        utterance.lang = 'ar-SA';
        utterance.rate = 0.7;
        window.speechSynthesis.speak(utterance);
    }
}

// --- VOICE RECOGNITION & 70% MATCHING ---
function setupSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.log("Voice recognition not supported.");
        return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = function() {
        isListening = true;
        document.getElementById('mic-btn').classList.add('listening');
        document.getElementById('voice-status').innerText = "Sun raha hoon... (Bolain)";
        document.getElementById('voice-status').className = "voice-status";
    };

    recognition.onresult = function(event) {
        const spokenText = event.results[0][0].transcript;
        const targetVoice = qaidaData[currentLessonIndex].items[currentItemIndex].voice;
        
        const matchPercentage = calculateSimilarity(spokenText, targetVoice);
        
        if (matchPercentage >= 70) {
            document.getElementById('voice-status').innerText = `MashaAllah! (${matchPercentage}% Sahi)`;
            document.getElementById('voice-status').className = "voice-status voice-success";
            document.getElementById('next-btn').style.display = 'block';
            playSuccessSound();
        } else {
            document.getElementById('voice-status').innerText = `Koshish karein (${matchPercentage}% Match)`;
            document.getElementById('voice-status').className = "voice-status voice-fail";
        }
    };

    recognition.onerror = function(event) {
        document.getElementById('voice-status').innerText = "Aawaz nahi aayi, phir se try karein.";
        document.getElementById('voice-status').className = "voice-status voice-fail";
        resetMic();
    };

    recognition.onend = function() {
        resetMic();
    };
}

function startListening() {
    if (!recognition) {
        alert("Aapka browser is feature ko support nahi karta. (Chrome use karein)");
        return;
    }
    if (isListening) return;
    recognition.start();
}

function resetMic() {
    isListening = false;
    document.getElementById('mic-btn').classList.remove('listening');
}

function playSuccessSound() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1);
    osc.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
}

// --- MATCHING ALGORITHM ---
function calculateSimilarity(str1, str2) {
    const cleanStr = (str) => str.replace(/[\u064B-\u0652]/g, '');
    const s1 = cleanStr(str1);
    const s2 = cleanStr(str2);
    const track = Array(s2.length + 1).fill(null).map(() => Array(s1.length + 1).fill(null));
    
    for (let i = 0; i <= s1.length; i += 1) track[0][i] = i;
    for (let j = 0; j <= s2.length; j += 1) track[j][0] = j;
    
    for (let j = 1; j <= s2.length; j += 1) {
        for (let i = 1; i <= s1.length; i += 1) {
            const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
            track[j][i] = Math.min(
                track[j][i - 1] + 1,
                track[j - 1][i] + 1,
                track[j - 1][i - 1] + indicator
            );
        }
    }
    
    const distance = track[s2.length][s1.length];
    const maxLength = Math.max(s1.length, s2.length);
    if (maxLength === 0) return 100;
    return Math.round(((maxLength - distance) / maxLength) * 100);
}

// --- CANVAS TRACING ---
function initCanvas() {
    canvas = document.getElementById('tracing-canvas');
    ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#D4AF37';

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    canvas.addEventListener('touchstart', handleTouchStart, {passive: false});
    canvas.addEventListener('touchmove', handleTouchMove, {passive: false});
    canvas.addEventListener('touchend', stopDrawing);
}

function toggleTracing() {
    const box = document.getElementById('canvas-box');
    const btn = document.getElementById('clear-btn');
    if (box.style.display === 'none') {
        box.style.display = 'block';
        btn.style.display = 'block';
        box.scrollIntoView({ behavior: 'smooth' });
    } else {
        box.style.display = 'none';
        btn.style.display = 'none';
    }
}

function startDrawing(e) {
    isDrawing = true;
    ctx.beginPath();
    const rect = canvas.getBoundingClientRect();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function draw(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
}

function handleTouchStart(e) {
    e.preventDefault();
    if(e.touches.length === 1){
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
    }
}

function handleTouchMove(e) {
    e.preventDefault();
    if(isDrawing && e.touches.length === 1){
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
        ctx.stroke();
    }
}

function clearCanvas() {
    if(ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// --- PROGRESS ---
function completeLesson() {
    const lesson = qaidaData[currentLessonIndex];
    if (currentItemIndex < lesson.items.length - 1) {
        currentItemIndex++;
        loadLetter();
    } else {
        let unlockedLevel = parseInt(localStorage.getItem('unlocked_level') || '0');
        if (currentLessonIndex === unlockedLevel) {
            localStorage.setItem('unlocked_level', unlockedLevel + 1);
        }
        document.getElementById('success-modal').style.display = 'flex';
    }
}

function closeSuccess() {
    document.getElementById('success-modal').style.display = 'none';
    closeLesson();
    renderDashboard();
}

window.onload = function() {
    const savedUser = localStorage.getItem('app_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        initApp();
    }
};
