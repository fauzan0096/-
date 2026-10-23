'use strict';
/* ==========================================================
   Aghaaz-e-Asaas — main app logic
   ========================================================== */

// ---------- Settings ----------
const ADMIN_NAME = 'fauzan gorme';
const ADMIN_PASS = 'Fauzan8087';
const GUEST_PASS = 'Fauzan123';
const XP_PER_LEVEL = 150;
const READ_WPM = 150;

// ---------- State ----------
let currentUser = null;
let progress = null;
let currentLessonIndex = -1;
let currentItemIndex = 0;
let currentStoryIndex = -1;
let soundOn = true;

const $ = (id) => document.getElementById(id);
const ico = (name, cls = '') => `<svg class="i ${cls}"><use href="#i-${name}"/></svg>`;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function lsGet(key, fallback = null) { try { const v = localStorage.getItem(key); return v === null ? fallback : v; } catch (e) { return fallback; } }
function lsSet(key, val) { try { localStorage.setItem(key, val); } catch (e) { /* private mode */ } }
function lsDel(key) { try { localStorage.removeItem(key); } catch (e) { /* ignore */ } }

// ---------- Progress (har user ka alag) ----------
function dayStr(d) { return d.toLocaleDateString('en-CA'); }

function loadProgress() {
    const key = 'qa_progress:' + currentUser.name.toLowerCase();
    let p = null;
    try { p = JSON.parse(lsGet(key, 'null')); } catch (e) { p = null; }
    if (!p) {
        p = { unlocked: parseInt(lsGet('unlocked_level', '0'), 10) || 0, xp: 0, streak: 0, lastDay: '', storiesRead: [], best: {}, memorized: [], heard: [], hifzXp: [], goalItems: 10, daily: null };
    }
    p.storiesRead = p.storiesRead || [];
    p.best = p.best || {};
    p.memorized = p.memorized || [];
    p.heard = p.heard || [];
    p.hifzXp = p.hifzXp || [];
    p.goalItems = p.goalItems || 10;
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
    const before = Math.floor(progress.xp / XP_PER_LEVEL);
    progress.xp += n;
    saveProgress();
    renderStats();
    const after = Math.floor(progress.xp / XP_PER_LEVEL);
    toast(after > before ? `Level ${after + 1} mubarak!` : `+${n} XP`);
}

function toast(text) {
    const t = $('toast');
    $('toast-text').textContent = text;
    t.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove('show'), 1800);
}

// ---------- Login ----------
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
        msg.textContent = 'Password galat hai. Dobara koshish karein.';
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
    $('user-avatar').textContent = currentUser.name.charAt(0).toUpperCase();
    $('greeting-title').textContent = 'Assalamu Alaikum, ' + currentUser.name.split(' ')[0];
    $('menu-unlock').hidden = currentUser.role !== 'admin';

    loadProgress();
    touchStreak();
    soundOn = lsGet('sound_on', '1') !== '0';

    renderStats();
    renderQaida();
    renderDuas();
    renderStories();
    renderDaily();
    if (typeof renderSurahList === 'function') renderSurahList();
    if (typeof renderGameBests === 'function') renderGameBests();
    initCanvas();
}

// ---------- Navigation ----------
function switchTab(tabId) {
    document.querySelectorAll('.page').forEach((p) => p.classList.remove('active'));
    $('page-' + tabId).classList.add('active');
    document.querySelectorAll('.nav-item').forEach((n) => n.classList.toggle('active', n.dataset.tab === tabId));
    document.querySelector('.app-header').classList.toggle('compact', tabId !== 'qaida');
    if (tabId === 'qaida') renderDaily();
    if (tabId === 'quran' && typeof renderSurahList === 'function') renderSurahList();
    window.scrollTo(0, 0);
}

function toggleUserMenu(force) {
    const m = $('user-menu');
    const open = typeof force === 'boolean' ? force : !m.classList.contains('open');
    m.classList.toggle('open', open);
}

function unlockAll() {
    progress.unlocked = qaidaData.length;
    saveProgress();
    renderQaida();
    renderStats();
    toggleUserMenu(false);
    toast('Saare sabaq khul gaye');
}

// ---------- Stats ----------
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

// ---------- Sabaq list ----------
function renderQaida() {
    const list = $('sabaq-list');
    const admin = currentUser.role === 'admin';
    $('sabaq-count').textContent = qaidaData.length + ' sabaq';

    list.innerHTML = qaidaData.map((lesson, index) => {
        const done = index < progress.unlocked;
        const current = index === progress.unlocked;
        const locked = index > progress.unlocked && !admin;
        const parts = lesson.title.split(':');
        const heading = (parts[1] || lesson.title).trim();
        const cls = ['sabaq-card', done ? 'done' : '', current ? 'current' : '', locked ? 'locked' : ''].join(' ');
        const badge = done ? '<span class="badge ok">Mukammal</span>' : current ? '<span class="badge cur">Ab yahan</span>' : '';
        const tail = locked ? ico('lock') : done ? ico('check') : ico('chev');
        return `
            <button class="${cls}" data-lesson="${index}" ${locked ? 'disabled' : ''}>
                <span class="num">${index + 1}</span>
                <span class="info"><h3>${esc(heading)}${badge}</h3><p>${esc(lesson.desc)} • ${lesson.items.length} items</p></span>
                <span class="tail">${tail}</span>
            </button>`;
    }).join('');
}

// ---------- Duas ----------
function renderDuas() {
    $('duas-list').innerHTML = duasData.map((d, i) => `
        <div class="dua-card">
            <button class="play-btn" data-dua="${i}" aria-label="Suniye">${ico('vol')}</button>
            <div class="txt">
                <span class="occ">${esc(d.ro)}</span>
                <div class="arabic">${esc(d.ar)}</div>
            </div>
        </div>`).join('');
}

// ---------- Stories ----------
function readMinutes(story) {
    const words = story.body.join(' ').split(/\s+/).length;
    return Math.max(1, Math.round(words / READ_WPM));
}

function renderStories() {
    $('stories-list').innerHTML = waqiaatData.map((s, i) => {
        const read = progress.storiesRead.includes(s.id);
        return `
            <button class="story-card" data-story="${i}">
                <span class="story-thumb" style="--c:${s.color || '#123B7A'}">${s.emoji}</span>
                <span class="story-body">
                    <span class="ar">${esc(s.ar)}</span>
                    <h3>${esc(s.name)}</h3>
                    <span class="meta">
                        <span class="pill">${ico('clock')} ${readMinutes(s)} min</span>
                        <span class="pill tag">${esc(s.tag)}</span>
                        ${read ? `<span class="pill ok">${ico('check')} Padha</span>` : ''}
                    </span>
                </span>
            </button>`;
    }).join('');
}

function openStory(i) {
    if (i < 0 || i >= waqiaatData.length) return;
    currentStoryIndex = i;
    const s = waqiaatData[i];
    const read = progress.storiesRead.includes(s.id);
    const hasNext = i < waqiaatData.length - 1;
    const r = $('story-reader');

    r.innerHTML = `
        <div class="reader-progress"><i id="reader-bar"></i></div>
        <div class="reader-hero" style="--c:${s.color || '#123B7A'}">
            <div class="reader-bar">
                <button class="icon-btn" data-reader="close" aria-label="Wapas">${ico('left')}</button>
                <span class="count">${i + 1} / ${waqiaatData.length}</span>
            </div>
            <div class="reader-emoji">${s.emoji}</div>
            <div class="ar">${esc(s.ar)}</div>
            <h1>${esc(s.name)}</h1>
            <div class="meta">
                <span class="pill">${ico('clock')} ${readMinutes(s)} min ka waqia</span>
                <span class="pill">${esc(s.tag)}</span>
            </div>
        </div>
        <div class="reader-sheet">
            <div class="reader-card">
                ${s.body.map((p) => `<p>${esc(p)}</p>`).join('')}
                ${s.dua ? `
                <div class="quote-card">
                    <div class="label">Is waqie ki dua / aayat</div>
                    <div class="arabic">${esc(s.dua.ar)}</div>
                    <div class="tr">${esc(s.dua.ro)}</div>
                </div>` : ''}
                <div class="seekh-card">
                    <span class="ico">${ico('bulb')}</span>
                    <div><b>Seekh</b><p>${esc(s.seekh)}</p></div>
                </div>
                <div class="ref-line">${esc(s.ref)}</div>
            </div>
            <div class="reader-actions">
                <button class="btn btn-gold btn-lg btn-block" data-reader="read" ${read ? 'disabled' : ''}>
                    ${ico('check')} ${read ? 'Padh liya' : 'Maine padh liya (+20 XP)'}
                </button>
                <div class="reader-nav">
                    <button class="btn btn-ghost" data-reader="prev" ${i === 0 ? 'disabled' : ''}>${ico('left')} Pichla</button>
                    <button class="btn btn-ghost" data-reader="next" ${hasNext ? '' : 'disabled'}>Agla ${ico('right')}</button>
                </div>
            </div>
        </div>`;
    r.classList.add('open');
    r.scrollTop = 0;
    updateReaderProgress();
}

function closeStory() {
    $('story-reader').classList.remove('open');
    renderStories();
}

function updateReaderProgress() {
    const r = $('story-reader');
    const bar = $('reader-bar');
    if (!bar) return;
    const max = r.scrollHeight - r.clientHeight;
    bar.style.width = (max > 0 ? Math.min(100, (r.scrollTop / max) * 100) : 100) + '%';
}

function markStoryRead() {
    const s = waqiaatData[currentStoryIndex];
    if (!s || progress.storiesRead.includes(s.id)) return;
    progress.storiesRead.push(s.id);
    saveProgress();
    addXP(20);
    openStoryKeepScroll();
}

function openStoryKeepScroll() {
    const r = $('story-reader');
    const top = r.scrollTop;
    openStory(currentStoryIndex);
    r.scrollTop = top;
}

// ---------- Audio ----------
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

function speakAr(text, rate) {
    if (!soundOn || !('speechSynthesis' in window)) return;
    try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'ar-SA';
        if (arVoice) u.voice = arVoice;
        u.rate = rate || 0.75;
        window.speechSynthesis.speak(u);
    } catch (e) { /* audio na mile to koi masla nahi */ }
}
// purane naam ke saath bhi chalta rahe
function playCustomAudio(text) { speakAr(text, 0.7); }

function setSound(on) {
    soundOn = on;
    lsSet('sound_on', on ? '1' : '0');
    if (!on && 'speechSynthesis' in window) window.speechSynthesis.cancel();
}

// ---------- Lesson ----------
function openLesson(index) {
    currentLessonIndex = index;
    currentItemIndex = 0;
    $('lesson-view').classList.add('open');
    document.body.style.overflow = 'hidden';
    loadLetter();
}

function sizeClass(str) {
    const n = str.replace(/[ً-ْٰ]/g, '').length;
    return n > 8 ? 'xlong' : n > 3 ? 'long' : '';
}

function loadLetter() {
    const lesson = qaidaData[currentLessonIndex];
    const item = lesson.items[currentItemIndex];
    const total = lesson.items.length;
    const cls = sizeClass(item.ar);

    $('current-letter').textContent = item.ar;
    $('current-letter').className = 'big-letter ' + cls;
    $('current-roman').textContent = item.ro;
    $('board-bg-letter').textContent = item.ar;
    $('board-bg-letter').className = 'board-bg ' + cls;
    $('lesson-title').textContent = lesson.title;
    $('lesson-count').textContent = (currentItemIndex + 1) + ' / ' + total;
    $('lesson-bar').style.width = ((currentItemIndex + 1) / total * 100) + '%';
    $('btn-prev').disabled = currentItemIndex === 0;
    $('next-btn').innerHTML = (currentItemIndex === total - 1 ? 'Sabaq Mukammal' : 'MashaAllah! Aage') + ' ' + ico(currentItemIndex === total - 1 ? 'check' : 'right');

    $('board-box').classList.remove('open');
    clearCanvas();
    speakAr(item.voice, 0.7);
}

function closeLesson() {
    $('lesson-view').classList.remove('open');
    document.body.style.overflow = '';
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

function playAudio() {
    speakAr(qaidaData[currentLessonIndex].items[currentItemIndex].voice, 0.7);
}

function prevItem() {
    if (currentItemIndex > 0) { currentItemIndex--; loadLetter(); }
}

function completeLesson() {
    const lesson = qaidaData[currentLessonIndex];
    const firstTime = currentLessonIndex >= progress.unlocked;
    bumpDaily('items');
    if (currentItemIndex < lesson.items.length - 1) {
        if (firstTime) { progress.xp += 2; saveProgress(); renderStats(); }
        currentItemIndex++;
        loadLetter();
        return;
    }
    startQuiz();   // sabaq ke aakhir mein quiz; pass hone par hi agla sabaq khulta hai
}

function closeSuccess() {
    $('success-modal').classList.remove('open');
    closeLesson();
    renderQaida();
    renderStats();
}

// ---------- Tracing board (canvas) ----------
let canvas, ctx, isDrawing = false;

function initCanvas() {
    canvas = $('tracing-canvas');
    ctx = canvas.getContext('2d');
    canvas.addEventListener('pointerdown', (e) => {
        isDrawing = true;
        canvas.setPointerCapture(e.pointerId);
        const p = pos(e);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + 0.01, p.y + 0.01); // chhota nuqta bhi nazar aaye
        ctx.stroke();
    });
    canvas.addEventListener('pointermove', (e) => {
        if (!isDrawing) return;
        const p = pos(e);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
    });
    const stop = () => { isDrawing = false; };
    canvas.addEventListener('pointerup', stop);
    canvas.addEventListener('pointercancel', stop);
    canvas.addEventListener('pointerleave', stop);
    window.addEventListener('resize', () => { if ($('board-box').classList.contains('open')) sizeCanvas(); });
}

function pos(e) {
    const r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
}

// Board chhupa hota hai to canvas ki size 0 hoti hai — isliye board khulne par size set karte hain.
function sizeCanvas() {
    const r = canvas.getBoundingClientRect();
    if (!r.width) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(r.width * dpr);
    canvas.height = Math.round(r.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 9;
    ctx.strokeStyle = '#123B7A';
}

function toggleBoard() {
    const box = $('board-box');
    const open = !box.classList.contains('open');
    box.classList.toggle('open', open);
    if (open) {
        sizeCanvas();
        box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function clearCanvas() {
    if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
}


// ==========================================================
// Roz ka target
// ==========================================================
const GOAL_CHOICES = [10, 20, 30];

function ensureDaily() {
    const today = dayStr(new Date());
    if (!progress.daily || progress.daily.date !== today) {
        progress.daily = { date: today, items: 0, surahs: [], played: false, rewarded: false };
    }
    return progress.daily;
}

function dailyRows() {
    const d = ensureDaily();
    const goal = progress.goalItems || 10;
    return [
        { id: 'items', title: `${goal} huroof / alfaz seekhein`, now: Math.min(d.items, goal), max: goal, done: d.items >= goal, go: 'list', btn: 'Sabaq' },
        { id: 'surah', title: '1 surah qari ke saath suniye', now: Math.min(d.surahs.length, 1), max: 1, done: d.surahs.length >= 1, go: 'quran', btn: 'Sunein' },
        { id: 'played', title: '1 game ya quiz poora karein', now: d.played ? 1 : 0, max: 1, done: d.played, go: 'games', btn: 'Khelein' }
    ];
}

function bumpDaily(kind, val) {
    if (!progress) return;
    const d = ensureDaily();
    if (kind === 'items') d.items++;
    if (kind === 'surah' && !d.surahs.includes(val)) d.surahs.push(val);
    if (kind === 'played') d.played = true;
    const rows = dailyRows();
    if (!d.rewarded && rows.every((r) => r.done)) {
        d.rewarded = true;
        progress.xp += 30;
        saveProgress();
        renderStats();
        toast('Aaj ka target poora! +30 XP');
    }
    saveProgress();
    renderDaily();
}

function renderDaily() {
    const el = $('daily-card');
    if (!el || !progress) return;
    const rows = dailyRows();
    const done = rows.filter((r) => r.done).length;
    const pct = Math.round(rows.reduce((a, r) => a + r.now / r.max, 0) / rows.length * 100);
    const all = done === rows.length;
    el.classList.toggle('complete', all);
    el.innerHTML = `
        <div class="daily-head">
            <span class="ico">${ico(all ? 'check' : 'target')}</span>
            <div class="t"><b>${all ? 'Aaj ka target poora!' : 'Aaj ka Target'}</b><small>${done} / ${rows.length} kaam mukammal</small></div>
            <button class="goal-chip" data-goal title="Huroof ka target badlein">${progress.goalItems} huroof ${ico('down')}</button>
        </div>
        <div class="bar"><i style="width:${pct}%"></i></div>
        <div class="tasks">
            ${rows.map((r) => `
                <div class="task ${r.done ? 'done' : ''}">
                    <span class="tick">${r.done ? ico('check') : ''}</span>
                    <div class="tt"><b>${esc(r.title)}</b>${r.max > 1 ? `<small>${r.now} / ${r.max}</small>` : ''}</div>
                    ${r.done ? '' : `<button class="mini" data-go="${r.go}">${r.btn}</button>`}
                </div>`).join('')}
        </div>`;
}

// ==========================================================
// Sabaq ke baad Quiz
// ==========================================================
let quiz = null;
const quizShuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

function buildQuiz(lesson) {
    const seen = { ar: new Set(), voice: new Set(), ro: new Set() };
    let pool = lesson.items.filter((it) => {
        if (seen.ar.has(it.ar) || seen.voice.has(it.voice) || seen.ro.has(it.ro)) return false;
        seen.ar.add(it.ar); seen.voice.add(it.voice); seen.ro.add(it.ro);
        return true;
    });
    if (pool.length < 4) pool = lesson.items;
    return quizShuffle(pool).slice(0, Math.min(5, pool.length)).map((item, k) => ({
        type: k % 2 === 0 ? 'hear' : 'read',
        item,
        opts: quizShuffle([item].concat(quizShuffle(pool.filter((x) => x !== item)).slice(0, 3)))
    }));
}

function startQuiz() {
    quiz = { qs: buildQuiz(qaidaData[currentLessonIndex]), i: 0, score: 0, locked: false, lessonIndex: currentLessonIndex };
    $('quiz-view').classList.add('open');
    renderQuizQ();
}

function renderQuizQ() {
    const q = quiz.qs[quiz.i];
    const total = quiz.qs.length;
    quiz.locked = false;
    $('quiz-title').textContent = 'Sabaq ' + (quiz.lessonIndex + 1) + ' ka Quiz';
    $('quiz-count').textContent = 'Sawal ' + (quiz.i + 1) + ' / ' + total;
    $('quiz-bar').style.width = (quiz.i / total * 100) + '%';

    const prompt = q.type === 'hear'
        ? `<div class="q-label">Awaaz suniye aur sahi jawab chunein</div>
           <button class="speak-big" id="quiz-speak" aria-label="Dobara suniye">${ico('vol')}</button>`
        : `<div class="q-label">Yeh kaise padha jata hai?</div>
           <div class="quiz-arabic ar ${sizeClass(q.item.ar)}">${esc(q.item.ar)}</div>`;
    const opts = q.opts.map((o, k) => q.type === 'hear'
        ? `<button class="opt qopt ${sizeClass(o.ar) ? 'sm' : ''}" data-k="${k}">${esc(o.ar)}</button>`
        : `<button class="opt qopt latin" data-k="${k}">${esc(o.ro)}</button>`).join('');
    $('quiz-body').innerHTML = `<div class="q-card">${prompt}<div class="opt-grid">${opts}</div></div>`;
    if (q.type === 'hear') speakAr(q.item.voice, 0.7);
}

function answerQuiz(k) {
    if (!quiz || quiz.locked) return;
    quiz.locked = true;
    const q = quiz.qs[quiz.i];
    const right = q.opts.indexOf(q.item);
    const btns = $('quiz-body').querySelectorAll('.qopt');
    btns.forEach((b) => { b.disabled = true; });
    btns[right].classList.add('right');
    const ok = k === right;
    if (ok) quiz.score++; else btns[k].classList.add('wrong');
    speakAr(q.item.voice, 0.7);
    setTimeout(() => {
        if (!quiz) return;
        quiz.i++;
        if (quiz.i < quiz.qs.length) renderQuizQ(); else finishQuiz();
    }, ok ? 1100 : 1800);
}

function finishQuiz() {
    const total = quiz.qs.length;
    const need = Math.ceil(total * 0.8);
    const pass = quiz.score >= need;
    $('quiz-bar').style.width = '100%';
    bumpDaily('played');
    let xpNote = '';
    if (pass) {
        const first = quiz.lessonIndex === progress.unlocked;
        if (first) { progress.unlocked++; saveProgress(); }
        const xp = quiz.score === total ? 50 : 30;
        if (first || quiz.score === total) { addXP(xp); xpNote = ` • +${xp} XP`; }
        renderStats(); renderQaida();
    }
    $('quiz-body').innerHTML = `
        <div class="q-card result">
            <div class="modal-icon ${pass ? '' : 'bad'}">${ico(pass ? 'trophy' : 'refresh')}</div>
            <h2>${pass ? 'MashaAllah! Quiz pass' : 'Thoda aur mashq karein'}</h2>
            <div class="big">${quiz.score} / ${total}</div>
            <p class="sub">${pass ? 'Agla sabaq khul gaya hai' + xpNote : `Pass hone ke liye ${need} sahi jawab chahiye`}</p>
            <div class="result-actions">
                ${pass
                    ? '<button class="btn btn-lg btn-block" id="quiz-done">Aage Barhein</button>'
                    : '<button class="btn btn-lg btn-block" id="quiz-retry">Quiz dobara</button><button class="btn btn-ghost btn-block" id="quiz-review">Sabaq dobara dekhein</button>'}
            </div>
        </div>`;
}

function closeQuiz() {
    quiz = null;
    $('quiz-view').classList.remove('open');
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

function wireQuizAndDaily() {
    $('quiz-close').addEventListener('click', closeQuiz);
    $('quiz-body').addEventListener('click', (e) => {
        const opt = e.target.closest('.qopt');
        if (opt) { answerQuiz(parseInt(opt.dataset.k, 10)); return; }
        if (e.target.closest('#quiz-speak')) { speakAr(quiz.qs[quiz.i].item.voice, 0.7); return; }
        if (e.target.closest('#quiz-done')) { closeQuiz(); closeLesson(); renderQaida(); renderStats(); return; }
        if (e.target.closest('#quiz-retry')) { startQuiz(); return; }
        if (e.target.closest('#quiz-review')) { closeQuiz(); currentItemIndex = 0; loadLetter(); }
    });
    $('daily-card').addEventListener('click', (e) => {
        if (e.target.closest('[data-goal]')) {
            const i = GOAL_CHOICES.indexOf(progress.goalItems);
            progress.goalItems = GOAL_CHOICES[(i + 1) % GOAL_CHOICES.length];
            saveProgress(); renderDaily();
            return;
        }
        const go = e.target.closest('[data-go]');
        if (!go) return;
        if (go.dataset.go === 'list') $('sabaq-list').scrollIntoView({ behavior: 'smooth', block: 'start' });
        else switchTab(go.dataset.go);
    });
}

// ---------- Event wiring ----------
function wireEvents() {
    $('login-form').addEventListener('submit', login);
    wireQuizAndDaily();
    $('user-chip').addEventListener('click', (e) => { e.stopPropagation(); toggleUserMenu(); });
    document.addEventListener('click', (e) => { if (!e.target.closest('.menu-wrap')) toggleUserMenu(false); });
    $('menu-logout').addEventListener('click', logout);
    $('menu-unlock').addEventListener('click', unlockAll);

    document.querySelector('.bottom-nav').addEventListener('click', (e) => {
        const b = e.target.closest('.nav-item');
        if (b) switchTab(b.dataset.tab);
    });

    $('sabaq-list').addEventListener('click', (e) => {
        const c = e.target.closest('.sabaq-card');
        if (c && !c.disabled) openLesson(parseInt(c.dataset.lesson, 10));
    });
    $('duas-list').addEventListener('click', (e) => {
        const b = e.target.closest('.play-btn');
        if (b) speakAr(duasData[parseInt(b.dataset.dua, 10)].voice, 0.7);
    });
    $('stories-list').addEventListener('click', (e) => {
        const c = e.target.closest('.story-card');
        if (c) openStory(parseInt(c.dataset.story, 10));
    });

    const reader = $('story-reader');
    reader.addEventListener('scroll', updateReaderProgress, { passive: true });
    reader.addEventListener('click', (e) => {
        const b = e.target.closest('[data-reader]');
        if (!b || b.disabled) return;
        const act = b.dataset.reader;
        if (act === 'close') closeStory();
        else if (act === 'read') markStoryRead();
        else if (act === 'prev') openStory(currentStoryIndex - 1);
        else if (act === 'next') openStory(currentStoryIndex + 1);
    });

    $('lesson-close').addEventListener('click', closeLesson);
    $('btn-listen').addEventListener('click', playAudio);
    $('btn-write').addEventListener('click', toggleBoard);
    $('btn-clear').addEventListener('click', clearCanvas);
    $('btn-prev').addEventListener('click', prevItem);
    $('next-btn').addEventListener('click', completeLesson);
    $('success-close').addEventListener('click', closeSuccess);

    // Android back button / Escape se overlays band hon
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        if ($('quiz-view').classList.contains('open')) closeQuiz();
        else if ($('surah-reader').classList.contains('open') && typeof closeSurah === 'function') closeSurah();
        else if ($('game-screen').classList.contains('open') && typeof exitGame === 'function') exitGame();
        else if ($('story-reader').classList.contains('open')) closeStory();
        else if ($('lesson-view').classList.contains('open')) closeLesson();
    });
}

window.addEventListener('DOMContentLoaded', () => {
    wireEvents();
    const saved = lsGet('app_user');
    if (saved) {
        try {
            const u = JSON.parse(saved);
            if (u && u.name && (u.role === 'admin' || u.role === 'guest')) { currentUser = u; initApp(); }
        } catch (e) { lsDel('app_user'); }
    }
});

// ---------- Offline support ----------
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(() => { /* file:// ya purana browser */ });
    });
}
