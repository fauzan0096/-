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

// --- 1. BUBBLE POP GAME ---
function startBubblePop() {
    document.getElementById('game-area').style.display = 'block';
    document.getElementById('game-title').innerText = "Bubble Pop";
    document.getElementById('game-area').innerHTML = '<div id="bubble-container"></div>';
    currentGameScore = 0;
    updateScore();
    
    const letters = qaidaData[0].items.map(i => i.ar);
    let target = letters[Math.floor(Math.random() * letters.length)];
    document.getElementById('game-target').innerText = `Dhoondein: ${target}`;
    speakText(`Dhoondein ${target}`);

    gameInterval = setInterval(() => {
        const container = document.getElementById('bubble-container');
        if (!container) return;
        
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const isTarget = Math.random() > 0.7; // 30% chance to be target
        bubble.innerText = isTarget ? target : letters[Math.floor(Math.random() * letters.length)];
        bubble.style.left = Math.random() * 80 + '%';
        bubble.style.animationDuration = (Math.random() * 2 + 3) + 's'; // 3 to 5 seconds
        
        bubble.onclick = function() {
            if (this.innerText === target) {
                currentGameScore += 10;
                updateScore();
                this.style.background = '#27AE60';
                this.innerText = '🎉';
                speakText('MashaAllah');
                setTimeout(() => this.remove(), 200);
                
                // Change target occasionally
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
        
        // Remove bubble after animation
        setTimeout(() => { if(bubble.parentNode) bubble.remove(); }, 5000);
    }, 800);
}

// --- 2. NEXT LETTER (SEQUENCE) GAME ---
function startSequenceGame() {
    document.getElementById('game-area').style.display = 'block';
    document.getElementById('game-title').innerText = "Agla Harf Kya Hai?";
    currentGameScore = 0;
    updateScore();
    loadSequenceQuestion();
}

function loadSequenceQuestion() {
    const letters = qaidaData[0].items.map(i => i.ar);
    const startIndex = Math.floor(Math.random() * (letters.length - 3));
    
    const seq = [letters[startIndex], letters[startIndex+1]];
    const correct = letters[startIndex+2];
    
    document.getElementById('game-target').innerText = "Sahi harf chunein";
    
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

// --- 3. VOCABULARY MATCH (AI Style) ---
function startVocabGame() {
    document.getElementById('game-area').style.display = 'block';
    document.getElementById('game-title').innerText = "Harf aur Tasveer";
    currentGameScore = 0;
    updateScore();
    loadVocabQuestion();
}

function loadVocabQuestion() {
    const target = vocabData[Math.floor(Math.random() * vocabData.length)];
    document.getElementById('game-target').innerText = `Harf: ${target.letter}`;
    speakText(`Yeh harf hai ${target.letter}. ${target.word} ki tarah.`);
    
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
    document.getElementById('game-area').style.display = 'block';
    document.getElementById('game-title').innerText = "Harf Ki Tokri";
    currentGameScore = 0;
    updateScore();
    
    const letters = qaidaData[0].items.map(i => i.ar);
    let target = letters[Math.floor(Math.random() * letters.length)];
    document.getElementById('game-target').innerText = `Pakdein: ${target}`;
    speakText(`Sirf ${target} pakdein`);
    
    document.getElementById('game-area').innerHTML = `
        <div id="basket-container">
            <div id="basket">🧺</div>
        </div>
        <div style="text-align:center; margin-top:20px;">
            <button class="btn-action" onclick="moveBasket('left')">⬅</button>
            <button class="btn-action" onclick="moveBasket('right')">➡</button>
        </div>
    `;
    basketPosition = 50;
    document.getElementById('basket').style.left = basketPosition + '%';

    gameInterval = setInterval(() => {
        const container = document.getElementById('basket-container');
        if (!container) return;
        
        const fallingLetter = document.createElement('div');
        fallingLetter.className = 'falling-letter';
        fallingLetter.innerText = letters[Math.floor(Math.random() * letters.length)];
        fallingLetter.style.left = Math.random() * 80 + '%';
        
        // Animation
        fallingLetter.style.animation = 'fallDown 3s linear forwards';
        
        fallingLetter.addEventListener('animationend', () => {
            // Check if it hit the basket (approximate)
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
    }, 1000);
}

function moveBasket(dir) {
    if(dir === 'left' && basketPosition > 10) basketPosition -= 15;
    if(dir === 'right' && basketPosition < 80) basketPosition += 15;
    document.getElementById('basket').style.left = basketPosition + '%';
}

// --- UTILITIES ---
function updateScore() {
    document.getElementById('game-score').innerText = `Score: ${currentGameScore}`;
}

function speakText(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ar-SA'; // Try Arabic, but fallback to Urdu
        if (/[a-zA-Z]/.test(text)) utterance.lang = 'ur-PK'; // If text has English, use Urdu voice
        utterance.rate = 0.8;
        window.speechSynthesis.speak(utterance);
    }
}

function exitGame() {
    clearInterval(gameInterval);
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('games-menu').style.display = 'grid';
    document.getElementById('game-header').style.display = 'none';
}
