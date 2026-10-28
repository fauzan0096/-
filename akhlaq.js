'use strict';

if (typeof badgesData !== 'undefined') {
    badgesData.push(
        { id: 'akhlaq_start', emoji: '🌟', name: 'Akhlaq ka Shuru', desc: '1 akhlaq kahani padhi', tier: 'bronze', check: p => (p.akhlaqDone || []).length >= 1 },
        { id: 'akhlaq_dost', emoji: '🤝', name: 'Akhlaq ka Dost', desc: '5 akhlaq kahaniyan', tier: 'silver', check: p => (p.akhlaqDone || []).length >= 5 },
        { id: 'akhlaq_ustaad', emoji: '🎓', name: 'Akhlaq ka Ustaad', desc: 'Saari 10 akhlaq kahaniyan', tier: 'gold', check: p => (p.akhlaqDone || []).length >= 10 }
    );
}

let currentAkhlaqIndex = -1;

function ensureAkhlaqData() { if (!progress) return; if (!progress.akhlaqDone) progress.akhlaqDone = []; }
function openAkhlaq() { ensureAkhlaqData(); currentAkhlaqIndex = -1; renderAkhlaqList(); $('akhlaq-view').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeAkhlaq() { $('akhlaq-view').classList.remove('open'); document.body.style.overflow = ''; }

function renderAkhlaqList() {
    const done = progress.akhlaqDone || [];
    $('akhlaq-view').innerHTML = `
        <div class="namaz-top">
            <button class="icon-btn" data-akhlaq="close" aria-label="Band">${ico('x')}</button>
            <div class="t"><b>Akhlaq — 10 Kahaniyan</b><small>${done.length} / 10 mukammal</small></div>
        </div>
        <div class="akhlaq-content">
            <div class="akhlaq-intro">💚 Nabiyon aur sahaba ki zindagi se chhoti chhoti kahaniyan — har ek mein ek amal. Padho, samjho, aur aaj hi amal karo.</div>
            <div class="akhlaq-list">${akhlaqData.map((a, i) => {
                const read = done.includes(a.id);
                return `<button class="akhlaq-card ${read ? 'done' : ''}" data-akhlaq="open" data-idx="${i}" style="--c:${a.color}">
                    <span class="ac-emoji">${a.emoji}</span>
                    <span class="ac-body"><span class="ac-tag">${esc(a.tag)}</span><b>${esc(a.name)}</b><small>${a.body.length} paras • 2 min</small></span>
                    <span class="ac-tail">${read ? '✓' : '→'}</span>
                </button>`;
            }).join('')}</div>
        </div>`;
    currentAkhlaqIndex = -1;
}

function openAkhlaqStory(idx) {
    if (idx < 0 || idx >= akhlaqData.length) return;
    currentAkhlaqIndex = idx;
    const a = akhlaqData[idx];
    const read = (progress.akhlaqDone || []).includes(a.id);
    $('akhlaq-view').innerHTML = `
        <div class="namaz-top">
            <button class="icon-btn" data-akhlaq="back" aria-label="Wapas">${ico('left')}</button>
            <div class="t"><b>${esc(a.name)}</b><small>${esc(a.tag)}</small></div>
        </div>
        <div class="akhlaq-content">
            <div class="akhlaq-hero" style="--c:${a.color}">
                <div class="ah-emoji">${a.emoji}</div>
                <div class="ah-ar ar">${esc(a.ar)}</div>
                <h2>${esc(a.name)}</h2>
                <div class="ah-tag">${esc(a.tag)}</div>
            </div>
            <div class="akhlaq-body">
                ${a.body.map(p => `<p>${esc(p)}</p>`).join('')}
                <div class="akhlaq-hadith"><div class="ar">${esc(a.hadith.ar)}</div><div class="ro">"${esc(a.hadith.ro)}"</div></div>
                <div class="akhlaq-amal"><div class="aa-head">💡 Aaj ka Amal</div><p>${esc(a.amal)}</p></div>
                <div class="akhlaq-ref">${esc(a.ref)}</div>
                <div class="akhlaq-nav">
                    <button class="btn btn-ghost" data-akhlaq="prev" ${idx === 0 ? 'disabled' : ''}>← Pichli</button>
                    <button class="btn btn-ghost" data-akhlaq="next" ${idx === akhlaqData.length - 1 ? 'disabled' : ''}>Agli →</button>
                </div>
                <button class="btn btn-gold btn-lg btn-block" data-akhlaq="done" data-id="${a.id}" ${read ? 'disabled' : ''}>${read ? '✓ Padh liya' : 'Maine padh liya (+10 XP)'}</button>
            </div>
        </div>`;
}

function markAkhlaqDone(id) {
    ensureAkhlaqData();
    if (progress.akhlaqDone.includes(id)) return;
    progress.akhlaqDone.push(id);
    saveProgress();
    addXP(10);
    openAkhlaqStory(currentAkhlaqIndex);
    toast('MashaAllah! Ab amal karo — +10 XP');
    updateAkhlaqHero();
}
function updateAkhlaqHero() { const el = $('akhlaq-progress'); if (el && progress) el.textContent = `${(progress.akhlaqDone || []).length} / 10`; }

function setupAkhlaqEvents() {
    const hero = $('akhlaq-hero'); if (hero) hero.addEventListener('click', openAkhlaq);
    const v = $('akhlaq-view');
    if (v) v.addEventListener('click', (e) => {
        const b = e.target.closest('[data-akhlaq]');
        if (!b || b.disabled) return;
        const act = b.dataset.akhlaq;
        if (act === 'close') return closeAkhlaq();
        if (act === 'back') return renderAkhlaqList();
        if (act === 'open') return openAkhlaqStory(parseInt(b.dataset.idx, 10));
        if (act === 'prev') return openAkhlaqStory(currentAkhlaqIndex - 1);
        if (act === 'next') return openAkhlaqStory(currentAkhlaqIndex + 1);
        if (act === 'done') return markAkhlaqDone(b.dataset.id);
    });
    setTimeout(() => updateAkhlaqHero(), 700);
}
window.addEventListener('DOMContentLoaded', setupAkhlaqEvents);
