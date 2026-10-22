// --- GAMES DATA ---
const vocabData = [
    { letter: "ا", word: "Asad", emoji: "🦁", eng: "Lion" },
    { letter: "ب", word: "Bata", emoji: "🦆", eng: "Duck" },
    { letter: "ت", word: "Tuffah", emoji: "🍎", eng: "Apple" },
    { letter: "ج", word: "Jamal", emoji: "🐪", eng: "Camel" },
    { letter: "د", word: "Dajaj", emoji: "🐔", eng: "Chicken" },
    { letter: "س", word: "Samak", emoji: "🐟", eng: "Fish" },
    { letter: "ف", word: "Fil", emoji: "🐘", eng: "Elephant" },
    { letter: "ق", word: "Qamar", emoji: "🌙", eng: "Moon" },
    { letter: "ك", word: "Kalb", emoji: "🐕", eng: "Dog" },
    { letter: "ن", word: "Nahl", emoji: "🐝", eng: "Bee" }
];

let currentGameScore = 0;
let gameInterval;
let basketPosition = 50;

// Helper function to show game screen
function showGameScreen(title) {
    document.getElementById('game-screen').style.display = 'flex';
    document.getElementById('game-area').style.display = 'block';
    document.getElementById('game-title').innerText = title;
    document.getElementById('games-menu').style.display = 'none';
    document.getElementById('game-target').style.display = 'block';
    currentGameScore = 0;
    updateScore();
    clearInterval(gameInterval);
}

// --- 1. BUBBLE POP GAME ---
function startBubblePop() {
    showGameScreen("Bubble Pop");
    document.getElementById('game-area').innerHTML = '<div id="bubble-container" style="width:100%; height:100%; position:relative;"></div>';
    
    const letters = qaidaData[0].items.map(i => i.ar);
    let target = letters[Math.floor(Math.random() * letters.length)];
    document.getElementById('game-target').innerText = `Dhoondein: ${target}`;
    speakText(`Dhoondein ${target}`);

    gameInterval = setInterval(() => {
        const container = document.getElementById('bubble-container');
        if (!container) return;
        
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const isTarget = Math.random() > 0.6; 
        bubble.innerText = isTarget ? target : letters[Math.floor(Math.random() * letters.length)];
        bubble.style.left = Math.random() * 80 + '%';
        bubble.style.animationDuration = (Math.random() * 2 + 3) + 's'; 
        
        bubble.onclick = function() {
            if (this.innerText === target) {
                currentGameScore += 10;
                updateScore();
                this.style.background = '#27AE60';
                this.innerText = '🎉';
                speakText('MashaAllah');
                setTimeout(() => this.remove(), 200);
                
                if (currentGameScore % 50 === 0) {
                    target = letters[Math.floor(Math.random() * letters.length)];
                    document.getElementById('game-target').innerText = `Dhoondein: ${target}`;
                    speakText(`Dhoondein ${target}`);
                }
            } else {
                this.style.background = '#E74C3C';
                setTimeout(() => this.remove(), 200);
            }
        };
        container.appendChild(bubble);
        setTimeout(() => { if(bubble.parentNode) bubble.remove(); }, 5000);
    }, 1000);
}

// --- 2. NEXT LETTER (SEQUENCE) GAME ---
function startSequenceGame() {
    showGameScreen("Agla Harf Kya Hai?");
    document.getElementById('game-target').innerText = "Sahi harf chunein";
    loadSequenceQuestion();
}

function loadSequenceQuestion() {
    const letters = qaidaData[0].items.map(i => i.ar);
    const startIndex = Math.floor(Math.random() * (letters.length - 3));
    
    const seq = [letters[startIndex], letters[startIndex+1]];
    const correct = letters[startIndex+2];
    
    let options = [correct];
    while(options.length < 4) {
        let rand = letters[Math.floor(Math.random() * letters.length)];
        if(!options.includes(rand)) options.push(rand);
    }
    options.sort(() => Math.random() - 0.5);

    let html = `<div class="sequence-display">${seq.join(' , ')} , <span style="color:red;">?</span></div>`;
    html += `<div class="options-grid">`;
    options.forEach(opt => {
        html += `<div class="option-btn" onclick="checkSequence('${opt}', '${correct}')">${opt}</div>`;
    });
    html += `</div>`;
    document.getElementById('game-area').innerHTML = html;
}

function checkSequence(selected, correct) {
    if(selected === correct) {
        currentGameScore += 20;
        updateScore();
        speakText('MashaAllah');
        setTimeout(loadSequenceQuestion, 1000);
    } else {
        speakText('Phir se koshish karein');
        alert("Galat! Phir se try karein.");
    }
}

// --- 3. VOCABULARY MATCH ---
function startVocabGame() {
    showGameScreen("Harf aur Tasveer");
    document.getElementById('game-target').innerText = "Sahi tasveer milayein";
    loadVocabQuestion();
}

function loadVocabQuestion() {
    const target = vocabData[Math.floor(Math.random() * vocabData.length)];
    
    let options = [target];
    while(options.length < 3) {
        let rand = vocabData[Math.floor(Math.random() * vocabData.length)];
        if(!options.find(o => o.letter === rand.letter)) options.push(rand);
    }
    options.sort(() => Math.random() - 0.5);

    let html = `<div class="vocab-letter">${target.letter}</div><div class="options-grid">`;
    options.forEach(opt => {
        html += `<div class="option-btn" style="font-size: 50px; padding: 20px;" onclick="checkVocab('${opt.letter}', '${target.letter}')">${opt.emoji}</div>`;
    });
    html += `</div>`;
    document.getElementById('game-area').innerHTML = html;
    
    speakText(`Yeh harf hai ${target.letter}`);
}

function checkVocab(selected, correct) {
    if(selected === correct) {
        currentGameScore += 15;
        updateScore();
        speakText('Shabash! Bilkul Sahi.');
        setTimeout(loadVocabQuestion, 1500);
    } else {
        speakText('Galat tasveer hai. Phir se dekhein.');
    }
}

// --- 4. CATCH THE FALLING LETTER (BASKET) ---
function startBasketGame() {
    showGameScreen("Harf Ki Tokri");
    const letters = qaidaData[0].items.map(i => i.ar);
    let target = letters[Math.floor(Math.random() * letters.length)];
    document.getElementById('game-target').innerText = `Pakdein: ${target}`;
    speakText(`Sirf ${target} pakdein`);
    
    document.getElementById('game-area').innerHTML = `
        <div id="basket-container">
            <div id="basket">🧺</div>
        </div>
        <div style="text-align:center; margin-top:20px; position:absolute; bottom:20px; width:100%; display:flex; justify-content:center; gap:20px; z-index:10;">
            <button class="btn-action" style="font-size:24px; padding:15px 30px;" onclick="moveBasket('left')">⬅</button>
            <button class="btn-action" style="font-size:24px; padding:15px 30px;" onclick="moveBasket('right')">➡</button>
        </div>
    `;
    basketPosition = 50;
    document.getElementById('basket').style.left = basketPosition + '%';
    document.getElementById('basket').style.display = 'block';

    gameInterval = setInterval(() => {
        const container = document.getElementById('basket-container');
        if (!container) return;
        
        const fallingLetter = document.createElement('div');
        fallingLetter.className = 'falling-letter';
        fallingLetter.innerText = letters[Math.floor(Math.random() * letters.length)];
        fallingLetter.style.left = Math.random() * 80 + '%';
        fallingLetter.style.animation = 'fallDown 3s linear forwards';
        
        fallingLetter.addEventListener('animationend', () => {
            const letterLeft = parseInt(fallingLetter.style.left);
            if (Math.abs(letterLeft - basketPosition) < 15) {
                if (fallingLetter.innerText === target) {
                    currentGameScore += 10;
                    updateScore();
                    speakText('Sahi pakda!');
                } else {
                    currentGameScore -= 5;
                    updateScore();
                    speakText('Galat harf');
                }
            }
            fallingLetter.remove();
        });
        container.appendChild(fallingLetter);
    }, 1200);
}

function moveBasket(dir) {
    if(dir === 'left' && basketPosition > 10) basketPosition -= 15;
    if(dir === 'right' && basketPosition < 80) basketPosition += 15;
    const basket = document.getElementById('basket');
    if(basket) basket.style.left = basketPosition + '%';
}

// --- UTILITIES ---
function updateScore() {
    const scoreEl = document.getElementById('game-score');
    if(scoreEl) scoreEl.innerText = `Score: ${currentGameScore}`;
}

function speakText(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ar-SA'; 
        if (/[a-zA-Z]/.test(text)) utterance.lang = 'ur-PK'; 
        utterance.rate = 0.8;
        window.speechSynthesis.speak(utterance);
    }
}

function exitGame() {
    clearInterval(gameInterval);
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('games-menu').style.display = 'grid';
}
