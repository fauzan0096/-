let currentUser = null;
let currentLessonIndex = -1;
let currentItemIndex = 0;
let recognition = null;
let isListening = false;
let canvas, ctx, isDrawing = false;

// --- LOGIN LOGIC ---
function login() {
    const name = document.getElementById('name').value.trim();
    const pass = document.getElementById('pass').value.trim();
    const msg = document.getElementById('login-msg');

    if (!name || !pass) { msg.innerText = "Naam aur Password likhein!"; return; }

    // Admin Check
    if (name.toLowerCase() === 'fauzan gorme' && pass === 'Fauzan8087') {
        currentUser = { name: "Fauzan Gorme", role: "admin" };
    } 
    // Guest Check
    else if (pass === 'Fauzan123') {
        currentUser = { name: name, role: "guest" };
    } 
    else {
        msg.innerText = "Password galat hai! (Admin: Fauzan8087, Guest: Fauzan123)";
        return;
    }

    localStorage.setItem('app_user', JSON.stringify(currentUser));
    initApp();
}

function initApp() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'block';
    document.getElementById('user-display').innerText = currentUser.name;
    
    renderQaida();
    renderDuas();
    renderStories();
    setupSpeechRecognition();
    initCanvas();
}

function toggleAdminPanel() {
    const panel = document.getElementById('admin-panel');
    if (panel.style.display === 'flex') {
        panel.style.display = 'none';
    } else if (currentUser.role === 'admin') {
        panel.style.display = 'flex';
    }
}

function logout() {
    localStorage.removeItem('app_user');
    window.location.reload();
}

// --- TAB SWITCHING ---
function switchTab(tabId, menuElement) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + tabId).classList.add('active');

    if(menuElement) {
        document.querySelectorAll('.q-menu-item').forEach(item => item.classList.remove('active'));
        menuElement.classList.add('active');
    }

    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    if(tabId === 'qaida') document.querySelectorAll('.nav-item')[0].classList.add('active');
    if(tabId === 'duas') document.querySelectorAll('.nav-item')[1].classList.add('active');
    if(tabId === 'stories') document.querySelectorAll('.nav-item')[2].classList.add('active');
    
    window.scrollTo(0, 0);
}

// --- RENDER FUNCTIONS ---
function renderQaida() {
    const list = document.getElementById('sabaq-list');
    list.innerHTML = '';
    let unlockedLevel = parseInt(localStorage.getItem('unlocked_level') || '0');

    qaidaData.forEach((lesson, index) => {
        const isLocked = index > unlockedLevel && currentUser.role !== 'admin';
        let html = `
            <div class="sabaq-card ${isLocked ? 'locked' : ''}" onclick="${isLocked ? '' : `openLesson(${index})`}">
                <div class="sabaq-info">
                    <h3>${lesson.title}</h3>
                    <p>${lesson.desc}</p>
                </div>
                <div class="sabaq-action">
                    ${isLocked ? '🔒' : '▶️'}
                </div>
            </div>
        `;
        list.innerHTML += html;
    });
}

function unlockAll() {
    localStorage.setItem('unlocked_level', qaidaData.length);
    renderQaida();
    document.getElementById('admin-panel').style.display = 'none';
}

function renderDuas() {
    const list = document.getElementById('duas-list');
    list.innerHTML = '';
    duasData.forEach(dua => {
        list.innerHTML += `
            <div class="list-card dua-card">
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
            <div class="list-card story-card">
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
    
    document.getElementById('voice-status').innerText = "Mic dabayein aur bolain";
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

// --- VOICE RECOGNITION (STRONG VERSION) ---
function setupSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        console.log("Voice recognition not supported in this browser.");
        return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA'; // Arabic
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
        const match = calculateSimilarity(spokenText, targetVoice);
        
        if (match >= 70) {
            document.getElementById('voice-status').innerText = `MashaAllah! (${match}% Sahi)`;
            document.getElementById('voice-status').className = "voice-status voice-success";
            document.getElementById('next-btn').style.display = 'block';
        } else {
            document.getElementById('voice-status').innerText = `Koshish karein (${match}% Match)`;
            document.getElementById('voice-status').className = "voice-status voice-fail";
        }
    };

    // ERROR HANDLING (Taa ke pata chale masla kya hai)
    recognition.onerror = function(event) {
        console.error("Speech Error:", event.error);
        let errorMsg = "Aawaz nahi aayi.";
        if (event.error === 'not-allowed') {
            errorMsg = "Mic ki permission nahi mili. Settings mein Allow karein.";
        } else if (event.error === 'no-speech') {
            errorMsg = "Kuch sunai nahi diya, phir se bolain.";
        } else if (event.error === 'network') {
            errorMsg = "Internet connection check karein.";
        }
        document.getElementById('voice-status').innerText = errorMsg;
        document.getElementById('voice-status').className = "voice-status voice-fail";
        resetMic();
    };

    recognition.onend = function() {
        resetMic();
    };
}

async function startListening() {
    if (!recognition) {
        alert("Aapka browser Voice Recognition support nahi karta. (Please use Google Chrome)");
        return;
    }
    if (isListening) return;

    try {
        // Yeh line browser se mic ki permission mangwayegi
        await navigator.mediaDevices.getUserMedia({ audio: true });
        recognition.start();
    } catch (err) {
        alert("Mic permission block hai. Browser settings mein jakar mic ko Allow karein.");
        console.error(err);
    }
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
    ctx.strokeStyle = '#0F4C81';

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
    renderQaida(); 
}

window.onload = function() {
    const savedUser = localStorage.getItem('app_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        initApp();
    }
};
