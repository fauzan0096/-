'use strict';

const REPORT_TIPS = {
    namazLow: 'Namaz ke 5 waqt tick karna aadat banao — roz app mein saath baith kar 2 minute do.',
    noSurah: 'Is hafte koi surah nahi suni — qari ke saath baith kar 1 surah suniye (5 min).',
    noStory: 'Waqiaat section mat bhoolo — har waqia 2 minute ka hai, sone se pehle suna sakte hain.',
    noAkhlaq: 'Akhlaq section se ek kahani padho, phir us amal ko saath karo (jaise salam karna).',
    lowXP: 'XP kam hai — koi ek game khel lo, ya 1 sabaq try karo.',
    goodWeek: 'MashaAllah, behtareen hafta raha! Isi tarah jari rakho.'
};

function ensureReportData() {
    if (!progress) return;
    if (!progress.history) progress.history = {};
    if (typeof progress.totalGames !== 'number') progress.totalGames = 0;
    if (!progress.reportSeenWeeks) progress.reportSeenWeeks = [];
}
function countFullNamazDays() {
    if (!progress.namaz) return 0;
    let c = 0;
    for (const d of Object.keys(progress.namaz)) {
        const t = progress.namaz[d] || {};
        if (['fajr','zuhr','asr','maghrib','isha'].every(k => t[k])) c++;
    }
    return c;
}
function snapshotToday() {
    if (!progress) return;
    ensureReportData();
    const today = dayStr(new Date());
    progress.history[today] = {
        xp: progress.xp || 0, unlocked: progress.unlocked || 0,
        heard: (progress.heard || []).length, memorized: (progress.memorized || []).length,
        stories: (progress.storiesRead || []).length, akhlaq: (progress.akhlaqDone || []).length,
        huroof: (progress.huroofKnown || []).length, badges: (progress.badges || []).length,
        games: progress.totalGames || 0, streak: progress.streak || 0,
        namazFullDays: countFullNamazDays()
    };
}
function snapFor(daysAgo) {
    ensureReportData();
    const target = new Date(); target.setDate(target.getDate() - daysAgo);
    const key = dayStr(target);
    if (progress.history[key]) return progress.history[key];
    const keys = Object.keys(progress.history).sort().reverse();
    for (const k of keys) if (k <= key) return progress.history[k];
    return { xp: 0, unlocked: 0, heard: 0, memorized: 0, stories: 0, akhlaq: 0, huroof: 0, badges: 0, games: 0, streak: 0, namazFullDays: 0 };
}
function buildReport() {
    ensureReportData();
    snapshotToday();
    saveProgress();
    const t = snapFor(0), s = snapFor(7), s14 = snapFor(14);
    const week = {
        xp: Math.max(0, t.xp - s.xp),
        sabaq: Math.max(0, t.unlocked - s.unlocked),
        heard: Math.max(0, t.heard - s.heard),
        memorized: Math.max(0, t.memorized - s.memorized),
        stories: Math.max(0, t.stories - s.stories),
        akhlaq: Math.max(0, t.akhlaq - s.akhlaq),
        huroof: Math.max(0, t.huroof - s.huroof),
        badges: Math.max(0, t.badges - s.badges),
        games: Math.max(0, t.games - s.games),
        namazFullDays: Math.max(0, t.namazFullDays - s.namazFullDays),
        streak: t.streak
    };
    const lastWeek = {
        xp: Math.max(0, s.xp - s14.xp), sabaq: Math.max(0, s.unlocked - s14.unlocked),
        heard: Math.max(0, s.heard - s14.heard), memorized: Math.max(0, s.memorized - s14.memorized),
        stories: Math.max(0, s.stories - s14.stories), akhlaq: Math.max(0, s.akhlaq - s14.akhlaq),
        huroof: Math.max(0, s.huroof - s14.huroof), badges: Math.max(0, s.badges - s14.badges),
        games: Math.max(0, s.games - s14.games), namazFullDays: Math.max(0, s.namazFullDays - s14.namazFullDays)
    };
    const total = { xp: t.xp, sabaq: t.unlocked, heard: t.heard, memorized: t.memorized, stories: t.stories, akhlaq: t.akhlaq, huroof: t.huroof, badges: t.badges, streak: t.streak };
    const end = new Date(), start = new Date(); start.setDate(start.getDate() - 6);
    const range = start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + ' – ' + end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    return { week, lastWeek, total, range };
}
function weekKeyNow() { const d = new Date(), year = d.getFullYear(); const jan1 = new Date(year, 0, 1); const week = Math.ceil(((d - jan1) / 86400000 + jan1.getDay() + 1) / 7); return year + '-W' + week; }
function showReportBanner() {
    ensureReportData();
    const banner = $('report-banner');
    if (!banner) return;
    const wk = weekKeyNow();
    if (progress.reportSeenWeeks.includes(wk)) { banner.hidden = true; return; }
    banner.hidden = false;
}
function dismissReportBanner() {
    ensureReportData();
    const wk = weekKeyNow();
    if (!progress.reportSeenWeeks.includes(wk)) progress.reportSeenWeeks.push(wk);
    saveProgress();
    const banner = $('report-banner');
    if (banner) banner.hidden = true;
}
function openReport() { ensureReportData(); const data = buildReport(); renderReportView(data); $('report-view').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeReport() { $('report-view').classList.remove('open'); document.body.style.overflow = ''; }

function renderReportView(d) {
    const name = currentUser && currentUser.name ? currentUser.name.split(' ')[0] : 'Bachche';
    const trend = (a, b) => { if (a === b) return '<span class="rt-same">—</span>'; if (a > b) return `<span class="rt-up">▲ +${a - b}</span>`; return `<span class="rt-down">▼ ${a - b}</span>`; };
    const tips = [];
    if (d.week.namazFullDays < 3) tips.push(REPORT_TIPS.namazLow);
    if (d.week.heard === 0) tips.push(REPORT_TIPS.noSurah);
    if (d.week.stories === 0) tips.push(REPORT_TIPS.noStory);
    if (d.week.akhlaq === 0) tips.push(REPORT_TIPS.noAkhlaq);
    if (d.week.xp < 50) tips.push(REPORT_TIPS.lowXP);
    if (tips.length === 0) tips.push(REPORT_TIPS.goodWeek);
    const rows = [
        { e: '⭐', label: 'XP kamaye', now: d.week.xp, prev: d.lastWeek.xp },
        { e: '📚', label: 'Naye sabaq', now: d.week.sabaq, prev: d.lastWeek.sabaq },
        { e: '🕋', label: 'Surah suni', now: d.week.heard, prev: d.lastWeek.heard },
        { e: '🎓', label: 'Surah yaad ki', now: d.week.memorized, prev: d.lastWeek.memorized },
        { e: '📖', label: 'Waqiaat padhe', now: d.week.stories, prev: d.lastWeek.stories },
        { e: '💚', label: 'Akhlaq kahaniyan', now: d.week.akhlaq, prev: d.lastWeek.akhlaq },
        { e: '🔤', label: 'Naye huroof', now: d.week.huroof, prev: d.lastWeek.huroof },
        { e: '🕌', label: 'Namaz ke din (paanchon)', now: d.week.namazFullDays, prev: d.lastWeek.namazFullDays },
        { e: '🎮', label: 'Games khele', now: d.week.games, prev: d.lastWeek.games },
        { e: '🏆', label: 'Naye badges', now: d.week.badges, prev: d.lastWeek.badges }
    ];
    $('report-view').innerHTML = `
        <div class="namaz-top">
            <button class="icon-btn" data-report="close" aria-label="Band">${ico('x')}</button>
            <div class="t"><b>Hafte ki Report</b><small>${esc(d.range)}</small></div>
        </div>
        <div class="report-content">
            <div class="report-hero-view">
                <div class="rhv-emoji">📊</div>
                <h2>${esc(name)} ki Report</h2>
                <div class="rhv-range">${esc(d.range)}</div>
                <div class="rhv-streak">🔥 ${d.total.streak} din streak</div>
            </div>
            <div class="report-summary">
                <div class="rs-cell"><b>${d.week.xp}</b><small>is hafte XP</small>${trend(d.week.xp, d.lastWeek.xp)}</div>
                <div class="rs-cell"><b>${d.week.sabaq + d.week.heard + d.week.memorized + d.week.stories + d.week.akhlaq + d.week.huroof}</b><small>kaam mukammal</small></div>
                <div class="rs-cell"><b>${d.total.xp}</b><small>total XP</small></div>
            </div>
            <div class="report-section-title">Is hafte vs pichhla hafta</div>
            <div class="report-table">${rows.map(r => `<div class="rt-row"><span class="rt-emoji">${r.e}</span><span class="rt-label">${esc(r.label)}</span><span class="rt-now">${r.now}</span>${trend(r.now, r.prev)}</div>`).join('')}</div>
            <div class="report-section-title">Total (ab tak)</div>
            <div class="report-totals">
                <div><b>${d.total.sabaq}</b><small>sabaq</small></div>
                <div><b>${d.total.huroof}</b><small>huroof</small></div>
                <div><b>${d.total.heard}</b><small>surah suni</small></div>
                <div><b>${d.total.memorized}</b><small>surah yaad</small></div>
                <div><b>${d.total.stories}</b><small>waqiaat</small></div>
                <div><b>${d.total.akhlaq}</b><small>akhlaq</small></div>
            </div>
            <div class="report-tips"><div class="rt-title">💡 Walidain ke liye tip</div>${tips.map(t => `<p>• ${esc(t)}</p>`).join('')}</div>
            <div class="report-actions">
                <button class="btn btn-gold btn-lg btn-block" data-report="share">📤 WhatsApp par share karein</button>
                <button class="btn btn-ghost btn-block" data-report="copy">📋 Text copy karein</button>
            </div>
        </div>`;
    $('report-view').dataset.text = buildShareText(d);
}

function buildShareText(d) {
    const name = currentUser && currentUser.name ? currentUser.name.split(' ')[0] : 'Bachche';
    return 'Assalamu alaikum!\n\n' +
        `📚 *${name} ki hafte ki report*\n` +
        `📅 ${d.range}\n\n` +
        `⭐ Is hafte: ${d.week.xp} XP\n` +
        `🔥 Streak: ${d.total.streak} din\n` +
        `📖 Naye sabaq: ${d.week.sabaq}\n` +
        `🕋 Surah: ${d.week.heard} suni, ${d.week.memorized} yaad ki\n` +
        `📿 Waqiaat: ${d.week.stories}\n` +
        `💚 Akhlaq: ${d.week.akhlaq}\n` +
        `🕌 Namaz ke din: ${d.week.namazFullDays}/7\n` +
        `🏆 Naye badges: ${d.week.badges}\n\n` +
        `_Total: ${d.total.sabaq} sabaq, ${d.total.huroof} huroof, ${d.total.heard} surah suni_\n\n` +
        'Alhamdulillah! — Aghaaz-e-Asaas';
}
async function shareReport() {
    const text = $('report-view').dataset.text || '';
    if (!text) return;
    if (navigator.share) { try { await navigator.share({ title: 'Hafte ki Report', text }); return; } catch (e) {} }
    window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
}
async function copyReport() {
    const text = $('report-view').dataset.text || '';
    if (!text) return;
    try { await navigator.clipboard.writeText(text); toast('Copy ho gaya'); }
    catch (e) {
        const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); toast('Copy ho gaya'); } catch (e2) { toast('Copy nahi hua'); }
        ta.remove();
    }
}
function updateReportHero() {
    const el = $('report-hero-summary');
    if (!el || !progress) return;
    try { const d = buildReport(); el.textContent = d.week.xp + ' XP is hafte'; } catch (e) {}
}
function setupReportEvents() {
    if (typeof progressHooks !== 'undefined') progressHooks.push(snapshotToday);
    const hero = $('report-hero'); if (hero) hero.addEventListener('click', openReport);
    const bannerBtn = $('report-banner-open'); if (bannerBtn) bannerBtn.addEventListener('click', () => { dismissReportBanner(); openReport(); });
    const bannerClose = $('report-banner-close'); if (bannerClose) bannerClose.addEventListener('click', dismissReportBanner);
    const v = $('report-view');
    if (v) v.addEventListener('click', (e) => {
        const b = e.target.closest('[data-report]');
        if (!b) return;
        if (b.dataset.report === 'close') closeReport();
        if (b.dataset.report === 'share') shareReport();
        if (b.dataset.report === 'copy') copyReport();
    });
    setTimeout(() => { snapshotToday(); saveProgress(); showReportBanner(); updateReportHero(); }, 1400);
}
window.addEventListener('DOMContentLoaded', setupReportEvents);
