const colors = ['green', 'red', 'yellow', 'blue'];
let gameSequence = [];
let playerSequence = [];
let level = 0;
let gameStarted = false;
let isStrictMode = false;
let counter = 0;

const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');
const messageDisplay = document.getElementById('message');
const counterDisplay = document.getElementById('counter');
const buttons = document.querySelectorAll('.btn');
let strictMode = document.querySelector("#strict-mode");
let strictModeArea = document.querySelector("#strictModeArea");

const red = document.querySelector('#red');
const yellow = document.querySelector('#yellow');
const blue = document.querySelector('#blue');
const green = document.querySelector('#green');

//add Background to colors
red.classList.add("red");
yellow.classList.add("yellow");
blue.classList.add("blue");
green.classList.add("green");

// Event listener for the start button
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

// Function to start 
function startGame() {
    gameSequence = [];
    playerSequence = [];
    level = 0;
    counter = 0;
    counterDisplay.textContent = '';
    gameStarted = true;
    strictMode.setAttribute('disabled', 'true');
    nextSequence();
    startButton.style.visibility = 'hidden';
    restartButton.style.visibility = 'visible';
}

//restart the game
function restartGame() {
    messageDisplay.textContent = 'Press Start to Play';
    gameSequence = [];
    playerSequence = [];
    level = 0;
    counter = 0;
    counterDisplay.textContent = '';
    gameStarted = false;
    strictMode.removeAttribute('disabled');
    strictModeArea.style.visibility = 'visible';
    startButton.style.visibility = 'visible';
    restartButton.style.visibility = 'hidden';
}

// Function to generate the next sequence
function nextSequence() {
    playerSequence = [];
    level++;
    messageDisplay.textContent = `Level ${level}`;

    addRendomColorToSequence()

    // Show the sequence to the player
    showSequence();
}

function addRendomColorToSequence() {
    const randomColor = colors[Math.floor(Math.random() * 4)];
    gameSequence.push(randomColor);
}

// Function to show the sequence to the player
function showSequence() {
    let i = 0;
    const interval = setInterval(() => {
        // playSound(gameSequence[i]);
        blink(gameSequence[i]);
        i++;
        if (i >= gameSequence.length) {
            clearInterval(interval);
            enableButtons();
        }
    }, 1000);
}

// Function to check if player sequence matches game sequence
function checkSequence() {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== gameSequence[i]) {
            // return false; // Player sequence does not match game sequence
            return false; // Player sequence matches game sequence
        }
    }
    return true;
}

function handleClick(button) {
    if (!gameStarted) return;

    if (playerSequence.length <= level) {
        // playSound(color);
        blink(button.id);
        playerSequence.push(button.id);
    } else {
        disableButtons();
    }
    if (playerSequence.length === level) {
        disableButtons();
        // Check if the player's sequence matches the game sequence
        if (!checkSequence()) {
            if (isStrictMode) {
                messageDisplay.textContent = 'Game Over! Restarting in strict mode...';
                restartButton.style.visibility = 'hidden';
                strictModeArea.style.visibility = 'hidden';
                setTimeout(restartGame, 2000);
            } else {
                counter++;
                counterDisplay.textContent = `Mistakes: ${counter}`;
                if (counter < 3) {
                    messageDisplay.textContent = 'Wrong! Try again...';
                    setTimeout(() => {
                        messageDisplay.textContent = `Level ${level}`;
                        playerSequence = [];
                        showSequence();
                    }, 1000);
                } else {
                    messageDisplay.textContent = 'Game Over!';
                    restartButton.style.visibility = 'hidden';
                    strictModeArea.style.visibility = 'hidden';
                    setTimeout(restartGame, 2000);
                }
            }
        } else {
            //If the player's sequence is correct
            if (playerSequence.length === gameSequence.length) {
                if (level === 15) {
                    messageDisplay.textContent = 'Congratulations! You won!';
                    gameStarted = false;
                } else {
                    setTimeout(nextSequence, 1000);
                }
            }
        }

    }

}

function toggleStrictMode() {
    if (!gameStarted) {
        if (strictMode.getAttribute("disabled")) {
            strictMode.attremoveAttribute('disabled');
        }
        isStrictMode = !isStrictMode;
    } else {
        strictMode.setAttribute('disabled', 'true');
    }
}

function enableButtons() {
    buttons.forEach(button =>
        button.removeAttribute('disabled'));
}

function disableButtons() {
    buttons.forEach(button =>
        button.setAttribute('disabled', 'true'));
}

// Function to play sound for a button press
// function playSound(color) {
//     const audio = new Audio(`${color}.mp3`); // Assume audio files named green.mp3, red.mp3, etc.
//     audio.play();
// }

function blink(color) {
    // playSound(color[0]);
    const pad = document.querySelector(`#${color}`);
    if (!pad) {
        console.error(`Element with id '${color}' not found.`);
        return; // Exit function if element is not found
    }
    console.log(color);
    pad.classList.remove(`${color}`);
    pad.classList.add(`blink-${color}`);
    setTimeout(() => {
        pad.classList.remove(`blink-${color}`);
        pad.classList.add(`${color}`);
    }, 500);
}