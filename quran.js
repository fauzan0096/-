'use strict';
/* ==========================================================
   Quran tab — aakhri 10 surah, qari ke saath ayah-ba-ayah
   Awaaz everyayah.com se stream hoti hai (internet chahiye).
   ========================================================== */

const Q = {
    s: null,          // abhi khuli hui surah
    idx: -2,          // -2 = shuru nahi, -1 = Bismillah, 0.. = ayah ka index
    playing: false,
    repeat: 1,        // har ayah kitni baar
    rep: 0,
    rate: 1,
    qari: lsGet('qari', QARIS[0].id),
    audio: new Audio(),
    showTr: lsGet('show_tr', '1') !== '0',
    tok: 0,
    blobUrl: null
};
Q.audio.preload = 'auto';
if (!QARIS.some((q) => q.id === Q.qari)) Q.qari = QARIS[0].id;

const REPEATS = [1, 3, 5];
const RATES = [1, 0.85, 0.7];
const pad3 = (n) => String(n).padStart(3, '0');
const ayahUrl = (surahNo, ayah) => `https://everyayah.com/data/${Q.qari}/${pad3(surahNo)}${pad3(ayah)}.mp3`;
const bismillahUrl = () => `https://everyayah.com/data/${Q.qari}/001001.mp3`;
const qariName = () => (QARIS.find((q) => q.id === Q.qari) || QARIS[0]).name;

// Dikhane ki tarteeb: An-Nas (114) se Al-Fil (105) tak — chhoti surah pehle
function surahOrder() { return surahData.slice().sort((a, b) => b.n - a.n); }

// ---------- List ----------
function renderSurahList() {
    if (!progress) return;
    const mem = progress.memorized || [];
    const heard = progress.heard || [];
    $('quran-progress-text').textContent = `Yaad: ${mem.length} / ${surahData.length}`;
    $('quran-progress-bar').style.width = (mem.length / surahData.length * 100) + '%';
    $('surah-list').innerHTML = surahOrder().map((s) => `
        <button class="surah-card" data-surah="${s.n}">
            <span class="s-no">${s.n}</span>
            <span class="s-info">
                <span class="s-ar ar">سورة ${s.ar}</span>
                <b>${esc(s.ro)}</b>
                <small>${esc(s.meaning)} • ${s.ayat.length} ayaat</small>
            </span>
            <span class="s-tags">
                ${mem.includes(s.n) ? `<span class="pill ok">${ico('check')} Yaad</span>` : heard.includes(s.n) ? `<span class="pill">${ico('vol')} Suni</span>` : ''}
            </span>
        </button>`).join('');
}

// ---------- Reader ----------
function openSurah(n) {
    const s = surahData.find((x) => x.n === n);
    if (!s) return;
    srStop();
    Q.s = s; Q.idx = -2; Q.rep = 0;
    const order = surahOrder();
    const pos = order.findIndex((x) => x.n === n);
    const mem = (progress.memorized || []).includes(n);
    const r = $('surah-reader');

    r.innerHTML = `
        <div class="reader-progress"><i id="sr-bar"></i></div>
        <div class="reader-hero" style="--c:#123B7A">
            <div class="reader-bar">
                <button class="icon-btn" data-sr="close" aria-label="Wapas">${ico('left')}</button>
                <span class="count">Surah ${s.n} • ${s.ayat.length} ayaat</span>
            </div>
            <div class="ar sr-title">سورة ${s.ar}</div>
            <h1>${esc(s.ro)}</h1>
            <div class="meta"><span class="pill">${esc(s.meaning)}</span></div>
            <p class="sr-summary">${esc(s.summary)}</p>
        </div>
        <div class="reader-sheet">
            <div class="player-card">
                <button class="big-play" data-sr="toggle" id="sr-play" aria-label="Chalayein">${ico('play')}</button>
                <div class="player-info"><b id="sr-now">Shuru karne ke liye dabayein</b><small id="sr-sub">${esc(qariName())}</small></div>
                <button class="ctl" data-sr="repeat" id="sr-repeat" title="Har ayat kitni baar">${ico('repeat')} <span>${Q.repeat}×</span></button>
                <button class="ctl" data-sr="rate" id="sr-rate" title="Raftaar"><span>${Q.rate}×</span></button>
            </div>
            <div class="sr-tools">
                <button class="tool-chip ${Q.showTr ? 'on' : ''}" data-sr="tr" id="sr-tr">${ico('bulb')} Matlab</button>
                <button class="tool-chip" data-sr="offline" id="sr-off">${offLabel(s.n)}</button>
            </div>
            <div class="qari-row" id="sr-qaris">${qariChips()}</div>
            <div class="ayah-list">
                <div class="bism ar" id="ayah--1">${BISMILLAH}</div>
                ${s.ayat.map((a, i) => `
                    <button class="ayah" data-ayah="${i}" id="ayah-${i}">
                        <span class="no">${i + 1}</span>
                        <span class="body"><span class="txt ar">${a}</span>${s.tr && s.tr[i] ? `<span class="trn">${esc(s.tr[i])}</span>` : ''}</span>
                    </button>`).join('')}
            </div>
            <div class="reader-actions">
                <button class="btn ${mem ? '' : 'btn-gold'} btn-lg btn-block" data-sr="hifz" id="sr-hifz">${hifzLabel(mem)}</button>
                <div class="reader-nav">
                    <button class="btn btn-ghost" data-sr="prev" ${pos === 0 ? 'disabled' : ''}>${ico('left')} Pichli</button>
                    <button class="btn btn-ghost" data-sr="next" ${pos === order.length - 1 ? 'disabled' : ''}>Agli ${ico('right')}</button>
                </div>
            </div>
            <p class="sr-note">Qari ki awaaz ke liye internet chahiye.</p>
        </div>`;
    r.classList.add('open');
    r.classList.toggle('hide-tr', !Q.showTr);
    r.scrollTop = 0;
}

function qariChips() {
    return QARIS.map((q) => `<button class="qchip ${q.id === Q.qari ? 'on' : ''}" data-qari="${q.id}"><b>${esc(q.name)}</b><small>${esc(q.note)}</small></button>`).join('');
}
function hifzLabel(on) { return on ? `${ico('check')} Yaad ho gayi` : `${ico('check')} Yaad ho gayi (+25 XP)`; }

function closeSurah() {
    srStop();
    Q.s = null;
    $('surah-reader').classList.remove('open');
    renderSurahList();
}

// ---------- Playback ----------
function srStop() {
    Q.playing = false;
    Q.idx = -2; Q.rep = 0;
    try { Q.audio.pause(); } catch (e) { /* ignore */ }
    document.querySelectorAll('.ayah.on, .bism.on').forEach((e) => e.classList.remove('on'));
}

function srUI() {
    if (!Q.s) return;
    const play = $('sr-play');
    if (!play) return;
    play.innerHTML = ico(Q.playing ? 'pause' : 'play');
    play.classList.toggle('on', Q.playing);
    const now = $('sr-now');
    if (Q.idx === -2) now.textContent = 'Shuru karne ke liye dabayein';
    else if (Q.idx === -1) now.textContent = 'Bismillah';
    else now.textContent = `Ayat ${Q.idx + 1} / ${Q.s.ayat.length}` + (Q.repeat > 1 ? `  •  ${Q.rep + 1}/${Q.repeat} baar` : '');
    $('sr-sub').textContent = qariName();
    $('sr-bar').style.width = (Q.idx < 0 ? 0 : (Q.idx + 1) / Q.s.ayat.length * 100) + '%';
    $('sr-repeat').querySelector('span').textContent = Q.repeat + '×';
    $('sr-rate').querySelector('span').textContent = Q.rate + '×';
    document.querySelectorAll('.ayah.on, .bism.on').forEach((e) => e.classList.remove('on'));
    const cur = $('ayah-' + Q.idx);
    if (cur && Q.idx >= -1) {
        cur.classList.add('on');
        cur.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function srPlayCurrent() {
    if (!Q.s) return;
    const url = Q.idx === -1 ? bismillahUrl() : ayahUrl(Q.s.n, Q.idx + 1);
    const tok = ++Q.tok;
    Q.playing = true;
    srUI();
    cachedSrc(url).then((src) => {
        if (tok !== Q.tok || !Q.s || !Q.playing) return;
        Q.audio.src = src;
        Q.audio.playbackRate = Q.rate;
        const p = Q.audio.play();
        if (p && p.catch) p.catch((e) => { if (e && e.name !== 'AbortError') srError(); });
    });
}

// ---------- Offline (phone mein save) ----------
const AUDIO_CACHE = 'qa-audio-v1';
const offKey = () => 'off_' + Q.qari;
const offList = () => lsGet(offKey(), []) || [];
function isOffline(n) { return offList().includes(n); }
function offLabel(n) { return isOffline(n) ? `${ico('check')} Offline save hai` : `${ico('download')} Offline save karein`; }

function cachedSrc(url) {
    if (!('caches' in window)) return Promise.resolve(url);
    return caches.open(AUDIO_CACHE).then((c) => c.match(url)).then((hit) => {
        if (!hit) return url;
        return hit.blob().then((b) => {
            if (Q.blobUrl) URL.revokeObjectURL(Q.blobUrl);
            Q.blobUrl = URL.createObjectURL(b);
            return Q.blobUrl;
        });
    }).catch(() => url);
}

async function srDownload() {
    const s = Q.s;
    if (!s) return;
    const btn = $('sr-off');
    if (!('caches' in window)) { toast('Is browser mein offline save nahi ho sakta.'); return; }
    if (isOffline(s.n)) {
        const c = await caches.open(AUDIO_CACHE);
        const urls = [bismillahUrl()].concat(s.ayat.map((a, i) => ayahUrl(s.n, i + 1)));
        await Promise.all(urls.slice(1).map((u) => c.delete(u)));
        lsSet(offKey(), offList().filter((x) => x !== s.n));
        btn.innerHTML = offLabel(s.n);
        toast('Offline save hata diya.');
        return;
    }
    if (!navigator.onLine) { toast('Download ke liye internet chahiye.'); return; }
    const urls = [bismillahUrl()].concat(s.ayat.map((a, i) => ayahUrl(s.n, i + 1)));
    const c = await caches.open(AUDIO_CACHE);
    btn.disabled = true;
    try {
        for (let i = 0; i < urls.length; i++) {
            btn.textContent = `Download ${i + 1}/${urls.length}…`;
            if (await c.match(urls[i])) continue;
            const r = await fetch(urls[i], { mode: 'cors' });
            if (!r.ok) throw new Error('http ' + r.status);
            await c.put(urls[i], r);
        }
        const l = offList(); l.push(s.n); lsSet(offKey(), l);
        toast('Ho gaya! Ab ye surah bina internet ke chalegi.');
    } catch (e) {
        toast('Download nahi ho saka. Internet check karein ya doosra qari chunein.');
    }
    btn.disabled = false;
    btn.innerHTML = offLabel(s.n);
}

function srPlayFrom(i) { Q.rep = 0; Q.idx = i; srPlayCurrent(); }

function srToggle() {
    if (!Q.s) return;
    if (Q.playing) { Q.audio.pause(); Q.playing = false; srUI(); return; }
    if (Q.idx >= -1 && Q.audio.getAttribute('src')) {        // beech se dobara chalao
        Q.playing = true; srUI();
        const p = Q.audio.play();
        if (p && p.catch) p.catch((e) => { if (e && e.name !== 'AbortError') srError(); });
    } else {
        srPlayFrom(-1);
    }
}

function srError() {
    if (!Q.s || !Q.audio.getAttribute('src')) return;
    Q.playing = false;
    srUI();
    toast(navigator.onLine ? 'Awaaz load nahi hui. Doosra qari chunein.' : 'Internet nahi hai — qari ki awaaz ke liye internet chahiye.');
}

function srFinish() {
    const n = Q.s.n;
    Q.playing = false; Q.idx = -2; Q.rep = 0;
    srUI();
    progress.heard = progress.heard || [];
    if (!progress.heard.includes(n)) {
        progress.heard.push(n);
        saveProgress();
        addXP(10);
    } else {
        toast('Surah mukammal — MashaAllah!');
    }
    if (typeof bumpDaily === 'function') bumpDaily('surah', n);
}

Q.audio.addEventListener('ended', () => {
    if (!Q.s || !Q.playing) return;
    if (Q.idx >= 0 && Q.rep < Q.repeat - 1) { Q.rep++; srPlayCurrent(); return; }   // yaad karne ke liye dohrao
    Q.rep = 0;
    if (Q.idx < Q.s.ayat.length - 1) { Q.idx++; srPlayCurrent(); } else srFinish();
});
Q.audio.addEventListener('error', srError);

function srToggleHifz() {
    const n = Q.s.n;
    progress.memorized = progress.memorized || [];
    progress.hifzXp = progress.hifzXp || [];
    const i = progress.memorized.indexOf(n);
    if (i >= 0) progress.memorized.splice(i, 1);
    else {
        progress.memorized.push(n);
        if (!progress.hifzXp.includes(n)) { progress.hifzXp.push(n); saveProgress(); addXP(25); }
    }
    saveProgress();
    const on = progress.memorized.includes(n);
    const b = $('sr-hifz');
    b.innerHTML = hifzLabel(on);
    b.classList.toggle('btn-gold', !on);
}

// ---------- Wiring ----------
window.addEventListener('DOMContentLoaded', () => {
    $('surah-list').addEventListener('click', (e) => {
        const c = e.target.closest('.surah-card');
        if (c) openSurah(parseInt(c.dataset.surah, 10));
    });

    $('surah-reader').addEventListener('click', (e) => {
        const ay = e.target.closest('.ayah');
        if (ay) { srPlayFrom(parseInt(ay.dataset.ayah, 10)); return; }

        const qc = e.target.closest('[data-qari]');
        if (qc) {
            Q.qari = qc.dataset.qari;
            lsSet('qari', Q.qari);
            $('sr-qaris').innerHTML = qariChips();
            $('sr-off').innerHTML = offLabel(Q.s.n);
            if (Q.playing && Q.idx >= -1) srPlayCurrent(); else srUI();
            return;
        }

        const b = e.target.closest('[data-sr]');
        if (!b || b.disabled) return;
        const act = b.dataset.sr;
        const order = surahOrder();
        const pos = order.findIndex((x) => x.n === Q.s.n);
        if (act === 'close') closeSurah();
        else if (act === 'toggle') srToggle();
        else if (act === 'repeat') { Q.repeat = REPEATS[(REPEATS.indexOf(Q.repeat) + 1) % REPEATS.length]; Q.rep = 0; srUI(); }
        else if (act === 'rate') { Q.rate = RATES[(RATES.indexOf(Q.rate) + 1) % RATES.length]; Q.audio.playbackRate = Q.rate; srUI(); }
        else if (act === 'hifz') srToggleHifz();
        else if (act === 'tr') { Q.showTr = !Q.showTr; lsSet('show_tr', Q.showTr ? '1' : '0'); $('surah-reader').classList.toggle('hide-tr', !Q.showTr); b.classList.toggle('on', Q.showTr); }
        else if (act === 'offline') srDownload();
        else if (act === 'prev' && pos > 0) openSurah(order[pos - 1].n);
        else if (act === 'next' && pos < order.length - 1) openSurah(order[pos + 1].n);
    });
});
