'use strict';

if (typeof badgesData !== 'undefined') {
    badgesData.push({ id: 'ghar_ka_malik', emoji: '🏠', name: 'Ghar ka Malik', desc: 'Saare 12 ghar ke saman', tier: 'gold', check: p => (p.gharOwned || []).length >= 12 });
}

function ensureGharData() {
    if (!progress) return;
    if (!progress.gharOwned) progress.gharOwned = [];
    if (typeof progress.sikkaSpent !== 'number') progress.sikkaSpent = 0;
}
function sikkaTotal() { return Math.floor((progress.xp || 0) / 10); }
function sikkaSpentTotal() { return progress.sikkaSpent || 0; }
function sikkaAvailable() { return Math.max(0, sikkaTotal() - sikkaSpentTotal()); }
function openGhar() { ensureGharData(); renderGharView(); $('ghar-view').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeGhar() { $('ghar-view').classList.remove('open'); document.body.style.overflow = ''; }
function posToArea(p) { return `${Math.floor(p / 4) + 1} / ${(p % 4) + 1}`; }

function renderGharView() {
    ensureGharData();
    const owned = progress.gharOwned;
    const avail = sikkaAvailable();
    const slots = Array(12).fill(null);
    gharItems.forEach(it => { slots[it.pos] = it; });
    $('ghar-view').innerHTML = `
        <div class="namaz-top">
            <button class="icon-btn" data-ghar="close" aria-label="Band">${ico('x')}</button>
            <div class="t"><b>Mera Ghar</b><small>${owned.length} / 12 cheezein</small></div>
        </div>
        <div class="ghar-content">
            <div class="ghar-wallet">
                <div class="gw-item"><span class="gw-emoji">🪙</span><div><b>${avail}</b><small>sikka available</small></div></div>
                <div class="gw-divider"></div>
                <div class="gw-item small"><div><b>${sikkaSpentTotal()}</b><small>kharch ho gaye</small></div></div>
            </div>
            <div class="ghar-intro"><b>Yeh tumhara kamra hai</b><small>XP se sikka banta hai (1 sikka = 10 XP). Har cheez ke saath ek baat hai.</small></div>
            <div class="ghar-room">
                <div class="gr-grid">${slots.map((it, p) => {
                    if (!it) return `<div class="gr-slot empty" style="grid-area:${posToArea(p)}"></div>`;
                    const on = owned.includes(it.id);
                    return `<button class="gr-slot ${on ? 'owned' : 'locked'}" data-ghar="info" data-id="${it.id}" style="grid-area:${posToArea(p)}">
                        <span class="gs-emoji">${it.emoji}</span>
                        ${!on ? '<span class="gs-lock">🔒</span>' : ''}
                    </button>`;
                }).join('')}</div>
            </div>
            <div class="ghar-tips">💡 Jitna zyada padhoge, utna zyada sikka milega.</div>
            <div class="ghar-shop-title">Samaan ki Fehrist</div>
            <div class="ghar-list">${gharItems.map(it => {
                const on = owned.includes(it.id);
                const can = avail >= it.cost;
                return `<div class="gl-item ${on ? 'owned' : ''}">
                    <span class="gli-emoji">${it.emoji}</span>
                    <div class="gli-body"><b>${esc(it.name)}</b><small>${on ? 'Sahib ho — MashaAllah' : `${it.cost} sikka`}</small></div>
                    ${on ? '<span class="gli-check">✓</span>' : `<button class="mini ${can ? '' : 'dim'}" data-ghar="buy" data-id="${it.id}" ${can ? '' : 'disabled'}>${can ? 'Kharido' : 'Sikka kam'}</button>`}
                </div>`;
            }).join('')}</div>
        </div>`;
}

function openGharItem(id) {
    const it = gharItems.find(x => x.id === id);
    if (!it) return;
    const owned = (progress.gharOwned || []).includes(id);
    const avail = sikkaAvailable();
    const can = !owned && avail >= it.cost;
    $('ghar-modal').innerHTML = `
        <div class="gm-backdrop" data-ghar="close-modal"></div>
        <div class="gm-card">
            <button class="hm-close" data-ghar="close-modal" aria-label="Band">${ico('x')}</button>
            <div class="gm-emoji">${it.emoji}</div>
            <h3>${esc(it.name)}</h3>
            <p class="gm-tip">${esc(it.tip)}</p>
            <div class="gm-actions">
                ${owned ? '<div class="gm-owned">✓ Sahib ho</div>' : `<div class="gm-cost">🪙 ${it.cost} sikka</div><button class="btn btn-gold btn-block" data-ghar="buy" data-id="${id}" ${can ? '' : 'disabled'}>${can ? 'Kharido' : 'Sikka kam hai'}</button>`}
            </div>
        </div>`;
    $('ghar-modal').hidden = false;
}
function closeGharItem() { const m = $('ghar-modal'); if (m) m.hidden = true; }

function buyGharItem(id) {
    ensureGharData();
    const it = gharItems.find(x => x.id === id);
    if (!it) return;
    if (progress.gharOwned.includes(id)) return;
    if (sikkaAvailable() < it.cost) { toast('Sikka kam hai — thoda aur padho'); return; }
    progress.sikkaSpent += it.cost;
    progress.gharOwned.push(id);
    saveProgress();
    closeGharItem();
    renderGharView();
    toast(`${it.emoji} ${it.name} mil gaya!`);
    updateGharHero();
}
function updateGharHero() { const el = $('ghar-progress'); if (el && progress) el.textContent = `${(progress.gharOwned || []).length} / 12`; }

function setupGharEvents() {
    const hero = $('ghar-hero'); if (hero) hero.addEventListener('click', openGhar);
    const v = $('ghar-view');
    if (v) v.addEventListener('click', (e) => {
        const b = e.target.closest('[data-ghar]');
        if (!b || b.disabled) return;
        const act = b.dataset.ghar;
        if (act === 'close') return closeGhar();
        if (act === 'info') return openGharItem(b.dataset.id);
        if (act === 'buy') return buyGharItem(b.dataset.id);
    });
    const modal = $('ghar-modal');
    if (modal) modal.addEventListener('click', (e) => {
        const b = e.target.closest('[data-ghar]');
        if (!b || b.disabled) return;
        if (b.dataset.ghar === 'close-modal') return closeGharItem();
        if (b.dataset.ghar === 'buy') return buyGharItem(b.dataset.id);
    });
    setTimeout(() => updateGharHero(), 700);
}
window.addEventListener('DOMContentLoaded', setupGharEvents);
