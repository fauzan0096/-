let currentTab = 'qaida';
let currentLessonIndex = 0;
let deferredPrompt;

document.addEventListener('DOMContentLoaded', () => {
    renderQaida();
    setupPWAInstall();
    checkForUpdates();
});

// --- UPDATE SYSTEM ---
function checkForUpdates() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').then(reg => {
            reg.addEventListener('updatefound', () => {
                const newWorker = reg.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        showUpdateBanner(newWorker);
                    }
                });
            });
        });
        let refreshing;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (refreshing) return;
            window.location.reload();
            refreshing = true;
        });
    }
}

function showUpdateBanner(worker) {
    const banner = document.createElement('div');
    banner.style.cssText = `position: fixed; bottom: 85px; left: 10px; right: 10px; background: #f39c12; color: white; padding: 15px; border-radius: 12px; text-align: center; font-weight: bold; box-shadow: 0 4px 15px rgba(0,0,0,0.2); z-index: 1000; display: flex; justify-content: space-between; align-items: center;`;
    banner.innerHTML = `<span>✨ Naya Update Aaya Hai!</span><button id="up-btn" style="background: #fff; color: #f39c12; border: none; padding: 8px 15px; border-radius: 8px; font-weight: 800; cursor: pointer;">Update</button>`;
    document.body.appendChild(banner);
    document.getElementById('up-btn').addEventListener('click', () => {
        banner.innerText = 'Updating...';
        worker.postMessage({ type: 'SKIP_WAITING' });
    });
}

// --- PWA INSTALL ---
function setupPWAInstall() {
    const installBtn = document.getElementById('install-btn');
    if (window.matchMedia('(display-mode: standalone)').matches) {
        installBtn.style.display = 'none';
        return;
    }
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installBtn.style.display = 'block';
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') installBtn.style.display = 'none';
                deferredPrompt = null;
            }
        });
    });
    window.addEventListener('appinstalled', () => { installBtn.style.display = 'none'; });
}

// --- NAVIGATION ---
function switchTab(tabId, btnElement) {
    currentTab = tabId;
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    if (tabId === 'qaida') renderQaida();
    else if (tabId === 'namaz') renderNamaz();
    else if (tabId === 'surahs') renderSurahs();
    else if (tabId === 'duas') renderDuas();
    else if (tabId === 'stories') renderStories();
}

// --- RENDER FUNCTIONS ---
function renderQaida() {
    const main = document.getElementById('main-content');
    let html = '<div class="fade-in"><div class="tabs-scroll">';
    qaidaData.forEach((lesson, index) => {
        html += `<button class="tab-btn ${index === currentLessonIndex ? 'active' : ''}" onclick="changeLesson(${index})">${lesson.title.split(':')[0]}</button>`;
    });
    html += '</div>';
    
    const currentLesson = qaidaData[currentLessonIndex];
    html += `<div class="section-title">${currentLesson.title}</div><div class="section-desc">${currentLesson.description}</div><div class="grid-container">`;
    currentLesson.items.forEach(item => {
        html += `<div class="letter-card" onclick="playAudio('${item.audio}', '${item.ar}')"><div class="arabic-text">${item.ar}</div><div class="roman-text">${item.ro}</div></div>`;
    });
    html += '</div></div>';
    main.innerHTML = html;
    updateProgress();
}

function changeLesson(index) { currentLessonIndex = index; renderQaida(); }

function renderNamaz() {
    const main = document.getElementById('main-content');
    let html = '<div class="fade-in"><div class="section-title">🕌 Namaz Ka Tareeqa</div><div class="section-desc">Ahle Hadith ke Mutabiq</div>';
    namazData.forEach(item => {
        html += `<div class="dua-card"><div class="arabic-text">${item.ar}</div><div class="roman-text">${item.ro}</div><div class="ref">${item.ref}</div><button class="btn-play" style="margin-top: 10px;" onclick="playAudio('${item.audio}', '${item.ar}')">▶ Suniye</button></div>`;
    });
    main.innerHTML = html + '</div>';
}

function renderSurahs() {
    const main = document.getElementById('main-content');
    let html = '<div class="fade-in"><div class="section-title">📜 Choti Surahein</div><div class="section-desc">Hifazat aur Namaz ke liye</div>';
    surahsData.forEach(surah => {
        html += `<div class="dua-card" style="text-align: right;"><h3 style="color: var(--primary); font-size: 16px;">${surah.ro}</h3><div class="arabic-text" style="font-size: 24px; line-height: 1.8;">${surah.ar}</div><div class="ref">${surah.ref}</div><button class="btn-play" style="margin-top: 10px; float: left;" onclick="playAudio('${surah.audio}', '${surah.ro}')">▶ Play</button><div style="clear: both;"></div></div>`;
    });
    main.innerHTML = html + '</div>';
}

function renderDuas() {
    const main = document.getElementById('main-content');
    let html = '<div class="fade-in"><div class="section-title">🤲 Masnoon Duaein</div><div class="section-desc">Sahih Hadith se sabit</div>';
    duasData.forEach(dua => {
        html += `<div class="dua-card"><div class="arabic-text">${dua.ar}</div><div class="roman-text">${dua.ro}</div><div class="ref">Reference: ${dua.ref}</div><button class="btn-play" style="margin-top: 10px;" onclick="playAudio('${dua.audio}', '${dua.ar}')">▶ Suniye</button></div>`;
    });
    main.innerHTML = html + '</div>';
}

function renderStories() {
    const main = document.getElementById('main-content');
    let html = '<div class="fade-in"><div class="section-title">📚 Qasas ul Anbiya</div><div class="section-desc">Bachon ke liye 28 Islami Kahaniyan</div>';
    storiesData.forEach(story => {
        html += `<div class="story-card" style="border-left-color: ${story.color}"><h3>${story.title}</h3><p>${story.desc}</p><button class="btn-play" onclick="playAudio('${story.audio}', '${story.title}')">▶ Suniye</button></div>`;
    });
    main.innerHTML = html + '</div>';
}

function updateProgress() {
    const progress = ((currentLessonIndex + 1) / qaidaData.length) * 100;
    document.getElementById('global-progress').style.width = `${progress}%`;
}

// --- AUDIO SYSTEM ---
function playAudio(audioId, textToSpeak) {
    // Asal MP3 play karne ki koshish karein (audio folder mein hona chahiye)
    const audio = new Audio('audio/' + audioId + '.mp3');
    
    audio.play().then(() => {
        // Agar MP3 mil gayi toh kuch nahi karna, bas play ho jayegi
    }).catch(e => {
        // Agar MP3 nahi mili, toh Robot (TTS) aawaz mein padh kar sunao
        console.log("MP3 not found, using TTS.");
        fallbackTTS(textToSpeak);
    });
}

function fallbackTTS(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ar-SA'; 
        utterance.rate = 0.75; 
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
    }
}
