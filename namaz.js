'use strict';

const NamazState = { tab: 'wudu', wuduStep: 0, tasbeehIndex: 0, tasbeehCounts: [0, 0, 0], fatihaAudio: new Audio() };
NamazState.fatihaAudio.preload = 'auto';

function ensureNamazData() {
    if (!progress) return;
    if (!progress.namaz) progress.namaz = {};
    if (!progress.namazRewardDate) progress.namazRewardDate = '';
    if (!progress.tasbeehRewardDate) progress.tasbeehRewardDate = '';
}

function openNamaz() { if (!progress) return; ensureNamazData(); NamazState.tab = 'wudu'; NamazState.wuduStep = 0; renderNamazView(); $('namaz-view').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeNamaz() { NamazState.fatihaAudio.pause(); NamazState.fatihaAudio.onended = null; if ('speechSynthesis' in window) window.speechSynthesis.cancel(); $('namaz-view').classList.remove('open'); document.body.style.overflow = ''; }

function renderNamazView() {
    const tabs = [
        { id: 'wudu', label: '🌊 Wudu' },
        { id: 'namaz', label: '🕌 5 Namaz' },
        { id: 'fatiha', label: '📖 Fatiha' },
        { id: 'tasbeeh', label: '📿 Tasbeeh' },
        { id: 'track', label: '✅ Tracker' }
    ];
    $('namaz-view').innerHTML = `
        <div class="namaz-top">
            <button class="icon-btn" data-namaz="close" aria-label="Band karein">${ico('x')}</button>
            <div class="t"><b>Namaz — Bunyadi Course</b><small>Qadam ba qadam, aasan andaz mein</small></div>
        </div>
        <div class="namaz-tabs">${tabs.map(t => `<button class="namaz-tab ${t.id === NamazState.tab ? 'on' : ''}" data-namaz="tab" data-tab="${t.id}">${t.label}</button>`).join('')}</div>
        <div class="namaz-content" id="namaz-content">${renderNamazTabContent()}</div>`;
}

function renderNamazTabContent() {
    switch (NamazState.tab) {
        case 'wudu': return renderWudu();
        case 'namaz': return renderNamazTimes();
        case 'fatiha': return renderFatiha();
        case 'tasbeeh': return renderTasbeeh();
        case 'track': return renderNamazTracker();
        default: return '';
    }
}
function refreshNamazContent() { const c = $('namaz-content'); if (c) c.innerHTML = renderNamazTabContent(); document.querySelectorAll('.namaz-tab').forEach(b => b.classList.toggle('on', b.dataset.tab === NamazState.tab)); }

function renderWudu() {
    const step = namazData.wudu[NamazState.wuduStep];
    const total = namazData.wudu.length;
    const isLast = NamazState.wuduStep === total - 1;
    return `
        <div class="wudu-dots">${Array.from({ length: total }, (_, i) => `<i class="${i === NamazState.wuduStep ? 'on' : ''}"></i>`).join('')}</div>
        <div class="wudu-card">
            <div class="wudu-emoji">${step.emoji}</div>
            <div class="wudu-badge">Qadam ${step.step} / ${total}</div>
            <h2>${esc(step.title)}</h2>
            ${step.ar ? `<div class="wudu-ar ar">${esc(step.ar)}</div>` : ''}
            ${step.ro && !step.ar ? `<div class="wudu-ro">${esc(step.ro)}</div>` : ''}
            <p class="wudu-detail">${esc(step.detail)}</p>
            <div class="wudu-tip">💡 ${esc(step.tip)}</div>
            ${step.ar ? `<button class="btn btn-gold" data-namaz="wlisten">🔊 Suniye</button>` : ''}
        </div>
        <div class="wudu-nav">
            <button class="btn btn-ghost" data-namaz="wprev" ${NamazState.wuduStep === 0 ? 'disabled' : ''}>← Pichla</button>
            ${isLast ? `<button class="btn btn-lg btn-gold" data-namaz="tab" data-tab="fatiha">Fatiha Padhein →</button>` : `<button class="btn btn-lg" data-namaz="wnext">Agla →</button>`}
        </div>`;
}

function renderNamazTimes() {
    return `
        <div class="namaz-times-list">${namazData.namaz.map(n => `
            <div class="nt-card">
                <div class="nt-emoji">${n.emoji}</div>
                <div class="nt-body">
                    <div class="nt-head"><h3>${esc(n.name)}</h3><span class="nt-ar ar">${esc(n.ar)}</span></div>
                    <small class="nt-time">${esc(n.time)}</small>
                    <div class="nt-rakats">${n.rakats.map(r => `<span class="nt-pill ${r.type.toLowerCase()}">${r.count} ${r.type}</span>`).join('')}</div>
                </div>
            </div>`).join('')}
        </div>
        <div class="section-head" style="margin-top:24px"><h2>Namaz ke Andar — 9 Qadam</h2></div>
        <div class="positions-list">${namazData.positions.map((p, i) => `
            <div class="pos-card">
                <div class="pos-num">${i + 1}</div>
                <div class="pos-body">
                    <div class="pos-head"><h4>${esc(p.title)}</h4><span class="pos-emoji">${p.emoji}</span></div>
                    ${p.ar ? `<div class="pos-ar ar">${esc(p.ar)}</div>` : ''}
                    <p>${esc(p.detail)}</p>
                    ${p.note ? `<small class="pos-note">${esc(p.note)}</small>` : ''}
                    ${p.ar ? `<button class="mini" data-namaz="plisten" data-ar="${esc(p.ar)}">🔊 Suniye</button>` : ''}
                </div>
            </div>`).join('')}
        </div>`;
}

function renderFatiha() {
    return `
        <div class="fatiha-hero">
            <div class="fatiha-title-ar ar">سورة الفاتحة</div>
            <h2>Surah Al-Fatiha</h2>
            <p class="fatiha-sub">Namaz ki rooh — iske bina namaz nahi hoti</p>
            <button class="btn btn-gold" data-namaz="fplayall">▶ Poori suniye</button>
        </div>
        <div class="fatiha-list">${namazData.fatiha.ayat.map((a, i) => `
            <div class="fatiha-ayah">
                <button class="fatiha-play" data-namaz="fplay" data-ayah="${i + 1}" aria-label="Suniye">▶</button>
                <div class="fatiha-body">
                    <div class="ar">${esc(a)}</div>
                    <div class="tr">${esc(namazData.fatiha.tr[i])}</div>
                </div>
            </div>`).join('')}
        </div>
        <div class="fatiha-fazilat">💡 ${esc(namazData.fatiha.fazilat)}</div>`;
}

function renderTasbeeh() {
    const t = namazData.tasbeeh[NamazState.tasbeehIndex];
    const c = NamazState.tasbeehCounts[NamazState.tasbeehIndex];
    const done = c >= t.count;
    return `
        <div class="tasbeeh-tabs">${namazData.tasbeeh.map((x, i) => `<button class="tasbeeh-tab ${i === NamazState.tasbeehIndex ? 'on' : ''}" data-namaz="tswitch" data-ti="${i}">${x.emoji} ${esc(x.ro)}</button>`).join('')}</div>
        <div class="tasbeeh-main ${done ? 'done' : ''}">
            <div class="tasbeeh-ar ar">${esc(t.ar)}</div>
            <div class="tasbeeh-meaning">${esc(t.meaning)}</div>
            <div class="tasbeeh-count"><b>${c}</b> / ${t.count}</div>
            <button class="tasbeeh-btn" data-namaz="ttap" aria-label="Count">${done ? '✓' : 'Tap'}</button>
            <div class="tasbeeh-actions"><button class="btn btn-ghost" data-namaz="treset">Reset</button><button class="btn btn-gold" data-namaz="tspeak">🔊 Suniye</button></div>
        </div>
        <div class="tasbeeh-info">💡 <b>Namaz ke baad:</b> SubhanAllah 33×, Alhamdulillah 33×, Allahu Akbar 34× — phir Ayat-ul-Kursi padho.</div>`;
}

function renderNamazTracker() {
    ensureNamazData();
    const today = dayStr(new Date());
    const todayData = progress.namaz[today] || {};
    const countToday = namazData.namaz.filter(n => todayData[n.id]).length;
    const last7 = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i);
        const ds = dayStr(d);
        last7.push({ date: ds, data: progress.namaz[ds] || {}, label: i === 0 ? 'Aaj' : d.toLocaleDateString('en', { weekday: 'short' }), isToday: i === 0 });
    }
    return `
        <div class="tracker-head">
            <div><h3>Aaj ki Namaz</h3><small>${new Date().toLocaleDateString('en', { weekday: 'long', day: 'numeric', month: 'short' })}</small></div>
            <div class="tracker-count">${countToday}/5</div>
        </div>
        <div class="today-namaz">${namazData.namaz.map(n => `
            <button class="namaz-tick ${todayData[n.id] ? 'on' : ''}" data-namaz="tick" data-id="${n.id}">
                <span class="nt-emoji">${n.emoji}</span>
                <span class="nt-name">${esc(n.name)}</span>
                <span class="nt-check">${todayData[n.id] ? '✓' : ''}</span>
            </button>`).join('')}
        </div>
        <div class="tracker-head" style="margin-top:22px"><h3>Pichhle 7 Din</h3></div>
        <div class="week-grid">${last7.map(d => `
            <div class="day-cell ${d.isToday ? 'today' : ''}">
                <div class="dc-label">${esc(d.label)}</div>
                <div class="dc-dots">${namazData.namaz.map(n => `<i class="${d.data[n.id] ? 'on' : ''}" title="${n.name}"></i>`).join('')}</div>
            </div>`).join('')}
        </div>
        <div class="tracker-tip">💡 Har din paanchon namaz tick karein — paanchon mukammal karne par +20 XP.</div>`;
}

function playFatiha(ayah, keepChain) {
    NamazState.fatihaAudio.pause();
    if (!keepChain) NamazState.fatihaAudio.onended = null;
    const qari = (typeof Q !== 'undefined' && Q.qari) || 'Alafasy_128kbps';
    NamazState.fatihaAudio.src = `https://everyayah.com/data/${qari}/001${String(ayah).padStart(3, '0')}.mp3`;
    const p = NamazState.fatihaAudio.play();
    if (p && p.catch) p.catch(() => speakAr(namazData.fatiha.ayat[ayah - 1], 0.8));
}
function playFatihaAll() {
    let n = 1;
    NamazState.fatihaAudio.onended = () => { n++; if (n <= 7) playFatiha(n, true); else NamazState.fatihaAudio.onended = null; };
    playFatiha(1, true);
}
function tapTasbeeh() {
    const t = namazData.tasbeeh[NamazState.tasbeehIndex];
    if (NamazState.tasbeehCounts[NamazState.tasbeehIndex] >= t.count) return;
    NamazState.tasbeehCounts[NamazState.tasbeehIndex]++;
    speakAr(t.ar, 0.85);
    refreshNamazContent();
    if (NamazState.tasbeehCounts.every((c, i) => c >= namazData.tasbeeh[i].count)) {
        const today = dayStr(new Date());
        if (progress.tasbeehRewardDate !== today) { progress.tasbeehRewardDate = today; addXP(5); saveProgress(); toast("Tasbeeh mukammal! +5 XP"); }
    }
}
function toggleNamazTick(id) {
    ensureNamazData();
    const today = dayStr(new Date());
    if (!progress.namaz[today]) progress.namaz[today] = {};
    progress.namaz[today][id] = !progress.namaz[today][id];
    saveProgress();
    refreshNamazContent();
    if (namazData.namaz.every(n => progress.namaz[today][n.id])) {
        if (progress.namazRewardDate !== today) { progress.namazRewardDate = today; addXP(20); saveProgress(); toast("Aaj ki paanchon namaz mukammal! +20 XP"); }
    }
}

function setupNamazEvents() {
    const v = $('namaz-view');
    if (!v) return;
    v.addEventListener('click', (e) => {
        const b = e.target.closest('[data-namaz]');
        if (!b || b.disabled) return;
        const act = b.dataset.namaz;
        if (act === 'close') return closeNamaz();
        if (act === 'tab') return switchNamazTab(b.dataset.tab);
        if (act === 'wprev') { if (NamazState.wuduStep > 0) { NamazState.wuduStep--; refreshNamazContent(); } return; }
        if (act === 'wnext') { if (NamazState.wuduStep < namazData.wudu.length - 1) { NamazState.wuduStep++; refreshNamazContent(); } return; }
        if (act === 'wlisten') { const s = namazData.wudu[NamazState.wuduStep]; if (s.ar) speakAr(s.ar, 0.75); return; }
        if (act === 'plisten') return speakAr(b.dataset.ar, 0.75);
        if (act === 'fplay') return playFatiha(parseInt(b.dataset.ayah, 10));
        if (act === 'fplayall') return playFatihaAll();
        if (act === 'tswitch') { NamazState.tasbeehIndex = parseInt(b.dataset.ti, 10); refreshNamazContent(); return; }
        if (act === 'ttap') return tapTasbeeh();
        if (act === 'treset') { NamazState.tasbeehCounts[NamazState.tasbeehIndex] = 0; refreshNamazContent(); return; }
        if (act === 'tspeak') { const t = namazData.tasbeeh[NamazState.tasbeehIndex]; return speakAr(t.ar, 0.75); }
        if (act === 'tick') return toggleNamazTick(b.dataset.id);
    });
}
function switchNamazTab(tab) { NamazState.tab = tab; renderNamazView(); }

document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && $('namaz-view') && $('namaz-view').classList.contains('open')) closeNamaz(); });
window.addEventListener('DOMContentLoaded', () => { const hero = $('namaz-hero'); if (hero) hero.addEventListener('click', openNamaz); setupNamazEvents(); });
