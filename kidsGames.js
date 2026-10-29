'use strict';

const G = { score: 0, locked: false };

function openGameScreen(title) {
    document.getElementById('game-screen').classList.add('open');
    document.getElementById('game-title').textContent = title;
    G.score = 0;
    document.getElementById('game-score').textContent = '0 ⭐';
}

function closeGameScreen() {
    document.getElementById('game-screen').classList.remove('open');
    if('speechSynthesis' in window) window.speechSynthesis.cancel();
}

function updateGameScore(n) {
    G.score += n;
    document.getElementById('game-score').textContent = G.score + ' ⭐';
}

// GAME 1: HARF PEHCHANO
function startMatchGame() {
    openGameScreen('Harf Pehchano 🔤');
    G.locked = false;
    const area = document.getElementById('game-area');
    
    const allLetters = qaidaData[0].items;
    const target = allLetters[Math.floor(Math.random() * allLetters.length)];
    
    let options = [target];
    while(options.length < 3) {
        let r = allLetters[Math.floor(Math.random() * allLetters.length)];
        if(!options.find(o => o.ar === r.ar)) options.push(r);
    }
    options.sort(() => Math.random() - 0.5);

    // Emoji dhoondein
    const getEmoji = (ar) => {
        if (typeof vocabData !== 'undefined') {
            const v = vocabData.find(v => v.letter === ar);
            if (v) return v.emoji;
        }
        return '📦'; 
    };

    // dir="rtl" lagaya hai taake Alif right par aaye
    area.innerHTML = `
        <div class="match-target" dir="rtl">${target.ar}</div>
        <div class="match-options" dir="rtl">
            ${options.map(o => `
                <button class="match-opt" data-ar="${o.ar}">${getEmoji(o.ar)}</button>
            `).join('')}
        </div>
    `;

    if(typeof speakAr === 'function') speakAr(target.voice, 0.8);

    area.querySelectorAll('.match-opt').forEach(btn => {
        btn.onclick = () => {
            if(G.locked) return;
            G.locked = true;
            
            if(btn.dataset.ar === target.ar) {
                btn.classList.add('correct');
                updateGameScore(10);
                if(typeof speakAr === 'function') speakAr("أحسنت", 0.8);
                if(typeof addXP === 'function') addXP(2);
                setTimeout(() => startMatchGame(), 1500);
            } else {
                btn.classList.add('wrong');
                if(typeof speakAr === 'function') speakAr("حاول مرة أخرى", 0.8);
                setTimeout(() => { btn.classList.remove('wrong'); G.locked = false; }, 1000);
            }
        };
    });
}

// GAME 2: RANG BHARO
function startColorGame() {
    openGameScreen('Rang Bharo 🎨');
    const area = document.getElementById('game-area');
    
    const allLetters = qaidaData[0].items;
    const target = allLetters[Math.floor(Math.random() * allLetters.length)];
    
    const colors = [
        { hex: '#EF5350', name: 'Laal' }, { hex: '#42A5F5', name: 'Neela' },
        { hex: '#66BB6A', name: 'Hara' }, { hex: '#FFCA28', name: 'Peela' },
        { hex: '#AB47BC', name: 'Jamni' }, { hex: '#FF7043', name: 'Narangi' }
    ];

    area.innerHTML = `
        <div class="color-letter" id="color-target" dir="rtl" style="color: #ddd">${target.ar}</div>
        <div class="color-palette" dir="ltr">
            ${colors.map(c => `
                <button class="color-btn" style="background:${c.hex}" data-color="${c.hex}" data-name="${c.name}"></button>
            `).join('')}
        </div>
    `;

    if(typeof speakAr === 'function') speakAr(target.voice, 0.8);

    const targetEl = document.getElementById('color-target');
    area.querySelectorAll('.color-btn').forEach(btn => {
        btn.onclick = () => {
            targetEl.style.color = btn.dataset.color;
            if(typeof speakAr === 'function') speakAr(btn.dataset.name, 0.8);
            updateGameScore(5);
            if(typeof addXP === 'function') addXP(1);
        };
    });
}

window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-game]').forEach(card => {
        card.addEventListener('click', () => {
            const game = card.dataset.game;
            if(game === 'match') startMatchGame();
            if(game === 'color') startColorGame();
        });
    });
    
    const exitBtn = document.getElementById('game-exit');
    if(exitBtn) exitBtn.addEventListener('click', closeGameScreen);
});
