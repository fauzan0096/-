'use strict';

const huroofCharacters = [
    { ar: "ا", ro: "Alif", emoji: "🦁", word: "Asad", wordAr: "أَسَد", wordRo: "Lion", tag: "Sardar", shape: "Sab se lamba, sab se pehla — akela khada, jaise pahad. Harf ka sardar." },
    { ar: "ب", ro: "Baa", emoji: "🦆", word: "Batta", wordAr: "بَطَّة", wordRo: "Duck", tag: "Kashti", shape: "Neeche ek boti — jaise kashti ke neeche chhoti lakri." },
    { ar: "ت", ro: "Taa", emoji: "🍎", word: "Tuffah", wordAr: "تُفَّاح", wordRo: "Apple", tag: "Do Aankhen", shape: "Upar do nokte — jaise do aankhen." },
    { ar: "ث", ro: "Saa", emoji: "🐂", word: "Thawr", wordAr: "ثَوْر", wordRo: "Bull", tag: "Teen Tinke", shape: "Upar teen nokte — jaise teen chhote tinke." },
    { ar: "ج", ro: "Jeem", emoji: "🐪", word: "Jamal", wordAr: "جَمَل", wordRo: "Camel", tag: "Pait Wala", shape: "Neeche gol pait — jaise bhookha bachcha." },
    { ar: "ح", ro: "Haa", emoji: "🐴", word: "Hisan", wordAr: "حِصَان", wordRo: "Horse", tag: "Bina Boti", shape: "Jeem jaisa, magar neeche koi nokta nahi." },
    { ar: "خ", ro: "Khaa", emoji: "🐑", word: "Kharoof", wordAr: "خَرُوف", wordRo: "Sheep", tag: "Nokta Upar", shape: "Haa ke upar ek nokta — jaise sar pe topi." },
    { ar: "د", ro: "Daal", emoji: "🐔", word: "Dajaj", wordAr: "دَجَاج", wordRo: "Chicken", tag: "Darwaza", shape: "Jhuka hua darwaza — bina nokte, simple." },
    { ar: "ذ", ro: "Zaal", emoji: "🐺", word: "Dhi'b", wordAr: "ذِئْب", wordRo: "Wolf", tag: "Nokta Upar", shape: "Daal ke upar ek nokta — jaise darwaze pe tala." },
    { ar: "ر", ro: "Raa", emoji: "👨", word: "Rajul", wordAr: "رَجُل", wordRo: "Man", tag: "Lehar", shape: "Jaise dariya ki lehar — tedhi aur khoobsurat." },
    { ar: "ز", ro: "Zaa", emoji: "🦒", word: "Zarafa", wordAr: "زَرَافَة", wordRo: "Giraffe", tag: "Nokta Upar", shape: "Raa ke upar ek nokta — jaise lehar pe chhota bulb." },
    { ar: "س", ro: "Seen", emoji: "🐟", word: "Samak", wordAr: "سَمَك", wordRo: "Fish", tag: "Seerhi", shape: "Jaise seedhiyan chadhne ki — teen dane." },
    { ar: "ش", ro: "Sheen", emoji: "☀️", word: "Shams", wordAr: "شَمْس", wordRo: "Sun", tag: "Teen Tinke", shape: "Seen ke upar teen nokte — jaise suraj ki kirnein." },
    { ar: "ص", ro: "Swaad", emoji: "🦅", word: "Saqr", wordAr: "صَقْر", wordRo: "Falcon", tag: "Bara Talaab", shape: "Gol aur bara — jaise chhota talaab." },
    { ar: "ض", ro: "Dwaad", emoji: "🐸", word: "Difda'", wordAr: "ضِفْدَع", wordRo: "Frog", tag: "Talaab + Nokta", shape: "Swaad jaisa + upar ek nokta." },
    { ar: "ط", ro: "Twah", emoji: "🐦", word: "Tayr", wordAr: "طَيْر", wordRo: "Bird", tag: "Khaari Lakri", shape: "Gol aur khaari — jaise khaari lakri." },
    { ar: "ظ", ro: "Zwah", emoji: "🦌", word: "Zabi", wordAr: "ظَبْي", wordRo: "Deer", tag: "Khaari + Nokta", shape: "Twah ke upar ek nokta — jaise lakri pe phal." },
    { ar: "ع", ro: "Ain", emoji: "🍯", word: "Asal", wordAr: "عَسَل", wordRo: "Honey", tag: "Aankh", shape: "Chhoti gol aankh — jaise aankh ki putli." },
    { ar: "غ", ro: "Ghain", emoji: "☁️", word: "Ghayma", wordAr: "غَيْمَة", wordRo: "Cloud", tag: "Aankh + Nokta", shape: "Ain ke upar ek nokta — jaise aankh pe aansu." },
    { ar: "ف", ro: "Faa", emoji: "🐘", word: "Feel", wordAr: "فِيل", wordRo: "Elephant", tag: "Ek Gol", shape: "Chhota gol sar ke upar — jaise phool ki kali." },
    { ar: "ق", ro: "Qaaf", emoji: "🌙", word: "Qamar", wordAr: "قَمَر", wordRo: "Moon", tag: "Do Nokte", shape: "Faa ke upar do nokte — jaise chaand aur do sitare." },
    { ar: "ك", ro: "Kaaf", emoji: "🐕", word: "Kalb", wordAr: "كَلْب", wordRo: "Dog", tag: "Kursi", shape: "Jaise chhoti kursi — khaari aur baithi." },
    { ar: "ل", ro: "Laam", emoji: "🍋", word: "Laymoon", wordAr: "لَيْمُون", wordRo: "Lemon", tag: "Lambi Lakri", shape: "Lambi aur jhuki — jaise keela ya lakri." },
    { ar: "م", ro: "Meem", emoji: "🍌", word: "Mawz", wordAr: "مَوْز", wordRo: "Banana", tag: "Gol Mooh", shape: "Gol mooh — jaise hansta hua chehra." },
    { ar: "ن", ro: "Noon", emoji: "🐝", word: "Nahl", wordAr: "نَحْل", wordRo: "Bee", tag: "Ek Daana", shape: "Meem jaisa, upar ek nokta — jaise daana." },
    { ar: "ه", ro: "Haa", emoji: "📱", word: "Hatif", wordAr: "هَاتِف", wordRo: "Phone", tag: "Andaa", shape: "Gol andaa — jaise murgi ka andaa." },
    { ar: "و", ro: "Wao", emoji: "🌹", word: "Warda", wordAr: "وَرْدَة", wordRo: "Rose", tag: "Kaan", shape: "Jaise kaan ka loop — gol aur khula." },
    { ar: "ي", ro: "Yaa", emoji: "✋", word: "Yad", wordAr: "يَد", wordRo: "Hand", tag: "Do Nokte", shape: "Neeche do nokte — jaise do paon." }
];

function ensureHuroofData() { if (!progress) return; if (!progress.huroofKnown) progress.huroofKnown = []; }
function openHuroof() { ensureHuroofData(); renderHuroofView(); $('huroof-view').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeHuroof() { $('huroof-view').classList.remove('open'); document.body.style.overflow = ''; }

function renderHuroofView() {
    const known = progress.huroofKnown || [];
    $('huroof-view').innerHTML = `
        <div class="namaz-top">
            <button class="icon-btn" data-harf="close" aria-label="Band karein">${ico('x')}</button>
            <div class="t"><b>Harf ki Duniya</b><small>${known.length} / 28 huroof yaad</small></div>
        </div>
        <div class="huroof-content">
            <div class="huroof-intro">🔤 Har harf ek dost hai — tap karo, suno, yaad karo. Saare 28 mukammal karne par <b>Harf ka Shahzada</b> badge milega.</div>
            <div class="huroof-grid">${huroofCharacters.map((h, i) => `
                <button class="huroof-card ${known.includes(h.ar) ? 'known' : ''}" data-harf="open" data-idx="${i}">
                    <span class="hc-emoji">${h.emoji}</span>
                    <span class="hc-ar ar">${esc(h.ar)}</span>
                    <span class="hc-ro">${esc(h.ro)}</span>
                    ${known.includes(h.ar) ? '<span class="hc-check">✓</span>' : ''}
                </button>`).join('')}
            </div>
        </div>
        <div class="huroof-modal" id="huroof-modal" hidden></div>`;
}

function openHarfDetail(idx) {
    const h = huroofCharacters[idx];
    const known = (progress.huroofKnown || []).includes(h.ar);
    $('huroof-modal').innerHTML = `
        <div class="hm-backdrop" data-harf="close-modal"></div>
        <div class="hm-card">
            <button class="hm-close" data-harf="close-modal" aria-label="Band karein">${ico('x')}</button>
            <div class="hm-emoji">${h.emoji}</div>
            <div class="hm-ar ar">${esc(h.ar)}</div>
            <div class="hm-ro">${esc(h.ro)}</div>
            <div class="hm-tag">${esc(h.tag)}</div>
            <p class="hm-shape">${esc(h.shape)}</p>
            <div class="hm-word">
                <span class="hm-word-emoji">${h.emoji}</span>
                <div><b>${esc(h.word)} <span class="hm-word-ar ar">${esc(h.wordAr)}</span></b><small>${esc(h.wordRo)}</small></div>
            </div>
            <div class="hm-actions">
                <button class="btn btn-gold" data-harf="speak" data-idx="${idx}">🔊 Suniye</button>
                <button class="btn ${known ? 'btn-ghost' : ''}" data-harf="mark" data-idx="${idx}">${known ? '✓ Yaad hai' : 'Yaad kar liya (+3 XP)'}</button>
            </div>
        </div>`;
    $('huroof-modal').hidden = false;
}
function closeHarfModal() { const m = $('huroof-modal'); if (m) m.hidden = true; }
function markHarfKnown(idx) {
    const h = huroofCharacters[idx];
    ensureHuroofData();
    if (progress.huroofKnown.includes(h.ar)) { progress.huroofKnown = progress.huroofKnown.filter(x => x !== h.ar); saveProgress(); toast('Hata diya'); }
    else { progress.huroofKnown.push(h.ar); addXP(3); saveProgress(); }
    renderHuroofView(); openHarfDetail(idx); updateHuroofProgress();
}
function updateHuroofProgress() { const el = $('huroof-progress'); if (el && progress) el.textContent = `${(progress.huroofKnown || []).length} / 28`; }

function setupHuroofEvents() {
    const v = $('huroof-view');
    if (v) v.addEventListener('click', (e) => {
        const b = e.target.closest('[data-harf]');
        if (!b) return;
        const act = b.dataset.harf;
        if (act === 'close') return closeHuroof();
        if (act === 'open') return openHarfDetail(parseInt(b.dataset.idx, 10));
        if (act === 'close-modal') return closeHarfModal();
        if (act === 'speak') { const h = huroofCharacters[parseInt(b.dataset.idx, 10)]; const nameVoice = (typeof letterVoice === 'function') ? letterVoice(h.ar) : h.ar; speakAr(nameVoice + '. ' + h.wordAr, 0.75); return; }
        if (act === 'mark') return markHarfKnown(parseInt(b.dataset.idx, 10));
    });
    const hero = $('huroof-hero');
    if (hero) hero.addEventListener('click', openHuroof);
}
window.addEventListener('DOMContentLoaded', () => { setupHuroofEvents(); setTimeout(() => updateHuroofProgress(), 600); });
