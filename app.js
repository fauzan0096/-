// app.js
let currentTab = 'qaida';
let currentLessonIndex = 0;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    renderQaida();
});

// Navigation Logic
function switchTab(tabId, btnElement) {
    currentTab = tabId;
    
    // Update UI active state
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    // Render content based on tab
    if (tabId === 'qaida') {
        renderQaida();
    } else if (tabId === 'stories') {
        renderStories();
    } else if (tabId === 'duas') {
        renderDuas();
    } else if (tabId === 'games') {
        renderGames();
    }
}

// 1. Render Qaida Section
function renderQaida() {
    const main = document.getElementById('main-content');
    let html = '<div class="fade-in">';
    
    // Tabs for Lessons
    html += '<div class="tabs-scroll">';
    qaidaData.forEach((lesson, index) => {
        html += `<button class="tab-btn ${index === currentLessonIndex ? 'active' : ''}" onclick="changeLesson(${index})">${lesson.title.split(':')[0]}</button>`;
    });
    html += '</div>';

    // Current Lesson Content
    const currentLesson = qaidaData[currentLessonIndex];
    html += `<div class="section-title">${currentLesson.title}</div>`;
    html += `<div class="section-desc">${currentLesson.description}</div>`;
    
    html += '<div class="grid-container">';
    currentLesson.items.forEach(item => {
        html += `
            <div class="letter-card" onclick="playAudio('${item.audio}', '${item.ar}')">
                <div class="arabic-text">${item.ar}</div>
                <div class="roman-text">${item.ro}</div>
            </div>
        `;
    });
    html += '</div></div>';
    
    main.innerHTML = html;
    updateProgress();
}

// Change Lesson Function
function changeLesson(index) {
    currentLessonIndex = index;
    renderQaida();
}

// 2. Render Stories Section
function renderStories() {
    const main = document.getElementById('main-content');
    let html = '<div class="fade-in">';
    html += `<div class="section-title">🕌 Qasas ul Anbiya</div>`;
    html += `<div class="section-desc">Bachon ke liye Islami Kahaniyan</div>`;
    
    storiesData.forEach(story => {
        html += `
            <div class="story-card" style="border-left-color: ${story.color}">
                <h3>${story.title}</h3>
                <p>${story.desc}</p>
                <button class="btn-play" onclick="playAudio('${story.audio}', '${story.title}')">▶ Suniye</button>
            </div>
        `;
    });
    html += '</div>';
    main.innerHTML = html;
}

// 3. Render Duas Section
function renderDuas() {
    const main = document.getElementById('main-content');
    let html = '<div class="fade-in">';
    html += `<div class="section-title">🤲 Masnoon Duaein</div>`;
    html += `<div class="grid-container">
        <div class="letter-card" onclick="playAudio('dua_1', 'Bismillah')">
            <div class="arabic-text">بِسْمِ اللَّهِ</div>
            <div class="roman-text">Khane se pehle</div>
        </div>
        <div class="letter-card" onclick="playAudio('dua_2', 'Alhamdulillah')">
            <div class="arabic-text">الْحَمْدُ لِلَّهِ</div>
            <div class="roman-text">Khane ke baad</div>
        </div>
        <div class="letter-card" onclick="playAudio('dua_3', 'Allahumma')">
            <div class="arabic-text">اللَّهُمَّ</div>
            <div class="roman-text">Sone se pehle</div>
        </div>
    </div></div>`;
    main.innerHTML = html;
}

// 4. Render Games Section
function renderGames() {
    const main = document.getElementById('main-content');
    let html = '<div class="fade-in">';
    html += `<div class="section-title">⭐ Khel aur Inaam</div>`;
    html += `<div class="story-card" style="text-align: center; border-left-color: var(--secondary);">
        <h3>Jald Aa Raha Hai!</h3>
        <p>Yahan aap huruf pehchanne ka game khel sakenge aur sitare (Stars) kamayenge.</p>
    </div></div>`;
    main.innerHTML = html;
}

// Audio Player Logic
function playAudio(audioId, textToSpeak) {
    // NOTE: Yahan aap apni Qari ki MP3 files laga sakte hain.
    // Jaise: const audio = new Audio('audio/' + audioId + '.mp3'); audio.play();
    
    // Filhal ke liye Web Speech API (TTS) use ho raha hai demo ke liye
    if ('speechSynthesis' in window) {
        // Agar pehle koi aawaz chal rahi hai toh usay rokein
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'ar-SA'; // Arabic accent
        utterance.rate = 0.7; // Slow for kids
        utterance.pitch = 1.1; // Slightly higher pitch for kids
        
        // Visual feedback
        const audioPlayer = document.getElementById('audio-player');
        audioPlayer.src = ''; // In case mp3 is not used
        
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Aapke browser mein audio support nahi hai.");
    }
}

// Progress Tracker (Demo)
function updateProgress() {
    // Calculate progress based on current lesson
    const totalLessons = qaidaData.length;
    const progress = ((currentLessonIndex + 1) / totalLessons) * 100;
    document.getElementById('global-progress').style.width = `${progress}%`;
}
