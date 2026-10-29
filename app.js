'use strict';

const ADMIN_NAME = 'fauzan gorme';
const ADMIN_PASS = 'Fauzan8087';
const GUEST_PASS = 'Fauzan123';
const XP_PER_LEVEL = 150;

let currentUser = null;
let progress = null;
let currentLessonIndex = -1;
let currentItemIndex = 0;
let currentStoryIndex = -1;

const $ = (id) => document.getElementById(id);
const ico = (name, cls = '') => `<svg class="i ${cls}"><use href="#i-${name}"/></svg>`;
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
        p = { unlocked: 0, xp: 0, streak: 0, lastDay: '', storiesRead: [], best: {}, namaz: {}, akhlaqDone: [], badges: [] };
    }
    p.storiesRead = p.storiesRead || [];
    p.best = p.best || {};
    p.namaz = p.namaz || {};
    p.akhlaqDone = p.akhlaqDone || [];
    p.badges = p.badges || [];
    progress = p;
    progress._key = key;
}

function saveProgress() {
    const copy = Object.assign({}, progress);
    delete copy._key;
    lsSet(progress._key, JSON.stringify(copy));
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
    
    loadProgress();
    touchStreak();

    renderStats();
    renderQaida();
    renderStories();
}

function renderStats() {
    if (!progress) return;
    const level = Math.floor(progress.xp / XP_PER_LEVEL) + 1;
    const done = Math.min(progress.unlocked, qaidaData.length);
    $('st-level').textContent = level;
    $('st-streak').textContent = progress.streak;
    $('st-done').textContent = done + '/' + qaidaData.length;
}

function renderQaida() {
    const list = $('sabaq-list');
    const admin = currentUser.role === 'admin';
    
    list.innerHTML = qaidaData.map((lesson, index) => {
        const done = index < progress.unlocked;
        const current = index === progress.unlocked;
        const locked = index > progress.unlocked && !admin;
        const parts = lesson.title.split(':');
        const heading = (parts[1] || lesson.title).trim();
        const cls = ['sabaq-card', done ? 'done' : '', current ? 'current' : '', locked ? 'locked' : ''].join(' ');
        
        return `
            <button class="${cls}" data-lesson="${index}" ${locked ? 'disabled' : ''}>
                <span class="num">${index + 1}</span>
                <span class="info"><h3>${esc(heading)}</h3><p>${lesson.items.length} items</p></span>
            </button>`;
    }).join('');
}

function renderStories() {
    $('stories-list').innerHTML = waqiaatData.map((s, i) => {
        return `
            <button class="sabaq-card" data-story="${i}" style="margin-bottom:10px; width:100%; text-align:left; direction:ltr;">
                <span class="num" style="background:var(--yellow); color:#333; margin-right:15px; margin-left:0;">${s.emoji}</span>
                <span class="info"><h3>${esc(s.name)}</h3><p>${esc(s.tag)} • 2 min</p></span>
            </button>`;
    }).join('');
}

// Story Reader Logic
function openStory(i) {
    if (i < 0 || i >= waqiaatData.length) return;
    currentStoryIndex = i;
    const s = waqiaatData[i];
    const r = $('story-reader');

    r.innerHTML = `
        <div style="padding:20px;">
            <button class="btn-kid btn-blue" id="story-close" style="margin-bottom:20px">← Wapas</button>
            <h2 style="font-size:2rem; color:var(--blue-dark)">${s.emoji} ${esc(s.name)}</h2>
            <p style="color:#777; margin-bottom:20px">${esc(s.ar)}</p>
            <div style="font-size:1.1rem; line-height:1.6; color:#333">
                ${s.body.map(p => `<p style="margin-bottom:15px">${esc(p)}</p>`).join('')}
            </div>
            <div style="background:#FFF3E0; padding:15px; border-radius:15px; margin-top:20px; border:2px solid #FFE0B2;">
                <b style="color:#E65100; display:block; margin-bottom:5px">Seekh:</b>
                <p>${esc(s.seekh)}</p>
            </div>
            <button class="btn-kid btn-green" id="story-read-done" style="width:100%; margin-top:20px">✓ Padh Liya</button>
        </div>`;
    
    r.classList.add('open');
    
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

// Lesson Logic (Sabaq)
function openLesson(index) {
    currentLessonIndex = index;
    currentItemIndex = 0;
    $('lesson-view').classList.add('open');
    loadLetter();
}

function loadLetter() {
    const lesson = qaidaData[currentLessonIndex];
    const item = lesson.items[currentItemIndex];
    const total = lesson.items.length;

    $('current-letter').textContent = item.ar;
    $('current-roman').textContent = item.ro;
    $('lesson-title').textContent = lesson.title;
    $('lesson-count').textContent = (currentItemIndex + 1) + ' / ' + total;
    $('lesson-bar').style.width = ((currentItemIndex + 1) / total * 100) + '%';
    
    if(typeof speakAr === 'function') speakAr(item.voice, 0.7);
}

function completeLesson() {
    const lesson = qaidaData[currentLessonIndex];
    if (currentItemIndex < lesson.items.length - 1) {
        currentItemIndex++;
        loadLetter();
        return;
    }
    // Sabaq Complete
    if (currentLessonIndex === progress.unlocked) {
        progress.unlocked++;
        addXP(20);
        saveProgress();
    }
    $('lesson-view').classList.remove('open');
    renderQaida();
    renderStats();
}

// Wiring
window.addEventListener('DOMContentLoaded', () => {
    $('login-form').addEventListener('submit', login);
    $('menu-logout').addEventListener('click', logout);

    // Bottom Nav
    document.querySelector('.bottom-nav').addEventListener('click', (e) => {
        const b = e.target.closest('.nav-item');
        if (!b) return;
        
        const tab = b.dataset.tab;
        if (tab === 'namaz') {
            if(typeof openNamaz === 'function') openNamaz();
            return;
        }

        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        
        if(tab === 'home') $('page-home').classList.add('active');
        if(tab === 'qaida') $('page-qaida').classList.add('active');
        if(tab === 'stories') $('page-stories').classList.add('active');
        if(tab === 'games') $('page-games').classList.add('active');

        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        b.classList.add('active');
    });

    // Home tiles
    document.querySelectorAll('[data-go]').forEach(tile => {
        tile.addEventListener('click', () => {
            const targetTab = tile.dataset.go;
            if(targetTab === 'namaz') { if(typeof openNamaz === 'function') openNamaz(); return; }
            const navBtn = document.querySelector(`.nav-item[data-tab="${targetTab}"]`);
            if (navBtn) navBtn.click();
        });
    });

    // Sabaq click
    $('sabaq-list').addEventListener('click', (e) => {
        const c = e.target.closest('.sabaq-card');
        if (c && !c.disabled) openLesson(parseInt(c.dataset.lesson, 10));
    });

    // Story click
    $('stories-list').addEventListener('click', (e) => {
        const c = e.target.closest('.sabaq-card');
        if (c) openStory(parseInt(c.dataset.story, 10));
    });

    // Akhlaq click
    const akhlaqBtn = $('akhlaq-hero');
    if(akhlaqBtn) akhlaqBtn.addEventListener('click', () => { if(typeof openAkhlaq === 'function') openAkhlaq(); });

    // Lesson controls
    $('lesson-close').addEventListener('click', () => $('lesson-view').classList.remove('open'));
    $('btn-listen').addEventListener('click', () => {
        const item = qaidaData[currentLessonIndex].items[currentItemIndex];
        if(typeof speakAr === 'function') speakAr(item.voice, 0.7);
    });
    $('btn-prev').addEventListener('click', () => {
        if (currentItemIndex > 0) { currentItemIndex--; loadLetter(); }
    });
    $('next-btn').addEventListener('click', completeLesson);

    // Auto Login
    const saved = lsGet('app_user');
    if (saved) {
        try {
            const u = JSON.parse(saved);
            if (u && u.name) { currentUser = u; initApp(); }
        } catch (e) { lsDel('app_user'); }
    }
});
