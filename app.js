'use strict';

const ADMIN_NAME = 'fauzan gorme';
const ADMIN_PASS = 'Fauzan8087';
const GUEST_PASS = 'Fauzan123';
const XP_PER_LEVEL = 150;

let currentUser = null;
let progress = null;
let currentLessonIndex = -1;
let currentItemIndex = 0;
let soundOn = true;

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function lsGet(key, fallback = null) { try { const v = localStorage.getItem(key); return v === null ? fallback : v; } catch (e) { return fallback; } }
function lsSet(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }
function lsDel(key) { try { localStorage.removeItem(key); } catch (e) {} }
function dayStr(d) { return d.toLocaleDateString('en-CA'); }

function loadProgress() {
    const key = 'qa_progress:' + currentUser.name.toLowerCase();
    let p = null;
    try { p = JSON.parse(lsGet(key, 'null')); } catch (e) { p = null; }
    if (!p) {
        p = { unlocked: 0, xp: 0, streak: 0, lastDay: '', storiesRead: [], best: {}, namaz: {}, akhlaqDone: [], huroofKnown: [], gharOwned: [], sikkaSpent: 0, memorized: [], heard: [], totalGames: 0, daily: null };
    }
    p.daily = p.daily || null;
    p.totalGames = p.totalGames || 0;
    progress = p;
    progress._key = key;
}

const progressHooks = [];
function saveProgress() {
    const copy = Object.assign({}, progress);
    delete copy._key;
    lsSet(progress._key, JSON.stringify(copy));
    for (const fn of progressHooks) { try { fn(); } catch (e) {} }
}

function touchStreak() {
    const today = dayStr(new Date());
    if (progress.lastDay === today) return;
    const y = new Date(); y.setDate(y.getDate() - 1);
    progress.streak = progress.lastDay === dayStr(y) ? progress.streak + 1 : 1;
    progress.lastDay = today;
    saveProgress();
}

function addXP(n) {
    if (!n || n <= 0) return;
    progress.xp += n;
    saveProgress();
    renderStats();
}

function toast(text) {
    const t = $('toast');
    if(!t) return;
    $('toast-text').textContent = text;
    t.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove('show'), 1800);
}

function login(e) {
    if (e) e.preventDefault();
    const name = $('name').value.trim();
    const pass = $('pass').value.trim();
    const msg = $('login-msg');
    msg.textContent = '';

    if (!name || !pass) { msg.textContent = 'Naam aur Password likhein.'; return; }

    if (name.toLowerCase() === ADMIN_NAME && pass === ADMIN_PASS) {
        currentUser = { name: 'Fauzan Gorme', role: 'admin' };
    } else if (pass === GUEST_PASS) {
        currentUser = { name: name, role: 'guest' };
    } else {
        msg.textContent = 'Password galat hai.';
        return;
    }
    
    setSound(true);
    lsSet('app_user', JSON.stringify(currentUser));
    initApp();
}

function logout() {
    lsDel('app_user');
    window.location.reload();
}

function initApp() {
    $('login-screen').hidden = true;
    $('app-screen').hidden = false;
    $('user-display').textContent = currentUser.name;
    $('user-avatar').textContent = currentUser.name.charAt(0).toUpperCase();
    $('greeting-title').textContent = 'Assalamu Alaikum, ' + currentUser.name.split(' ')[0];

    loadProgress();
    touchStreak();

    renderStats();
    renderQaida();
    renderStories();
    if(typeof renderSurahList === 'function') renderSurahList();
    if(typeof updateAkhlaqHero === 'function') updateAkhlaqHero();
    if(typeof updateGharHero === 'function') updateGharHero();
}

function switchTab(tabId) {
    document.querySelectorAll('.page').forEach((p) => p.classList.remove('active'));
    const page = $('page-' + tabId);
    if(page) page.classList.add('active');
    document.querySelectorAll('.nav-item').forEach((n) => n.classList.toggle('active', n.dataset.tab === tabId));
    window.scrollTo(0, 0);
}

function renderStats() {
    if (!progress) return;
    const level = Math.floor(progress.xp / XP_PER_LEVEL) + 1;
    const inLevel = progress.xp % XP_PER_LEVEL;
    const done = Math.min(progress.unlocked, qaidaData.length);
    $('st-level').textContent = 'Lvl ' + level;
    $('st-streak').textContent = progress.streak + ' din';
    $('st-done').textContent = done + '/' + qaidaData.length;
    $('xp-left').textContent = progress.xp + ' XP';
    $('xp-next').textContent = 'Agla level: ' + (XP_PER_LEVEL - inLevel) + ' XP door';
    $('xp-bar').style.width = Math.round((inLevel / XP_PER_LEVEL) * 100) + '%';
}

function renderQaida() {
    const list = $('sabaq-list');
    if(!list) return;
    $('sabaq-count').textContent = qaidaData.length + ' sabaq';

    list.innerHTML = qaidaData.map((lesson, index) => {
        const done = index < progress.unlocked;
        const current = index === progress.unlocked;
        const locked = index > progress.unlocked && currentUser.role !== 'admin';
        const parts = lesson.title.split(':');
        const heading = (parts[1] || lesson.title).trim();
        return `
            <button class="sabaq-card ${done?'done':''} ${current?'current':''}" data-lesson="${index}" ${locked ? 'disabled' : ''}>
                <span class="num">${index + 1}</span>
                <span class="info"><h3>${esc(heading)}</h3><p>${lesson.items.length} items</p></span>
            </button>`;
    }).join('');
}

function renderStories() {
    const list = $('stories-list');
    if(!list) return;
    list.innerHTML = waqiaatData.map((s, i) => `
        <button class="sabaq-card" data-story="${i}" style="direction:ltr; text-align:left;">
            <span class="num" style="background:${s.color||'var(--navy)'}; color:#fff; margin-right:12px; margin-left:0;">${s.emoji}</span>
            <span class="info"><h3>${esc(s.name)}</h3><p>${esc(s.tag)} • 2 min</p></span>
        </button>
    `).join('');
}

function openStory(i) {
    if (i < 0 || i >= waqiaatData.length) return;
    const s = waqiaatData[i];
    const r = $('story-reader');
    r.innerHTML = `
        <div style="padding:20px;">
            <button class="btn btn-ghost" id="story-close" style="margin-bottom:20px">← Wapas</button>
            <h2 style="font-size:2rem; color:var(--navy)">${s.emoji} ${esc(s.name)}</h2>
            <p style="color:#666; margin-bottom:20px" class="ar">${esc(s.ar)}</p>
            <div style="font-size:1.1rem; line-height:1.6; color:#333">
                ${s.body.map(p => `<p style="margin-bottom:15px">${esc(p)}</p>`).join('')}
            </div>
            <div style="background:#FFF3E0; padding:15px; border-radius:15px; margin-top:20px; border:2px solid #FFE0B2;">
                <b style="color:#E65100; display:block; margin-bottom:5px">Seekh:</b>
                <p>${esc(s.seekh)}</p>
            </div>
            <button class="btn btn-gold btn-lg btn-block" id="story-read-done" style="margin-top:20px">✓ Padh Liya</button>
        </div>`;
    r.classList.add('open');
    r.scrollTop = 0;
    
    $('story-close').onclick = () => r.classList.remove('open');
    $('story-read-done').onclick = () => {
        if(!progress.storiesRead.includes(s.id)) {
            progress.storiesRead.push(s.id);
            addXP(10);
            saveProgress();
        }
        r.classList.remove('open');
    };
}

let arVoice = null;
function pickVoice() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    arVoice = voices.find((v) => /^ar/i.test(v.lang)) || null;
}
if ('speechSynthesis' in window) {
    pickVoice();
    window.speechSynthesis.addEventListener('voiceschanged', pickVoice);
}

function setSound(on) {
    soundOn = on;
    lsSet('sound_on', on ? '1' : '0');
    if (!on && 'speechSynthesis' in window) window.speechSynthesis.cancel();
}

function speakAr(text, rate) {
    if (!soundOn) return;
    if (!('speechSynthesis' in window)) return;
    try {
        window.speechSynthesis.cancel(); 
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'ar-SA';
        if (arVoice) u.voice = arVoice;
        u.rate = rate || 0.75;
        window.speechSynthesis.speak(u);
    } catch (e) {}
}

function openLesson(index) {
    currentLessonIndex = index;
    currentItemIndex = 0;
    $('lesson-view').classList.add('open');
    loadLetter();
}

function loadLetter() {
    const lesson = qaidaData[currentLessonIndex];
    const item = lesson.items[currentItemIndex];
    $('current-letter').textContent = item.ar;
    $('current-roman').textContent = item.ro;
    $('lesson-title').textContent = lesson.title;
    $('lesson-count').textContent = (currentItemIndex + 1) + ' / ' + lesson.items.length;
    $('lesson-bar').style.width = ((currentItemIndex + 1) / lesson.items.length * 100) + '%';
    speakAr(item.voice, 0.7); 
}

function completeLesson() {
    const lesson = qaidaData[currentLessonIndex];
    if (currentItemIndex < lesson.items.length - 1) {
        currentItemIndex++;
        loadLetter();
        return;
    }
    if (currentLessonIndex === progress.unlocked) {
        progress.unlocked++;
        addXP(20);
        saveProgress();
    }
    $('lesson-view').classList.remove('open');
    renderQaida();
    renderStats();
}

function ensureDaily() {
    const today = dayStr(new Date());
    if (!progress.daily || progress.daily.date !== today) {
        progress.daily = { date: today, items: 0, surahs: [], played: false, rewarded: false };
    }
    return progress.daily;
}

function bumpDaily(kind, val) {
    if (!progress) return;
    const d = ensureDaily();
    if (kind === 'items') d.items++;
    if (kind === 'surah' && !d.surahs.includes(val)) d.surahs.push(val);
    if (kind === 'played') d.played = true;
    saveProgress();
}

window.addEventListener('DOMContentLoaded', () => {
    $('login-form').addEventListener('submit', login);
    $('menu-logout').addEventListener('click', logout);

    document.querySelector('.bottom-nav').addEventListener('click', (e) => {
        const b = e.target.closest('.nav-item');
        if (b) switchTab(b.dataset.tab);
    });

    $('sabaq-list').addEventListener('click', (e) => {
        const c = e.target.closest('.sabaq-card');
        if (c && !c.disabled) openLesson(parseInt(c.dataset.lesson, 10));
    });

    $('stories-list').addEventListener('click', (e) => {
        const c = e.target.closest('.sabaq-card');
        if (c) openStory(parseInt(c.dataset.story, 10));
    });

    $('lesson-close').addEventListener('click', () => $('lesson-view').classList.remove('open'));
    $('btn-listen').addEventListener('click', () => {
        const item = qaidaData[currentLessonIndex].items[currentItemIndex];
        speakAr(item.voice, 0.7);
    });
    $('btn-prev').addEventListener('click', () => {
        if (currentItemIndex > 0) { currentItemIndex--; loadLetter(); }
    });
    $('next-btn').addEventListener('click', completeLesson);

    const saved = lsGet('app_user');
    if (saved) {
        try {
            const u = JSON.parse(saved);
            if (u && u.name) { currentUser = u; initApp(); }
        } catch (e) { lsDel('app_user'); }
    }
});
