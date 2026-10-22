let currentUser = null;
let currentLessonIndex = -1;
let currentItemIndex = 0;
let recognition = null;
let isListening = false;
let canvas, ctx, isDrawing = false;

// --- NAYA AASAAN LOGIN LOGIC ---
function login() {
    const name = document.getElementById('name').value.trim();
    const pass = document.getElementById('pass').value.trim();
    const msg = document.getElementById('login-msg');

    if (!name || !pass) {
        msg.innerText = "Naam aur Password dono likhein!";
        return;
    }

    // 1. ADMIN CHECK
    if (name.toLowerCase() === 'fauzan gorme' && pass === 'Fauzan8087') {
        currentUser = { name: "Fauzan Gorme", role: "admin" };
        localStorage.setItem('app_user', JSON.stringify(currentUser));
        initApp();
        return;
    }

    // 2. GUEST CHECK
    if (pass === 'Fauzan123') {
        currentUser = { name: name, role: "guest" };
        localStorage.setItem('app_user', JSON.stringify(currentUser));
        initApp();
        return;
    }

    // 3. GALAT PASSWORD
    msg.innerText = "Password galat hai! (Admin: Fauzan8087, Guest: Fauzan123)";
}

function initApp() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'block';
    document.getElementById('user-display').innerText = currentUser.name;
    
    if (currentUser.role === 'admin') {
        document.getElementById('admin-panel').style.display = 'flex';
    } else {
        document.getElementById('guest-logout').style.display = 'block';
    }

    renderQaida();
    renderDuas();
    renderStories();
    setupSpeechRecognition();
    initCanvas();
}

function logout() {
    localStorage.removeItem('app_user');
    window.location.reload();
}

// --- TABS LOGIC ---
function switchTab(tabId, btnElement) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    
    document.getElementById('page-' + tabId).classList.add('active');
    btnElement.classList.add('active');
}

// --- RENDER FUNCTIONS ---
function renderQaida() {
    const grid = document.getElementById('qaida-grid');
    grid.innerHTML = '';
    let unlockedLevel = parseInt(localStorage.getItem('unlocked_level') || '0');

    qaidaData.forEach((lesson, index) => {
        const isLocked = index > unlockedLevel && currentUser.role !== 'admin';
        let html = `
            <div class="q-card ${isLocked ? 'locked' : ''}" onclick="${isLocked ? '' : `openLesson(${index})`}">
                ${isLocked ? '<span class="lock-icon">🔒</span>' : ''}
                <h3>${lesson.title}</h3>
                <p>${lesson.desc}</p>
            </div>
        `;
        grid.innerHTML += html;
    });
}

function unlockAll() {
    localStorage.setItem('unlocked_level', qaidaData.length);
    renderQaida();
}

function renderDuas() {
    const list = document.getElementById('duas-list');
    list.innerHTML = '';
    duasData.forEach(dua => {
        list.innerHTML += `
            <div class="dua-card">
                <div class="dua-info">
                    <h3>${dua.ar}</h3>
                    <p>${dua.ro}</p>
                </div>
                <button class="btn-play-small" onclick="playCustomAudio('${dua.voice}')">🔊</button>
            </div>
        `;
    });
}

function renderStories() {
    const list = document.getElementById('stories-list');
    list.innerHTML = '';
    waqiaatData.forEach(story => {
        list.innerHTML += `
            <div class="story-card">
                <div class="story-emoji">${story.emoji}</div>
                <div class="story-info">
                    <h3>${story.title}</h3>
                    <p>${story.desc}</p>
                </div>
            </div>
        `;
    });
}

// --- LESSON VIEW ---
function openLesson(index) {
    currentLessonIndex = index;
    currentItemIndex = 0; 
    document.getElementById('lesson-view').style.display = 'flex';
    loadLetter();
}

function loadLetter() {
    const lesson = qaidaData[currentLessonIndex];
    const item = lesson.items[currentItemIndex];
    
    document.getElementById('current-letter').innerText = item.ar;
    document.getElementById('current-roman').innerText = item.ro;
    document.getElementById('board-bg-letter').innerText = item.ar;
    
    document.getElementById('voice-status').innerText = "Mic dabayein";
    document.getElementById('voice-status').className = "voice-status";
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('board-box').style.display = 'none';
    document.getElementById('clear-btn').style.display = 'none';
    clearCanvas();
    
    playCustomAudio(item.voice);
}

function closeLesson() {
    document.getElementById('lesson-view').style.display = 'none';
    if(isListening) recognition.stop();
}

// --- AUDIO SYSTEM ---
function playCustomAudio(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ar-SA';
        utterance.rate = 0.7;
        window.speechSynthesis.speak(utterance);
    }
}

function playAudio() {
    const item = qaidaData[currentLessonIndex].items[currentItemIndex];
    playCustomAudio(item.voice);
}

// --- VOICE RECOGNITION ---
function setupSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return console.log("No voice support");

    recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA';
    recognition.interimResults = false;

    recognition.onstart = function() {
        isListening = true;
        document.getElementById('mic-btn').classList.add('listening');
        document.getElementById('voice-status').innerText = "Sun raha hoon...";
    };

    recognition.onresult = function(event) {
        const spokenText = event.results[0][0].transcript;
        const targetVoice = qaidaData[currentLessonIndex].items[currentItemIndex].voice;
        const match = calculateSimilarity(spokenText, targetVoice);
        
        if (match >= 70) {
            document.getElementById('voice-status').innerText = `MashaAllah! (${match}%)`;
            document.getElementById('voice-status').className = "voice-status voice-success";
            document.getElementById('next-btn').style.display = 'block';
        } else {
            document.getElementById('voice-status').innerText = `Koshish karein (${match}%)`;
            document.getElementById('voice-status').className = "voice-status voice-fail";
        }
    };

    recognition.onerror = function() { resetMic(); };
    recognition.onend = function() { resetMic(); };
}

function startListening() {
    if (!recognition) return alert("Browser supports nahi karta.");
    if (isListening) return;
    recognition.start();
}

function resetMic() {
    isListening = false;
    document.getElementById('mic-btn').classList.remove('listening');
}

// MATCHING ALGORITHM
function calculateSimilarity(str1, str2) {
    const cleanStr = (str) => str.replace(/[\u064B-\u0652]/g, '');
    const s1 = cleanStr(str1), s2 = cleanStr(str2);
    const track = Array(s2.length + 1).fill(null).map(() => Array(s1.length + 1).fill(null));
    for (let i = 0; i <= s1.length; i += 1) track[0][i] = i;
    for (let j = 0; j <= s2.length; j += 1) track[j][0] = j;
    for (let j = 1; j <= s2.length; j += 1) {
        for (let i = 1; i <= s1.length; i += 1) {
            const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
            track[j][i] = Math.min(track[j][i - 1] + 1, track[j - 1][i] + 1, track[j - 1][i - 1] + indicator);
        }
    }
    const distance = track[s2.length][s1.length];
    const maxLength = Math.max(s1.length, s2.length);
    if (maxLength === 0) return 100;
    return Math.round(((maxLength - distance) / maxLength) * 100);
}

// --- CANVAS BOARD ---
function initCanvas() {
    canvas = document.getElementById('tracing-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#8E44AD';

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    canvas.addEventListener('touchstart', handleTouchStart, {passive: false});
    canvas.addEventListener('touchmove', handleTouchMove, {passive: false});
    canvas.addEventListener('touchend', stopDrawing);
}

function toggleBoard() {
    const box = document.getElementById('board-box');
    const btn = document.getElementById('clear-btn');
    if (box.style.display === 'none') {
        box.style.display = 'block';
        btn.style.display = 'inline-block';
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

function stopDrawing() { isDrawing = false; }

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
    if(ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// --- PROGRESS & NEXT ---
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
    renderQaida(); 
}

window.onload = function() {
    const savedUser = localStorage.getItem('app_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        initApp();
    }
};
