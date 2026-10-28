'use strict';
/* ==========================================================
   Aghaaz-e-Asaas — Games
   Qaida: jab tak galti na ho, game chalta rehta hai.
   Jaise jaise sahi jawab badhte hain, game mushkil hota jata hai.
   (app.js ke addXP / speakAr / progress / qaidaData use hote hain)
   ========================================================== */

// Har harf ke liye ek lafz + tasveer (28 huroof)
const vocabData = [
    { letter: "ا", word: "Asad",    ar: "أَسَد",     emoji: "🦁", eng: "Lion" },
    { letter: "ب", word: "Batta",   ar: "بَطَّة",    emoji: "🦆", eng: "Duck" },
    { letter: "ت", word: "Tuffah",  ar: "تُفَّاح",   emoji: "🍎", eng: "Apple" },
    { letter: "ث", word: "Thawr",   ar: "ثَوْر",     emoji: "🐂", eng: "Bull" },
    { letter: "ج", word: "Jamal",   ar: "جَمَل",     emoji: "🐪", eng: "Camel" },
    { letter: "ح", word: "Hisan",   ar: "حِصَان",    emoji: "🐴", eng: "Horse" },
    { letter: "خ", word: "Kharoof", ar: "خَرُوف",    emoji: "🐑", eng: "Sheep" },
    { letter: "د", word: "Dajaj",   ar: "دَجَاج",    emoji: "🐔", eng: "Chicken" },
    { letter: "ذ", word: "Dhi'b",   ar: "ذِئْب",     emoji: "🐺", eng: "Wolf" },
    { letter: "ر", word: "Rajul",   ar: "رَجُل",     emoji: "👨", eng: "Man" },
    { letter: "ز", word: "Zarafa",  ar: "زَرَافَة",  emoji: "🦒", eng: "Giraffe" },
    { letter: "س", word: "Samak",   ar: "سَمَك",     emoji: "🐟", eng: "Fish" },
    { letter: "ش", word: "Shams",   ar: "شَمْس",     emoji: "☀️", eng: "Sun" },
    { letter: "ص", word: "Saqr",    ar: "صَقْر",     emoji: "🦅", eng: "Falcon" },
    { letter: "ض", word: "Difda'",  ar: "ضِفْدَع",   emoji: "🐸", eng: "Frog" },
    { letter: "ط", word: "Tayr",    ar: "طَيْر",     emoji: "🐦", eng: "Bird" },
    { letter: "ظ", word: "Zabi",    ar: "ظَبْي",     emoji: "🦌", eng: "Deer" },
    { letter: "ع", word: "Asal",    ar: "عَسَل",     emoji: "🍯", eng: "Honey" },
    { letter: "غ", word: "Ghayma",  ar: "غَيْمَة",   emoji: "☁️", eng: "Cloud" },
    { letter: "ف", word: "Feel",    ar: "فِيل",      emoji: "🐘", eng: "Elephant" },
    { letter: "ق", word: "Qamar",   ar: "قَمَر",     emoji: "🌙", eng: "Moon" },
    { letter: "ك", word: "Kalb",    ar: "كَلْب",     emoji: "🐕", eng: "Dog" },
    { letter: "ل", word: "Laymoon", ar: "لَيْمُون",  emoji: "🍋", eng: "Lemon" },
    { letter: "م", word: "Mawz",    ar: "مَوْز",     emoji: "🍌", eng: "Banana" },
    { letter: "ن", word: "Nahl",    ar: "نَحْل",     emoji: "🐝", eng: "Bee" },
    { letter: "ه", word: "Hatif",   ar: "هَاتِف",    emoji: "📱", eng: "Phone" },
    { letter: "و", word: "Warda",   ar: "وَرْدَة",   emoji: "🌹", eng: "Rose" },
    { letter: "ي", word: "Yad",     ar: "يَد",       emoji: "✋", eng: "Hand" }
];

const GAME_INFO = {
    bubble:   { title: "Bubble Pop",     stars: [50, 150, 300],  start: () => startBubblePop() },
    sequence: { title: "Agla Harf",      stars: [100, 300, 600], start: () => startSequenceGame() },
    vocab:    { title: "Harf & Tasveer", stars: [75, 225, 450],  start: () => startVocabGame() },
    basket:   { title: "Harf ki Tokri",  stars: [50, 150, 300],  start: () => startBasketGame() }
};

// ---------- Common state & helpers ----------
const G = { id: null, score: 0, correct: 0, timers: [], raf: 0, over: true, locked: false, cleanup: [], q: 0, level: 1 };
const gel = (id) => document.getElementById(id);
const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const letters = () => qaidaData[0].items;
const letterVoice = (ch) => { const it = letters().find((l) => l.ar === ch); return it ? it.voice : ch; };

function later(fn, ms) { const t = setTimeout(() => { if (!G.over) fn(); }, ms); G.timers.push(t); return t; }

function stopGame() {
    G.over = true;
    G.timers.forEach((t) => { clearTimeout(t); clearInterval(t); });
    G.timers = [];
    cancelAnimationFrame(G.raf);
    G.cleanup.forEach((fn) => fn());
    G.cleanup = [];
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

function beginGame(id, opts) {
    stopGame();
    G.id = id; G.score = 0; G.correct = 0; G.over = false; G.locked = false; G.q = 0; G.asked = 0; G.level = 1;
    gel('game-screen').classList.add('open');
    gel('game-result').hidden = true;
    gel('game-title').textContent = GAME_INFO[id].title;
    const area = gel('game-area');
    area.innerHTML = '';
    area.className = 'game-area ' + (opts.scroll ? 'scroll' : 'play');
    gel('game-target').innerHTML = '';
    gel('game-timer').hidden = !opts.level;
    gel('game-timebar').hidden = true;
    if (opts.level) setLevel(1);
    setScore(0);
    syncSoundIcon();
    document.body.style.overflow = 'hidden';
}

function setScore(n) { G.score = Math.max(0, n); gel('game-score').textContent = G.score + ' ⭐'; }
function addScore(n) { setScore(G.score + n); }
function setLevel(n) { G.level = n; gel('game-timer-n').textContent = 'Level ' + n; }

function setTargetLetter(ch) {
    gel('game-target').innerHTML = `<span class="target-pill">Dhoondein <b class="ar">${ch}</b></span>`;
}
function setTargetText(text) {
    gel('game-target').innerHTML = `<span class="target-pill">${text}</span>`;
}

function floatText(area, x, y, text, good) {
    const el = document.createElement('div');
    el.className = 'pop-text ' + (good ? 'plus' : 'minus');
    el.textContent = text;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    area.appendChild(el);
    setTimeout(() => el.remove(), 800);
}

// ---------- Result ----------
// reason: galti ki wajah se khatam hua to uska message
function endGame(reason) {
    if (G.over) return;
    stopGame();
    const info = GAME_INFO[G.id];
    const score = G.score;
    const best = (progress.best && progress.best[G.id]) || 0;
    const isNew = score > best && score > 0;
    if (isNew) { progress.best[G.id] = score; saveProgress(); }
    const [s1, s2, s3] = info.stars;
    const stars = score >= s3 ? 3 : score >= s2 ? 2 : score >= s1 ? 1 : 0;
    const xp = Math.round(score / 5);
    if (xp > 0 && typeof addXP === 'function') addXP(xp);
    if (score > 0 && typeof bumpDaily === 'function') bumpDaily('played');
    if (score > 0) { progress.totalGames = (progress.totalGames || 0) + 1; saveProgress(); }

    const praise = stars === 3 ? 'MashaAllah! Kamaal kar diya' : stars === 2 ? 'Bahut khoob!' : stars === 1 ? 'Achha raha, aur mashq karein' : 'Koi baat nahi, dobara try karein';
    const res = gel('game-result');
    res.innerHTML = `
        <div class="result-card">
            <div class="trophy"><svg class="i"><use href="#i-trophy"/></svg></div>
            ${isNew ? '<span class="new">NAYA RECORD</span>' : ''}
            <h2>${reason ? reason : praise}</h2>
            ${reason ? `<p class="sub" style="margin:2px 0 0">${praise}</p>` : ''}
            <div class="stars">${'⭐'.repeat(stars)}<span style="opacity:.22;filter:grayscale(1)">${'⭐'.repeat(3 - stars)}</span></div>
            <div class="big">${score}</div>
            <div class="sub">Sahi jawab: ${G.correct} • Behtareen: ${Math.max(best, score)} • +${xp} XP</div>
            <div class="result-actions">
                <button class="btn btn-lg btn-block" id="res-again"><svg class="i"><use href="#i-refresh"/></svg> Dobara Khelein</button>
                <button class="btn btn-ghost btn-block" id="res-menu">Games Menu</button>
            </div>
        </div>`;
    res.hidden = false;
    gel('res-again').onclick = () => info.start();
    gel('res-menu').onclick = exitGame;
    renderGameBests();
}

function exitGame() {
    stopGame();
    gel('game-screen').classList.remove('open');
    gel('game-result').hidden = true;
    document.body.style.overflow = '';
    renderGameBests();
}

function renderGameBests() {
    document.querySelectorAll('[data-best]').forEach((el) => {
        const b = progress && progress.best ? progress.best[el.dataset.best] : 0;
        el.hidden = !b;
        el.textContent = b ? 'Behtareen: ' + b : '';
    });
}

function syncSoundIcon() {
    const on = typeof soundOn === 'undefined' ? true : soundOn;
    gel('game-sound').innerHTML = `<svg class="i"><use href="#i-${on ? 'vol' : 'mute'}"/></svg>`;
}

// galti par: thodi der wajah dikhao, phir game khatam
function failAfter(ms, reason) {
    G.locked = true;
    const t = setTimeout(() => endGame(reason), ms);
    G.timers.push(t);
}

// =====================================================
// 1. BUBBLE POP — bade bubble, sahi harf phorte jayein.
//    Galat bubble dabaya to game khatam.
// =====================================================
function startBubblePop() {
    beginGame('bubble', { level: true });
    const area = gel('game-area');
    const order = shuffle(letters().map((l) => l.ar));
    const palette = [['#5BC8F5', '#1E88C7'], ['#7BE0B8', '#1C9B7D'], ['#F7C265', '#D98A12'], ['#C79BE8', '#8E5BC0'], ['#FF9AA2', '#D6455B']];
    let hits = 0;
    const avail = () => order.slice(0, Math.min(order.length, 8 + (G.level - 1) * 3));
    let target = pick(avail());

    const announce = () => { setTargetLetter(target); speakAr(letterVoice(target), 0.8); };
    announce();

    function spawn() {
        const W = area.clientWidth, H = area.clientHeight;
        if (!W || !H) return;
        const pool = avail();
        const size = 92;
        const b = document.createElement('button');
        b.className = 'bubble';
        const ch = Math.random() < 0.4 ? target : pick(pool);
        const [c1, c2] = pick(palette);
        b.dataset.l = ch;
        b.innerHTML = `<span class="in">${ch}</span>`;
        b.style.left = rand(4, Math.max(6, W - size - 4)) + 'px';
        b.style.setProperty('--b1', c1);
        b.style.setProperty('--b2', c2);
        const dist = H + size + 80;
        b.style.setProperty('--rise', -dist + 'px');
        const speed = Math.min(260, rand(80, 120) + (G.level - 1) * 14);
        b.style.setProperty('--dur', (dist / speed).toFixed(2) + 's');
        b.addEventListener('animationend', (e) => { if (e.animationName === 'bubbleRise') b.remove(); });
        b.addEventListener('pointerdown', (e) => { e.preventDefault(); tap(b); });
        area.appendChild(b);
    }

    function tap(b) {
        if (b.dataset.done || G.locked || G.over) return;
        b.dataset.done = '1';
        const rect = b.getBoundingClientRect(), ar = area.getBoundingClientRect();
        const x = rect.left - ar.left + 30, y = rect.top - ar.top;
        if (b.dataset.l === target) {
            const m = new DOMMatrixReadOnly(getComputedStyle(b).transform);
            b.style.setProperty('--y', m.m42 + 'px');
            b.classList.add('pop');
            setTimeout(() => b.remove(), 260);
            addScore(10); G.correct++;
            floatText(area, x, y, '+10', true);
            speakAr(letterVoice(target), 0.85);
            hits++;
            if (hits % 5 === 0) {
                setLevel(G.level + 1);
                floatText(area, area.clientWidth / 2 - 40, 60, 'Level ' + G.level + '!', true);
                target = pick(avail());
                later(announce, 700);
            }
        } else {
            b.classList.add('bad');
            floatText(area, x, y, 'Galat!', false);
            failAfter(700, `Galat bubble! Yeh harf tha ${b.dataset.l}`);
        }
    }

    (function loop() {
        spawn();
        later(loop, Math.max(380, 800 - (G.level - 1) * 55));
    })();
}

// =====================================================
// 2. AGLA HARF — beshumaar sawal, pehli galti par khatam
// =====================================================
function startSequenceGame() {
    beginGame('sequence', { scroll: true });
    nextSequence();
}

function nextSequence() {
    G.q++;
    setTargetText(`Sawal ${G.q} • Sahi: ${G.correct}`);
    const L = letters().map((l) => l.ar);
    const i = rand(0, L.length - 3);
    const trio = [L[i], L[i + 1], L[i + 2]];
    const miss = pick([2, 0, 1, 2]);
    const correct = trio[miss];
    const labels = {
        2: 'In do huroof ke baad kaun sa harf aata hai?',
        0: 'In do huroof se pehle kaun sa harf aata hai?',
        1: 'Beech mein kaun sa harf aayega?'
    };
    const opts = [correct];
    while (opts.length < 4) { const r = pick(L); if (!opts.includes(r) && !trio.includes(r)) opts.push(r); }

    const arrow = '<svg class="i seq-arrow"><use href="#i-left"/></svg>';
    const chips = trio.map((c, k) => k === miss ? '<span class="seq-chip q" id="seq-q">؟</span>' : `<span class="seq-chip">${c}</span>`);
    gel('game-area').innerHTML = `
        <div class="q-card">
            <div class="q-label">${labels[miss]}</div>
            <div class="seq-row">${chips.join(arrow)}</div>
            <div class="opt-grid">${shuffle(opts).map((o) => `<button class="opt" data-ch="${o}">${o}</button>`).join('')}</div>
        </div>`;
    gel('game-area').scrollTop = 0;

    const grid = gel('game-area').querySelector('.opt-grid');
    grid.onclick = (e) => {
        const btn = e.target.closest('.opt');
        if (!btn || G.over || G.locked) return;
        G.locked = true;
        const ok = btn.dataset.ch === correct;
        grid.querySelectorAll('.opt').forEach((b) => {
            b.disabled = true;
            if (b.dataset.ch === correct) b.classList.add('right');
        });
        const q = gel('seq-q'); q.textContent = correct; q.classList.add('filled');
        speakAr(letterVoice(correct), 0.8);
        if (ok) {
            addScore(20); G.correct++;
            later(() => { G.locked = false; nextSequence(); }, 900);
        } else {
            btn.classList.add('wrong');
            const t = setTimeout(() => endGame('Galat jawab!'), 1600);
            G.timers.push(t);
        }
    };
}

// =====================================================
// 3. HARF & TASVEER — 28 huroof, pehli galti par khatam
// =====================================================
function startVocabGame() {
    beginGame('vocab', { scroll: true });
    G.deck = shuffle(vocabData);
    nextVocab();
}

function nextVocab() {
    if (G.q >= G.deck.length) {
        const last = G.deck[G.deck.length - 1];
        G.deck = shuffle(vocabData);
        if (G.deck[0] === last) G.deck.push(G.deck.shift());
        G.q = 0;
    }
    const item = G.deck[G.q];
    G.q++; G.asked = (G.asked || 0) + 1;
    setTargetText(`Sawal ${G.asked} • Sahi: ${G.correct}`);
    const opts = shuffle([item].concat(shuffle(vocabData.filter((v) => v.letter !== item.letter)).slice(0, 2)));

    gel('game-area').innerHTML = `
        <div class="q-card">
            <div class="q-label">Kaunsi cheez is harf se shuru hoti hai?</div>
            <div class="vocab-big ar">${item.letter}</div>
            <div class="opt-grid three">${opts.map((o) => `<button class="opt emoji" data-l="${o.letter}" aria-label="${o.eng}">${o.emoji}</button>`).join('')}</div>
            <div class="reveal" id="vocab-reveal"></div>
        </div>`;
    gel('game-area').scrollTop = 0;
    speakAr(letterVoice(item.letter), 0.8);

    const grid = gel('game-area').querySelector('.opt-grid');
    grid.onclick = (e) => {
        const btn = e.target.closest('.opt');
        if (!btn || G.over || G.locked) return;
        G.locked = true;
        const ok = btn.dataset.l === item.letter;
        grid.querySelectorAll('.opt').forEach((b) => {
            b.disabled = true;
            if (b.dataset.l === item.letter) b.classList.add('right');
        });
        const rv = gel('vocab-reveal');
        const info = `<span class="ar">${item.ar}</span>${item.word} • ${item.eng}`;
        if (ok) {
            addScore(15); G.correct++;
            rv.innerHTML = info;
            speakAr(item.ar, 0.75);
            later(() => { G.locked = false; nextVocab(); }, 1800);
        } else {
            btn.classList.add('wrong');
            rv.classList.add('bad');
            rv.innerHTML = `Sahi jawab: ${item.emoji}${info}`;
            const t = setTimeout(() => endGame('Galat jawab!'), 2400);
            G.timers.push(t);
        }
    };
}

// =====================================================
// 4. HARF KI TOKRI — girte harf pakdein.
//    Galat harf tokri mein aaya to game khatam.
// =====================================================
function startBasketGame() {
    beginGame('basket', { level: true });
    const area = gel('game-area');
    area.innerHTML = `
        <div id="basket">🧺</div>
        <button class="pad l" data-dir="-1" aria-label="Left"><svg class="i"><use href="#i-left"/></svg></button>
        <button class="pad r" data-dir="1" aria-label="Right"><svg class="i"><use href="#i-right"/></svg></button>`;
    const basket = gel('basket');
    const order = shuffle(letters().map((l) => l.ar));
    const avail = () => order.slice(0, Math.min(order.length, 6 + (G.level - 1) * 2));
    let target = pick(avail());
    let caught = 0, dir = 0, bx = area.clientWidth / 2, last = performance.now(), spawnIn = 0;
    const items = [];

    const announce = () => { setTargetLetter(target); speakAr(letterVoice(target), 0.8); };
    announce();

    const move = (clientX) => {
        const r = area.getBoundingClientRect();
        bx = Math.min(r.width - 40, Math.max(40, clientX - r.left));
    };
    const onMove = (e) => { if (e.target.closest('.pad')) return; move(e.clientX); };
    area.addEventListener('pointermove', onMove);
    area.addEventListener('pointerdown', onMove);
    const key = (e) => {
        if (e.key === 'ArrowLeft') dir = e.type === 'keydown' ? -1 : (dir === -1 ? 0 : dir);
        if (e.key === 'ArrowRight') dir = e.type === 'keydown' ? 1 : (dir === 1 ? 0 : dir);
    };
    document.addEventListener('keydown', key);
    document.addEventListener('keyup', key);
    G.cleanup.push(() => {
        area.removeEventListener('pointermove', onMove);
        area.removeEventListener('pointerdown', onMove);
        document.removeEventListener('keydown', key);
        document.removeEventListener('keyup', key);
    });

    area.querySelectorAll('.pad').forEach((p) => {
        const d = parseInt(p.dataset.dir, 10);
        p.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); dir = d; p.setPointerCapture(e.pointerId); });
        const off = () => { if (dir === d) dir = 0; };
        p.addEventListener('pointerup', off);
        p.addEventListener('pointercancel', off);
        p.addEventListener('lostpointercapture', off);
    });

    function flash(cls) {
        basket.classList.remove('good', 'bad');
        void basket.offsetWidth;
        basket.classList.add(cls);
    }

    function frame(now) {
        if (G.over) return;
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        const W = area.clientWidth, H = area.clientHeight;

        bx = Math.min(W - 40, Math.max(40, bx + dir * 460 * dt));
        basket.style.left = bx + 'px';

        spawnIn -= dt;
        if (spawnIn <= 0 && W && !G.locked) {
            spawnIn = Math.max(0.5, 1.0 - (G.level - 1) * 0.06);
            const ch = Math.random() < 0.4 ? target : pick(avail());
            const el = document.createElement('div');
            el.className = 'fall' + (ch === target ? ' target' : '');
            el.textContent = ch;
            area.appendChild(el);
            const fallTime = Math.max(1.7, 3.3 - (G.level - 1) * 0.18);
            items.push({ el, ch, x: rand(34, Math.max(36, W - 34)), y: -60, vy: (H + 80) / (fallTime + Math.random() * 0.6) });
        }

        const basketTop = H - 74 - 62;
        for (let i = items.length - 1; i >= 0; i--) {
            const it = items[i];
            it.y += it.vy * dt;
            it.el.style.transform = `translate(${it.x - 28}px, ${it.y}px)`;
            const bottom = it.y + 56;
            if (!G.locked && bottom >= basketTop + 10 && it.y <= basketTop + 40 && Math.abs(it.x - bx) < 52) {
                items.splice(i, 1);
                it.el.remove();
                if (it.ch === target) {
                    addScore(10); G.correct++; caught++; flash('good');
                    floatText(area, it.x - 14, basketTop - 10, '+10', true);
                    speakAr(letterVoice(it.ch), 0.85);
                    if (caught % 5 === 0) {
                        setLevel(G.level + 1);
                        floatText(area, area.clientWidth / 2 - 40, 60, 'Level ' + G.level + '!', true);
                        target = pick(avail());
                        later(announce, 700);
                    }
                } else {
                    flash('bad');
                    floatText(area, it.x - 14, basketTop - 10, 'Galat!', false);
                    failAfter(700, `Galat harf! Yeh ${it.ch} tha`);
                }
            } else if (it.y > H) {
                items.splice(i, 1);
                it.el.remove();
            }
        }
        G.raf = requestAnimationFrame(frame);
    }
    G.raf = requestAnimationFrame((t) => { last = t; frame(t); });
}

// ---------- Wiring ----------
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-game]').forEach((card) => {
        card.addEventListener('click', () => GAME_INFO[card.dataset.game].start());
    });
    gel('game-exit').addEventListener('click', exitGame);
    gel('game-sound').addEventListener('click', () => {
        if (typeof setSound === 'function') setSound(!soundOn);
        syncSoundIcon();
    });
});
