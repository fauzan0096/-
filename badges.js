'use strict';

const badgesData = [
    { id: 'pehla_qadam', emoji: '🚀', name: 'Pehla Qadam', desc: 'Pehla sabaq mukammal', tier: 'bronze', check: p => p.unlocked >= 1 },
    { id: 'chhota_sitar', emoji: '⭐', name: 'Chhota Sitar', desc: '3 sabaq mukammal', tier: 'bronze', check: p => p.unlocked >= 3 },
    { id: 'aadha_qaida', emoji: '🌓', name: 'Aadha Qaida', desc: '6 sabaq mukammal', tier: 'silver', check: p => p.unlocked >= 6 },
    { id: 'qaida_master', emoji: '🏅', name: 'Qaida Master', desc: 'Saare 12 sabaq', tier: 'gold', check: p => p.unlocked >= 12 },
    { id: 'harf_dost', emoji: '🔤', name: 'Harf ka Dost', desc: '10 huroof yaad', tier: 'silver', check: p => (p.huroofKnown || []).length >= 10 },
    { id: 'harf_shahzada', emoji: '👑', name: 'Harf ka Shahzada', desc: 'Saare 28 huroof', tier: 'gold', check: p => (p.huroofKnown || []).length >= 28 },
    { id: 'qissa_sunne_wala', emoji: '📖', name: 'Qissa Sunne Wala', desc: '1 waqia padha', tier: 'bronze', check: p => (p.storiesRead || []).length >= 1 },
    { id: 'waqia_ka_shauq', emoji: '🎭', name: 'Waqia ka Shauq', desc: '5 waqia padhe', tier: 'silver', check: p => (p.storiesRead || []).length >= 5 },
    { id: 'ambiya_dost', emoji: '✨', name: 'Ambiya ka Dost', desc: 'Saare 12 waqia', tier: 'gold', check: p => (p.storiesRead || []).length >= 12 },
    { id: 'pehli_surah', emoji: '🕋', name: 'Pehli Surah', desc: '1 surah suni', tier: 'bronze', check: p => (p.heard || []).length >= 1 },
    { id: 'quran_ka_shagird', emoji: '📚', name: 'Quran ka Shagird', desc: '3 surah yaad', tier: 'silver', check: p => (p.memorized || []).length >= 3 },
    { id: 'hafiz_e_surah', emoji: '🎓', name: 'Hafiz-e-Surah', desc: 'Saare 10 surah yaad', tier: 'gold', check: p => (p.memorized || []).length >= 10 },
    { id: 'silsila', emoji: '🔥', name: 'Silsila', desc: '7 din lagatar', tier: 'bronze', check: p => p.streak >= 7 },
    { id: 'heera', emoji: '💎', name: 'Heera', desc: '14 din lagatar', tier: 'silver', check: p => p.streak >= 14 },
    { id: 'sultan', emoji: '👑', name: 'Sultan', desc: '30 din lagatar', tier: 'gold', check: p => p.streak >= 30 },
    { id: 'ustad_ka_shagird', emoji: '🏆', name: 'Ustad ka Shagird', desc: '100 din lagatar', tier: 'special', check: p => p.streak >= 100 },
    { id: 'lvl_5', emoji: '🌟', name: 'Uthta Sitara', desc: 'Level 5', tier: 'bronze', check: p => Math.floor(p.xp / 150) + 1 >= 5 },
    { id: 'lvl_10', emoji: '✨', name: 'Chamakta Sitara', desc: 'Level 10', tier: 'silver', check: p => Math.floor(p.xp / 150) + 1 >= 10 },
    { id: 'lvl_20', emoji: '🌙', name: 'Roshan Chand', desc: 'Level 20', tier: 'gold', check: p => Math.floor(p.xp / 150) + 1 >= 20 },
    { id: 'pehla_khel', emoji: '🎮', name: 'Pehla Khel', desc: '1 khel khela', tier: 'bronze', check: p => p.best && Object.keys(p.best).length > 0 },
    { id: 'game_master', emoji: '🎯', name: 'Game Master', desc: 'Saare 4 games', tier: 'silver', check: p => p.best && Object.keys(p.best).length >= 4 },
    { id: 'bubble_badshah', emoji: '🫧', name: 'Bubble ka Badshah', desc: 'Bubble mein 500', tier: 'gold', check: p => p.best && p.best.bubble >= 500 },
    { id: 'namazi', emoji: '🌅', name: 'Namazi', desc: 'Ek din paanchon namaz', tier: 'bronze', check: p => {
        if (!p.namaz) return false;
        const today = new Date().toLocaleDateString('en-CA');
        const t = p.namaz[today] || {};
        return ['fajr','zuhr','asr','maghrib','isha'].every(k => t[k]);
    }},
    { id: 'namaz_pakka', emoji: '🕌', name: 'Namaz Pakka', desc: '7 din paanchon namaz', tier: 'gold', check: p => {
        if (!p.namaz) return false;
        let full = 0;
        for (const d of Object.keys(p.namaz)) {
            const t = p.namaz[d] || {};
            if (['fajr','zuhr','asr','maghrib','isha'].every(k => t[k])) full++;
        }
        return full >= 7;
    }},
    { id: 'tasbeeh_master', emoji: '📿', name: 'Tasbeeh Master', desc: 'Tasbeeh mukammal ki', tier: 'bronze', check: p => !!p.tasbeehRewardDate }
];

const BADGE_TIER_STYLES = {
    bronze: 'linear-gradient(135deg, #CD7F32, #A0522D)',
    silver: 'linear-gradient(135deg, #C0C0C0, #808080)',
    gold: 'linear-gradient(135deg, #D99A2B, #B7700F)',
    special: 'linear-gradient(135deg, #E94E77, #D99A2B, #2E9B62, #2A66BD)'
};

let badgeQueue = [];
let badgeShowing = false;

function ensureBadgesData() { if (!progress) return; if (!progress.badges) progress.badges = []; }
function checkBadges() {
    if (checkBadges._running) return;
    if (!progress) return;
    ensureBadgesData();
    const newly = badgesData.filter(b => !progress.badges.includes(b.id) && b.check(progress));
    if (!newly.length) { updateBadgeHero(); return; }
    checkBadges._running = true;
    newly.forEach(b => progress.badges.push(b.id));
    saveProgress();
    checkBadges._running = false;
    newly.forEach(b => queueBadgeToast(b));
    updateBadgeHero();
    if ($('badges-view') && $('badges-view').classList.contains('open')) renderBadgesView();
}
function queueBadgeToast(badge) { badgeQueue.push(badge); if (!badgeShowing) showNextBadgeToast(); }
function showNextBadgeToast() {
    if (!badgeQueue.length) { badgeShowing = false; return; }
    badgeShowing = true;
    const badge = badgeQueue.shift();
    const more = badgeQueue.length > 0 ? ` <span style="opacity:.75;font-size:12px">+${badgeQueue.length} aur</span>` : '';
    const t = document.createElement('div');
    t.className = 'badge-toast';
    t.innerHTML = `<span class="bt-emoji">${badge.emoji}</span><div class="bt-text"><b>🏆 BADGE UNLOCKED</b><span>${esc(badge.name)}${more}</span></div>`;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add('show'), 50);
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => { t.remove(); showNextBadgeToast(); }, 400); }, 2400);
}
function updateBadgeHero() { const el = $('badges-count'); if (el && progress) el.textContent = `${(progress.badges || []).length} / ${badgesData.length}`; }
function openBadges() { ensureBadgesData(); renderBadgesView(); $('badges-view').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeBadges() { $('badges-view').classList.remove('open'); document.body.style.overflow = ''; }
function renderBadgesView() {
    const earned = progress.badges || [];
    const pct = (earned.length / badgesData.length * 100);
    $('badges-view').innerHTML = `
        <div class="namaz-top">
            <button class="icon-btn" data-badge="close" aria-label="Band karein">${ico('x')}</button>
            <div class="t"><b>Badges</b><small>${earned.length} / ${badgesData.length} earned</small></div>
        </div>
        <div class="badges-content">
            <div class="badges-hero">
                <div class="bh-count"><b>${earned.length}</b><span>/ ${badgesData.length}</span></div>
                <div class="bh-bar"><i style="width:${pct}%"></i></div>
                <small>Har kaam ka apna nishan</small>
            </div>
            <div class="badges-grid">${badgesData.map(b => {
                const on = earned.includes(b.id);
                return `<div class="badge-card ${on ? 'earned' : 'locked'} tier-${b.tier}"><span class="bc-emoji">${on ? b.emoji : '🔒'}</span><div class="bc-name">${esc(b.name)}</div><div class="bc-desc">${esc(b.desc)}</div></div>`;
            }).join('')}</div>
        </div>`;
}
function setupBadgeEvents() {
    if (typeof progressHooks !== 'undefined') progressHooks.push(checkBadges);
    const v = $('badges-view');
    if (v) v.addEventListener('click', (e) => { const b = e.target.closest('[data-badge]'); if (b && b.dataset.badge === 'close') closeBadges(); });
    const hero = $('badges-hero');
    if (hero) hero.addEventListener('click', openBadges);
    updateBadgeHero();
}
window.addEventListener('DOMContentLoaded', () => { setupBadgeEvents(); setTimeout(() => checkBadges(), 500); });
