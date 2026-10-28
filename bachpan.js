'use strict';
/* ==========================================================
   Bachpan Ghar — 3-6 saal ke bachon ke liye
   Sirf tap, suno, khelo. Kuch padhna nahi. Koi fail nahi.
   ========================================================== */

const BP = {
    mode: 'menu', game: null, score: 0, round: 0, roundTotal: 5,
    timers: [], raf: 0, active: false
};

function ensureBP() {
    if (!progress) return;
    if (!progress.bachpanStickers) progress.bachpanStickers = [];
    if (!progress.bachpanTapCount) progress.bachpanTapCount = 0;
}

function bpStickerCount() { return (progress && progress.bachpanStickers) ? progress.bachpanStickers.length : 0; }

function awardSticker() {
    ensureBP();
    const unowned = bachpanData.stickers.filter(s => !progress.bachpanStickers.includes(s.id));
    if (unowned.length === 0) return null;
    const st = unowned[Math.floor(Math.random() * unowned.length)];
    progress.bachpanStickers.push(st.id);
    if (typeof addXP === 'function') addXP(5);
    if (typeof bumpDaily === 'function') bumpDaily('played');
    saveProgress();
    return st;
}

function bpCleanup() {
    BP.active = false;
    BP.timers.forEach(t => { clearTimeout(t); clearInterval(t); });
    BP.timers = [];
    cancelAnimationFrame(BP.raf);
    try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (e) {}
}
function bpLater(fn, ms) { const t = setTimeout(() => { if (BP.active) fn(); }, ms); BP.timers.push(t); return t; }

function bpSayUrdu(text, rate) {
    try {
        const u = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        const v = voices.find(x => /^ur/i.test(x.lang)) || voices.find(x => /^hi/i.test(x.lang)) || null;
        if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'hi-IN';
        u.rate = rate || 0.85;
        window.speechSynthesis.speak(u);
    } catch (e) {}
}
function bpSayEnglish(text, rate) {
    try {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        u.rate = rate || 0.8;
        window.speechSynthesis.speak(u);
    } catch (e) {}
}
function bpSayAr(text) { if (typeof speakAr === 'function') speakAr(text, 0.7); }

function openBachpan() {
    ensureBP();
    BP.mode = 'menu'; BP.game = null; BP.active = true;
    renderBP();
    $('bachpan-view').classList.add('open');
    document.body.style.overflow = 'hidden';
    bpSayUrdu('Bachpan Ghar', 0.9);
}
function closeBachpan() {
    bpCleanup();
    $('bachpan-view').classList.remove('open');
    document.body.style.overflow = '';
}

function renderBP() {
    bpCleanup();
    BP.active = true;
    const el = $('bachpan-view');
    if (!el) return;
    let html = '';
    if (BP.mode === 'menu') html = renderBPMenu();
    else if (BP.mode === 'games') html = renderBPGames();
    else if (BP.mode === 'letters') html = renderBPLetters();
    else if (BP.mode === 'stickers') html = renderBPStickers();
    else if (BP.mode === 'rhymes') html = renderBPRhymes();
    else if (BP.mode === 'play') html = renderBPPlay();
    el.innerHTML = html;
}

function renderBPMenu() {
    const st = bpStickerCount();
    return `
        <div class="bp-top">
            <button class="icon-btn" data-bp="close">${ico('x')}</button>
            <div class="t"><b>Bachpan Ghar 🎈</b><small>Tap karo • Suno • Khelo</small></div>
        </div>
        <div class="bp-content">
            <div class="bp-hello">${['🌸','⭐','🌈','🎈','💖'][Math.floor(Math.random()*5)]} Assalamu Alaikum, nanhe! 👋</div>
            <div class="bp-menu-grid">
                <button class="bp-tile bp-tile-games" data-bp="nav" data-to="games">
                    <span class="bt-emoji">🎮</span><span class="bt-title">Khelo</span><span class="bt-sub">4 games</span>
                </button>
                <button class="bp-tile bp-tile-letters" data-bp="nav" data-to="letters">
                    <span class="bt-emoji">🔤</span><span class="bt-title">Harf</span><span class="bt-sub">Sunno</span>
                </button>
                <button class="bp-tile bp-tile-stickers" data-bp="nav" data-to="stickers">
                    <span class="bt-emoji">⭐</span><span class="bt-title">Sticker</span><span class="bt-sub">${st} / ${bachpanData.stickers.length}</span>
                </button>
                <button class="bp-tile bp-tile-rhymes" data-bp="nav" data-to="rhymes">
                    <span class="bt-emoji">🎵</span><span class="bt-title">Nazmein</span><span class="bt-sub">5</span>
                </button>
            </div>
        </div>`;
}

function renderBPGames() {
    return `
        <div class="bp-top">
            <button class="icon-btn" data-bp="menu">${ico('left')}</button>
            <div class="t"><b>🎮 Khelo</b><small>Koi galat nahi — sab sahi!</small></div>
        </div>
        <div class="bp-content">
            <div class="bp-game-grid">
                <button class="bp-game-card" style="--c1:#F7C265;--c2:#D98A12" data-bp="game" data-g="catch">
                    <span class="bgc-emoji">⭐</span><b>Sitare Pakro</b><small>Tap karo, pakro</small>
                </button>
                <button class="bp-game-card" style="--c1:#7BE0B8;--c2:#1C9B7D" data-bp="game" data-g="animal">
                    <span class="bgc-emoji">🐄</span><b>Jaanwar</b><small>Suno, chuno</small>
                </button>
                <button class="bp-game-card" style="--c1:#5BC8F5;--c2:#1E88C7" data-bp="game" data-g="color">
                    <span class="bgc-emoji">🎨</span><b>Rang</b><small>Suno, chuno</small>
                </button>
                <button class="bp-game-card" style="--c1:#C79BE8;--c2:#8E5BC0" data-bp="game" data-g="bubble">
                    <span class="bgc-emoji">🫧</span><b>Gubbare</b><small>Phoro, khelo</small>
                </button>
            </div>
        </div>`;
}

function renderBPLetters() {
    const items = qaidaData[0].items.slice(0, 28);
    return `
        <div class="bp-top">
            <button class="icon-btn" data-bp="menu">${ico('left')}</button>
            <div class="t"><b>🔤 Harf Sunno</b><small>Tap karo — awaaz aayegi</small></div>
        </div>
        <div class="bp-content">
            <div class="bp-hint">👆 Har harf pe tap karo</div>
            <div class="bp-letter-grid">
                ${items.map((it, i) => `<button class="bp-letter-card" data-bp="letter" data-voice="${esc(it.voice)}" data-ar="${esc(it.ar)}">
                    <span class="bl-ar ar">${esc(it.ar)}</span>
                </button>`).join('')}
            </div>
        </div>`;
}

function renderBPStickers() {
    ensureBP();
    const owned = progress.bachpanStickers || [];
    return `
        <div class="bp-top">
            <button class="icon-btn" data-bp="menu">${ico('left')}</button>
            <div class="t"><b>⭐ Mere Stickers</b><small>${owned.length} / ${bachpanData.stickers.length}</small></div>
        </div>
        <div class="bp-content">
            <div class="bp-sticker-grid">
                ${bachpanData.stickers.map(s => {
                    const on = owned.includes(s.id);
                    return `<button class="bp-sticker ${on ? 'owned' : 'locked'}" data-bp="sticker" data-emoji="${s.emoji}" ${on ? '' : 'disabled'}>
                        <span class="bs-emoji">${on ? s.emoji : '❓'}</span>
                    </button>`;
                }).join('')}
            </div>
            ${owned.length >= bachpanData.stickers.length ? '<div class="bp-all-done">🎉 Sab stickers mile! MashaAllah!</div>' : ''}
        </div>`;
}

function renderBPRhymes() {
    return `
        <div class="bp-top">
            <button class="icon-btn" data-bp="menu">${ico('left')}</button>
            <div class="t"><b>🎵 Nazmein</b><small>Tap karo — suno</small></div>
        </div>
        <div class="bp-content">
            <div class="bp-rhyme-list">
                ${bachpanData.rhymes.map(r => `
                    <button class="bp-rhyme-card" data-bp="rhyme" data-id="${r.id}">
                        <span class="br-emoji">${r.emoji}</span>
                        <span class="br-title">${esc(r.title)}</span>
                        <span class="br-play">▶</span>
                    </button>`).join('')}
            </div>
        </div>`;
}

function renderBPPlay() {
    return `
        <div class="bp-top">
            <button class="icon-btn" data-bp="games-list">${ico('left')}</button>
            <div class="t"><b id="bp-play-title">Khel</b><small id="bp-play-sub">Khelo!</small></div>
            <span class="bp-score-chip" id="bp-score">0</span>
        </div>
        <div class="bp-play-area" id="bp-play-area"></div>
        <div class="bp-overlay" id="bp-overlay" hidden></div>`;
}

function bpSetScore(n) { const el = $('bp-score'); if (el) el.textContent = n; }
function bpSetTitle(title, sub) {
    const t = $('bp-play-title'), s = $('bp-play-sub');
    if (t) t.textContent = title;
    if (s) s.textContent = sub || '';
}

function bpShowOverlay(html) {
    const ov = $('bp-overlay');
    if (!ov) return;
    ov.innerHTML = html;
    ov.hidden = false;
}
function bpHideOverlay() {
    const ov = $('bp-overlay');
    if (ov) ov.hidden = true;
}

function startBPCatch() {
    BP.mode = 'play'; BP.game = 'catch'; BP.score = 0; BP.active = true;
    renderBP();
    bpSetTitle('⭐ Sitare Pakro', 'Tap karo — jitne chaho!');
    bpSetScore(0);
    bpSayUrdu('Sitare pakro', 0.85);
    const area = $('bp-play-area');
    if (!area) return;

    const emojis = ['⭐', '🌟', '✨', '🎈', '🌈', '💖', '🎁', '🍬', '🌸', '🦋'];
    let count = 0;
    const sp = () => {
        if (!BP.active) return;
        const b = document.createElement('button');
        b.className = 'bp-fall';
        b.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        b.style.left = (5 + Math.random() * 80) + '%';
        b.style.setProperty('--dur', (3 + Math.random() * 2) + 's');
        b.addEventListener('animationend', () => b.remove());
        b.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            count++;
            bpSetScore(count);
            b.classList.add('caught');
            bpSayEnglish('Pop', 1.2);
            const st = awardStickerIfCount(count);
            if (st) return;
            setTimeout(() => b.remove(), 200);
        });
        area.appendChild(b);
        bpLater(sp, 700);
    };
    sp();
}

function awardStickerIfCount(n) {
    if (n > 0 && n % 10 === 0) {
        const st = awardSticker();
        if (st) { bpCelebrate(st); return true; }
    }
    return false;
}

function bpCelebrate(sticker) {
    bpSayEnglish('Well done', 0.85);
    bpShowOverlay(`
        <div class="bp-celebrate">
            <div class="bc-shine">🎉</div>
            <div class="bc-sticker">${sticker.emoji}</div>
            <h2>MashaAllah!</h2>
            <p>Naya sticker mila</p>
            <button class="btn btn-gold btn-lg btn-block" data-bp="continue">Aage Khelo</button>
        </div>`);
}

function startBPAnimal() {
    BP.mode = 'play'; BP.game = 'animal'; BP.score = 0; BP.round = 0; BP.active = true;
    renderBP();
    bpSetTitle('🐄 Jaanwar Pehchano', 'Suno, chuno');
    nextAnimalRound();
}

function nextAnimalRound() {
    if (!BP.active) return;
    if (BP.round >= 5) { finishBPRound(); return; }
    BP.round++;
    bpSetScore(BP.score);
    const pool = bachpanData.animals.slice();
    const target = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
    const opts = [target, pool[Math.floor(Math.random() * pool.length)], pool[Math.floor(Math.random() * pool.length)]];
    for (let i = opts.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [opts[i], opts[j]] = [opts[j], opts[i]]; }
    const area = $('bp-play-area');
    if (!area) return;
    area.innerHTML = `<div class="bp-round">${BP.round} / 5</div>
        <div class="bp-animal-grid">
            ${opts.map((o, i) => `<button class="bp-animal" data-bp="animal-pick" data-idx="${i}" data-name="${esc(o.name)}" data-correct="${o === target ? '1' : '0'}">
                <span class="ba-emoji">${o.emoji}</span>
            </button>`).join('')}
        </div>`;
    bpLater(() => { bpSayUrdu(target.name, 0.85); bpLater(() => bpSayEnglish(target.sound, 0.9), 900); }, 400);
}

function startBPColor() {
    BP.mode = 'play'; BP.game = 'color'; BP.score = 0; BP.round = 0; BP.active = true;
    renderBP();
    bpSetTitle('🎨 Rang Pehchano', 'Suno, chuno');
    nextColorRound();
}

function nextColorRound() {
    if (!BP.active) return;
    if (BP.round >= 5) { finishBPRound(); return; }
    BP.round++;
    bpSetScore(BP.score);
    const pool = bachpanData.colors.slice();
    const target = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
    const opts = [target, pool[Math.floor(Math.random() * pool.length)], pool[Math.floor(Math.random() * pool.length)]];
    for (let i = opts.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [opts[i], opts[j]] = [opts[j], opts[i]]; }
    const area = $('bp-play-area');
    if (!area) return;
    area.innerHTML = `<div class="bp-round">${BP.round} / 5</div>
        <div class="bp-color-grid">
            ${opts.map((o, i) => `<button class="bp-color" data-bp="color-pick" data-idx="${i}" data-correct="${o === target ? '1' : '0'}" style="--hex:${o.hex}">
                <span class="bc-circle"></span>
            </button>`).join('')}
        </div>`;
    bpLater(() => bpSayUrdu(target.name, 0.9), 400);
}

function startBPBubble() {
    BP.mode = 'play'; BP.game = 'bubble'; BP.score = 0; BP.active = true;
    renderBP();
    bpSetTitle('🫧 Gubbare Phoro', 'Tap karo — phor do!');
    bpSetScore(0);
    bpSayUrdu('Gubbare phoro', 0.85);
    const area = $('bp-play-area');
    if (!area) return;
    const palette = ['#5BC8F5', '#7BE0B8', '#F7C265', '#C79BE8', '#FF9AA2', '#FFD670'];
    let count = 0;
    const sp = () => {
        if (!BP.active) return;
        const b = document.createElement('button');
        b.className = 'bp-bubble';
        b.style.setProperty('--c1', palette[Math.floor(Math.random() * palette.length)]);
        b.style.background = `radial-gradient(circle at 30% 25%, rgba(255,255,255,.85) 0 8%, transparent 10%), ${palette[Math.floor(Math.random() * palette.length)]}`;
        b.style.left = (5 + Math.random() * 78) + '%';
        b.style.setProperty('--dur', (3.5 + Math.random() * 2.5) + 's');
        b.addEventListener('animationend', () => b.remove());
        b.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            count++;
            bpSetScore(count);
            b.classList.add('caught');
            bpSayEnglish('Pop', 1.2);
            const st = awardStickerIfCount(count);
            if (st) return;
            setTimeout(() => b.remove(), 200);
        });
        area.appendChild(b);
        bpLater(sp, 650);
    };
    sp();
}

function finishBPRound() {
    const st = awardSticker();
    if (st) bpCelebrate(st);
    else { bpSayEnglish('Great job', 0.85); bpShowOverlay(`<div class="bp-celebrate"><div class="bc-shine">🎉</div><h2>MashaAllah!</h2><p>Sab khel mukammal</p><button class="btn btn-gold btn-lg btn-block" data-bp="games-list">Aur Khelo</button></div>`); }
}

function playRhyme(id) {
    const r = bachpanData.rhymes.find(x => x.id === id);
    if (!r) return;
    try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (e) {}
    bpSayUrdu(r.title, 0.9);
    let i = 0;
    const next = () => {
        if (i >= r.lines.length) return;
        bpSayUrdu(r.lines[i], 0.75);
        i++;
        setTimeout(() => { if (BP.active && i < r.lines.length) next(); }, 3000);
    };
    setTimeout(next, 1200);
}

document.addEventListener('click', (e) => {
    if (e.target.closest('#bachpan-hero')) {
        e.preventDefault(); e.stopPropagation();
        openBachpan();
        return;
    }
    const b = e.target.closest('[data-bp]');
    if (!b) return;
    if (!e.target.closest('#bachpan-view')) return;
    const act = b.dataset.bp;
    if (act === 'close') return closeBachpan();
    if (act === 'menu') { BP.mode = 'menu'; renderBP(); return; }
    if (act === 'nav') { BP.mode = b.dataset.to; renderBP(); return; }
    if (act === 'games-list') { BP.mode = 'games'; renderBP(); return; }
    if (act === 'game') {
        const g = b.dataset.g;
        if (g === 'catch') return startBPCatch();
        if (g === 'animal') return startBPAnimal();
        if (g === 'color') return startBPColor();
        if (g === 'bubble') return startBPBubble();
        return;
    }
    if (act === 'letter') {
        bpSayAr(b.dataset.voice);
        b.classList.add('tapped');
        setTimeout(() => b.classList.remove('tapped'), 300);
        progress.bachpanTapCount = (progress.bachpanTapCount || 0) + 1;
        if (progress.bachpanTapCount % 10 === 0) awardStickerIfCount(progress.bachpanTapCount);
        saveProgress();
        return;
    }
    if (act === 'sticker') {
        bpSayEnglish('Star', 0.85);
        b.classList.add('tapped');
        setTimeout(() => b.classList.remove('tapped'), 400);
        return;
    }
    if (act === 'rhyme') return playRhyme(b.dataset.id);
    if (act === 'animal-pick') {
        if (b.dataset.correct === '1') {
            BP.score++;
            bpSayEnglish('Yay', 1.1);
            b.classList.add('correct');
            setTimeout(() => nextAnimalRound(), 900);
        } else {
            b.classList.add('wrong');
            bpSayUrdu('Dobara try karo', 0.85);
            setTimeout(() => b.classList.remove('wrong'), 800);
        }
        return;
    }
    if (act === 'color-pick') {
        if (b.dataset.correct === '1') {
            BP.score++;
            bpSayEnglish('Yay', 1.1);
            b.classList.add('correct');
            setTimeout(() => nextColorRound(), 900);
        } else {
            b.classList.add('wrong');
            bpSayUrdu('Dobara try karo', 0.85);
            setTimeout(() => b.classList.remove('wrong'), 800);
        }
        return;
    }
    if (act === 'continue') {
        bpHideOverlay();
        if (BP.game === 'catch') { startBPCatch(); }
        else if (BP.game === 'animal') { BP.round = 0; BP.score = 0; nextAnimalRound(); }
        else if (BP.game === 'color') { BP.round = 0; BP.score = 0; nextColorRound(); }
        else if (BP.game === 'bubble') { startBPBubble(); }
        return;
    }
});

window.addEventListener('DOMContentLoaded', () => {
    console.log('✅ bachpan.js loaded');
});
window.openBachpan = openBachpan;
