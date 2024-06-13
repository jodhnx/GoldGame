// script.js
let collectedCoins = 0;
let rewards = 0;
let currentLevel = 1;

// Lade Fortschritt vom localStorage
function loadProgress() {
    collectedCoins = parseInt(localStorage.getItem('collectedCoins')) || 0;
    rewards = parseInt(localStorage.getItem('rewards')) || 0;
    currentLevel = parseInt(localStorage.getItem('currentLevel')) || 1;
    document.getElementById('score').innerText = `Gesammelte Münzen: ${collectedCoins}`;
    document.getElementById('rewards').innerText = `Belohnungen: ${rewards}`;
}

// Speichere Fortschritt im localStorage
function saveProgress() {
    localStorage.setItem('collectedCoins', collectedCoins);
    localStorage.setItem('rewards', rewards);
    localStorage.setItem('currentLevel', currentLevel);
}

function collectCoin() {
    collectedCoins++;
    document.getElementById('score').innerText = `Gesammelte Münzen: ${collectedCoins}`;
    saveProgress();
}

function nextLevel() {
    if (collectedCoins >= currentLevel * 3) { // Bedingung, um das Level abzuschließen
        collectedCoins = 0;
        currentLevel++;
        rewards += 10; // Belohnungspunkte für das Abschließen des Levels
        document.getElementById('score').innerText = `Gesammelte Münzen: ${collectedCoins}`;
        document.getElementById('rewards').innerText = `Belohnungen: ${rewards}`;
        document.getElementById('game-area').innerHTML = '';

        for (let i = 0; i < currentLevel + 2; i++) {
            const coin = document.createElement('div');
            coin.className = 'coin';
            coin.setAttribute('data-level', currentLevel);
            coin.onclick = collectCoin;
            document.getElementById('game-area').appendChild(coin);
        }
        updateTutorial();
        saveProgress();
    } else {
        alert('Sammle mehr Münzen, um zum nächsten Level zu gelangen!');
    }
}

function runCode() {
    const code = document.getElementById('code-editor').value;
    try {
        eval(code);
    } catch (error) {
        alert('Fehler im Code: ' + error.message);
    }
}

function updateTutorial() {
    const tutorialText = document.getElementById('tutorial-text');
    switch (currentLevel) {
        case 1:
            tutorialText.innerText = 'Level 1: Klicke auf die Münzen, um sie zu sammeln.';
            break;
        case 2:
            tutorialText.innerText = 'Level 2: Verwende den Code-Editor, um den Code zu schreiben, der dir beim Sammeln der Münzen hilft.';
            break;
        case 3:
            tutorialText.innerText = 'Level 3: Nutze Schleifen, um den Code effizienter zu gestalten.';
            break;
        default:
            tutorialText.innerText = 'Herzlichen Glückwunsch! Du hast alle grundlegenden Aufgaben abgeschlossen.';
    }
}

// Initialisiere das Spiel
loadProgress();

// Erzeuge Münzen für das aktuelle Level
function initializeLevel() {
    document.getElementById('game-area').innerHTML = '';
    for (let i = 0; i < currentLevel + 2; i++) {
        const coin = document.createElement('div');
        coin.className = 'coin';
        coin.setAttribute('data-level', currentLevel);
        coin.onclick = collectCoin;
        document.getElementById('game-area').appendChild(coin);
    }
    updateTutorial();
}

initializeLevel();
