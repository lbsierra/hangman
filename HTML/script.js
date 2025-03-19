"use strict";

const words = [
    {
        word: "BEAGLE",
        category: "Pets"
    },
    {
        word: "PANCAKES",
        category: "Breakfast"
    },
    {
        word: "MARIO",
        category: "Video Games"
    }
];

const gallowsStages = [
` ______
 |     |
       |      
       |
       |     
       |
       |
       |
       |
    _______`,
` ______
 |     |
 @     |      
       |
       |     
       |
       |
       |
       |
    _______`,
` ______
 |     |
 @     |      
 |     |     
 |     |
       |
       |
       |
       | 
    _______`,
` ______
 |     |
 @     |      
/|     |     
 |     |
       |
       |
       |
       | 
    _______`,
` ______
 |     |
 @     |      
/|\\    |     
 |     |
       |
       |
       |
       | 
    _______`,
` ______
 |     |
 @     |      
/|\\    |     
 |     |
/      |
       |
       |
       | 
    _______`,
` ______
 |     |
 @     |      
/|\\    |     
 |     |
/ \\    |
       |
       |
       | 
    _______`,
]


const startButton = document.getElementById("start");
const restartButton = document.getElementById("restart");
const gameMessage = document.getElementById("message");

let currentWord;
let currentCategory;
let guessedLetters = [];
let wrongGuesses = 0;
const maxGuesses = 6;
let wordDisplay = "";
let gameOver = false;

function startGame() {
    document.getElementById("gameContainer").classList.remove("hidden");
    document.getElementById("keyDiv").classList.remove("hidden");
    document.getElementById("gallows").textContent = gallowsStages[0];
    let currentObject = words[Math.floor(Math.random() * words.length)]; 
    currentWord = currentObject.word;
    currentCategory = currentObject.category;

    guessedLetters = [];
    wrongGuesses = 0;
    wordDisplay = "";
    gameOver = false;
    wordDisplay = '_ '.repeat(currentWord.length).trim();

    document.getElementById("game2").innerHTML = wordDisplay;
    document.getElementById("category").innerHTML = `Category: ${currentCategory}`;
    document.getElementById("gameOver").classList.add("hidden");
    document.getElementById("ag").textContent = "";

    const keys = document.querySelectorAll(".key");
    keys.forEach(key => {
        const newKey = key.cloneNode(true); 
        key.parentNode.replaceChild(newKey, key); 
        newKey.disabled = false;
        newKey.addEventListener("click", function () {
            const guessedLetter = this.textContent;
            checkGuess(guessedLetter, this);
        })
    })
}

function checkGuess(guessedLetter, button) {
    if (gameOver) return;

    guessedLetters.push(guessedLetter);
    document.getElementById("ag").textContent = `${guessedLetters.join(" ")}`;

    if (currentWord.includes(guessedLetter)) {
        let displayUpdate = "";
        for (let i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === guessedLetter) {
                displayUpdate += guessedLetter;
            } else {
                displayUpdate += wordDisplay[i * 2];
            }
    } 
        wordDisplay = displayUpdate.split("").join(" ");
        document.getElementById("game2").innerHTML = wordDisplay;


    if (!displayUpdate.includes("_")) {
        gameMessage.textContent = "You win!";
        gameOver = true;
        document.getElementById("category").classList.add("hidden");
        document.getElementById("keyDiv").classList.add("hidden");
        document.getElementById("gameOver").classList.remove("hidden");
    } 
} else {
        wrongGuesses++;
        document.getElementById("gallows").textContent = gallowsStages[wrongGuesses];
}

    if (wrongGuesses >= maxGuesses) {
        wordDisplay = currentWord.split("").join(" ");
        gameMessage.textContent = "Game over!";
        gameOver = true;
        document.getElementById("game2").innerHTML = wordDisplay;
        document.getElementById("category").classList.add("hidden");
        document.getElementById("keyDiv").classList.add("hidden");
        document.getElementById("gameOver").classList.remove("hidden");
    }

    button.disabled = true;
} 


startButton.addEventListener("click", function() {
    startGame();
    document.getElementById("game2").innerHTML = wordDisplay;
    document.getElementById("category").innerHTML = `Category: ${currentCategory}`;

}
)

restartButton.addEventListener("click", function() {
    startGame();
}
)
