'use strict';

const missionData = {
    phases: [
        { id: 1, name: "Bagh ka Darwaza", emoji: "🌳", need: 7, reward: "🌿", story: "Tum ne pehle 7 huroof seekhe — yeh tumhari pehli chaabi thi. BAGH ka darwaza khul gaya! Andar hariyali hai, parinde bol rahe hain. Ab aage barho — agla darwaza samne hai." },
        { id: 2, name: "Chashme ka Raasta", emoji: "💧", need: 14, reward: "🪣", story: "Chaudah huroof ho gaye — CHASHME ka raasta khula. Thanda paani behta hai, tumne piya aur taza hue. Ab pahad ki choti nazar aati hai." },
        { id: 3, name: "Pahad ki Choti", emoji: "⛰️", need: 21, reward: "🏔️", story: "Ikkis huroof — PAHAD ki choti tak pohnche. Upar se poora jahan nazar aata hai. Aakhri darwaza door nahi — bas saat huroof aur." },
        { id: 4, name: "Quran ka Ghar", emoji: "🕋", need: 28, reward: "📖", story: "MashaAllah! Saare 28 huroof — QURAN KA GHAR khul gaya. Andar roshni hai. Yeh ghar tumhara hai, isme hamesha raho. Tum ne apna pehla safar mukammal kiya." }
    ],
    dua: { ar: "اللَّهُمَّ اجْعَلْنَا مِنْ حَمَلَةِ الْقُرْآنِ", ro: "Aye Allah! Humain Quran uthane walon mein se kar de." }
};

let missionToastShown = new Set();
function ensureMissionData() { if (!progress) return; if (!progress.missionSeen) progress.missionSeen = []; }
function huroofKnownCount() { return (progress && progress.huroofKnown) ? progress.huroofKnown.length : 0; }
function unlockedPhases() { const n = huroofKnownCount(); return missionData.phases.filter(p => n >= p.need).map(p => p.id); }

function checkMission() {
    if (!progress) return;
    ensureMissionData();
    const unlocked = unlockedPhases();
    unlocked.forEach(id => {
        if (!missionToastShown.has(id) && !progress.missionSeen.includes(id)) {
            const phase = missionData.phases.find(p => p.id === id);
            if (phase) showMissionToast(phase);
            missionToastShown.add(id);
        }
    });
}
function showMissionToast(phase) {
    const t = document.createElement('div');
    t.className = 'mission-toast';
    t.innerHTML = `<span class="mt-emoji">${phase.emoji}</span><div class="mt-text"><b>🗝️ NAYA DARWAZA KHULA</b><span>${esc(phase.name)} — Mission mein dekhein</span></div>`;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add('show'), 50);
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3000);
    t.addEventListener('click', () => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); openMission(); });
}
function openMission() { ensureMissionData(); renderMissionView(); $('mission-view').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeMission() { $('mission-view').classList.remove('open'); document.body.style.overflow = ''; }
function renderMissionView() {
    const unlocked = unlockedPhases();
    const n = huroofKnownCount();
    const allDone = unlocked.length === missionData.phases.length;
    const nextPhase = missionData.phases.find(p => !unlocked.includes(p.id));
    $('mission-view').innerHTML = `
        <div class="namaz-top">
            <button class="icon-btn" data-mission="close" aria-label="Band karein">${ico('x')}</button>
            <div class="t"><b>Mission — Huroof ka Khazana</b><small>${unlocked.length} / ${missionData.phases.length} darwaze</small></div>
        </div>
        <div class="mission-content">
            <div class="mission-hero">
                <div class="mh-emblem">🗝️</div>
                <h2>${allDone ? 'MashaAllah — safar mukammal!' : 'Huroof ka Khazana'}</h2>
                <p>${allDone ? 'Tum ne 28 huroof seekh kar ek ek darwaza khola. Ab Quran tumhara ghar hai.' : 'Har 7 huroof seekho — ek darwaza khulega. 4 darwaze, phir Quran ka Ghar.'}</p>
                ${nextPhase ? `<div class="mh-progress"><b>${n}</b> / ${nextPhase.need} huroof — agla: <b>${esc(nextPhase.name)}</b></div>` : ''}
            </div>
            <div class="phases-list">${missionData.phases.map(p => {
                const isOpen = unlocked.includes(p.id);
                const isSeen = progress.missionSeen.includes(p.id);
                return `
                    <div class="phase-card ${isOpen ? 'open' : 'locked'} ${isSeen ? 'seen' : ''}">
                        <div class="phase-head">
                            <span class="phase-emoji">${isOpen ? p.emoji : '🔒'}</span>
                            <div class="phase-title"><b>${esc(p.name)}</b><small>${isOpen ? (isSeen ? '✓ Padh liya' : 'Ab khula hai') : `${p.need} huroof chahiye`}</small></div>
                            ${isOpen ? `<span class="phase-check">${isSeen ? '✓' : '!'}</span>` : ''}
                        </div>
                        ${isOpen && !isSeen ? `<p class="phase-story">${esc(p.story)}</p><button class="mini" data-mission="seen" data-id="${p.id}">✓ Padh liya</button>` : ''}
                    </div>`;
            }).join('')}</div>
            ${allDone ? `
                <div class="mission-final">
                    <h3>🏆 Sanad-e-Iftikhar</h3>
                    <p>Tum ne apna pehla safar mukammal kiya. Yeh tumhari sanad hai — apne walidain ko dikhao.</p>
                    <button class="btn btn-gold btn-lg btn-block" data-mission="cert">Sanad dekhein</button>
                </div>` : ''}
            <div class="mission-dua"><div class="ar">${esc(missionData.dua.ar)}</div><div class="ro">${esc(missionData.dua.ro)}</div></div>
        </div>`;
}
function markPhaseSeen(id) {
    ensureMissionData();
    if (!progress.missionSeen.includes(id)) {
        progress.missionSeen.push(id);
        saveProgress();
        if (id === 4) { addXP(100); toast('Mission mukammal! +100 XP'); } else { addXP(10); }
    }
    renderMissionView();
}
function openCertificate() {
    const name = (currentUser && currentUser.name) ? currentUser.name : 'Bachche';
    const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const sab = (progress.unlocked || 0);
    const surahs = (progress.memorized || []).length;
    $('cert-modal').innerHTML = `
        <div class="cert-wrap">
            <div class="cert-actions no-print">
                <button class="icon-btn light" data-mission="cert-close" aria-label="Band">${ico('x')}</button>
                <button class="btn btn-gold" data-mission="cert-print">🖨️ Print / Save</button>
            </div>
            <div class="certificate">
                <div class="cert-border">
                    <div class="cert-top">✦ SANAD-E-IFTIKHAR ✦</div>
                    <div class="cert-ar ar">شَهَادَةُ التَّقْدِير</div>
                    <h2>Certificate of Achievement</h2>
                    <p class="cert-to">Yeh sanad khusoosi taur par <b>${esc(name)}</b> ko di jati hai</p>
                    <p class="cert-body">Aapne <b>Huroof ka Khazana</b> mukammal kiya —<br>28 huroof, 4 darwaze, ek pehli manzil.</p>
                    <div class="cert-stats"><div><b>28</b><span>Huroof</span></div><div><b>${sab}</b><span>Sabaq</span></div><div><b>${surahs}</b><span>Surah</span></div></div>
                    <div class="cert-dua ar">${esc(missionData.dua.ar)}</div>
                    <div class="cert-dua-ro">"Aye Allah! Humain Quran uthane walon mein se kar de."</div>
                    <div class="cert-foot"><div class="cert-sig"><div class="sig-line"></div><span>Aghaaz-e-Asaas</span></div><div class="cert-date">${esc(dateStr)}</div></div>
                </div>
            </div>
            <p class="cert-hint no-print">💡 Screenshot lein ya Print dabayein</p>
        </div>`;
    $('cert-modal').hidden = false;
}
function closeCertificate() { const m = $('cert-modal'); if (m) m.hidden = true; }
function setupMissionEvents() {
    if (typeof progressHooks !== 'undefined') progressHooks.push(checkMission);
    const hero = $('mission-hero');
    if (hero) hero.addEventListener('click', openMission);
    const view = $('mission-view');
    if (view) view.addEventListener('click', (e) => {
        const b = e.target.closest('[data-mission]');
        if (!b) return;
        const act = b.dataset.mission;
        if (act === 'close') return closeMission();
        if (act === 'seen') return markPhaseSeen(parseInt(b.dataset.id, 10));
        if (act === 'cert') return openCertificate();
    });
    const modal = $('cert-modal');
    if (modal) modal.addEventListener('click', (e) => {
        const b = e.target.closest('[data-mission]');
        if (!b) return;
        if (b.dataset.mission === 'cert-close') closeCertificate();
        if (b.dataset.mission === 'cert-print') window.print();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        const m = $('cert-modal'); if (m && !m.hidden) return closeCertificate();
        const v = $('mission-view'); if (v && v.classList.contains('open')) closeMission();
    });
    setTimeout(() => checkMission(), 800);
}
window.addEventListener('DOMContentLoaded', setupMissionEvents);
