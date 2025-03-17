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
`_______
|      |
       |      
       |
       |     
       |
       |
       |
       |
       |
    _______`,
`_______
|      |
@      |      
       |
       |     
       |
       |
       |
       |
       |
    _______`,
`_______
|      |
@      |      
|      |     
|      |
       |
       |
       |
       | 
    _______`,
`_______
|      |
 @     |      
/|     |     
 |     |
       |
       |
       |
       | 
    _______`,
`_______
|      |
@      |      
/|\\    |     
 |     |
       |
       |
       |
       | 
    _______`,
`_______
|      |
@      |      
/|\\    |     
 |     |
/      |
       |
       |
       | 
    _______`,
`_______
|      |
@      |      
/|\\    |     
 |     |
/ \\    |
       |
       |
       | 
    _______`,
]


const startButton = document.getElementById("start");

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

    const keys = document.querySelectorAll(".key");
    keys.forEach(key => {
        key.disabled = false;
        key.addEventListener("click", function () {
            const guessedLetter = this.textContent;
            checkGuess(guessedLetter, this);
        })
    })
}

function checkGuess(guessedLetter, button) {
    if (gameOver) return;

    guessedLetters.push(guessedLetter);
    document.getElementById("alr").textContent = `Already Guessed: ${guessedLetters.join(", ")}`;

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
        alert("You win!");
        gameOver = true;
    } 
} else {
        wrongGuesses++;
        document.getElementById("gallows").textContent = gallowsStages[wrongGuesses];
}

    if (wrongGuesses >= maxGuesses) {
        alert("Game over. Try again!");
        gameOver = true;
    }

    button.disabled = true;
} 


startButton.addEventListener("click", function() {
    startGame();
    document.getElementById("game2").innerHTML = wordDisplay;
    document.getElementById("category").innerHTML = `Category: ${currentCategory}`;

}

)
