let words = [];
let usedWords = [];
let time = 10;
let score = 0;
let correctWord = "";
let timer;

function startGame() {
    document.getElementById("popup").classList.add("hidden");
    document.querySelector(".game-container").classList.remove("hidden");
    score = 0;
    document.getElementById("count").innerText = score;
    resetTimer();
    showNewWord();
}

function resetTimer() {
    clearInterval(timer);
    time = 10;
    document.getElementById("time").innerText = time;
    timer = setInterval(() => {
        time--;
        document.getElementById("time").innerText = time;
        if (time <= 0) {
            endGame("Time's up! You failed to choose the right one.");
        }
    }, 1000);
}

function showNewWord() {
    
    // Check if all words have been used
    if (usedWords.length === words.length) {
        usedWords=[];
        endGame("All words have been used. Game over!");
        return;
    }

    resetTimer();

    // Step 1: Select a random word that hasn't been used yet
    let selectedWord;
    do {
        const randomIndex = Math.floor(Math.random() * words.length);
        selectedWord = words[randomIndex];
    } while (usedWords.includes(selectedWord.word));

    correctWord = selectedWord.word;
    usedWords.push(correctWord);

    document.getElementById("word-image").src = selectedWord.image;

    // Step 2: Shuffle words excluding the selected word
    const otherWords = words.filter(word => word.word !== correctWord);
    const shuffledWords = [...otherWords].sort(() => Math.random() - 0.5);

    // Step 3: Insert the selected word at a random position in the first three slots
    const insertionIndex = Math.floor(Math.random() * 3);
    shuffledWords.splice(insertionIndex, 0, selectedWord);

    // Ensure we only have three options
    const options = shuffledWords.slice(0, 3);

    // Step 4: Assign words to buttons
    document.getElementById("card1").innerText = options[0].word;
    document.getElementById("card2").innerText = options[1].word;
    document.getElementById("card3").innerText = options[2].word;

    // Step 5: Set onclick events to check the answer
    document.getElementById("card1").onclick = () => checkAnswer(options[0].word);
    document.getElementById("card2").onclick = () => checkAnswer(options[1].word);
    document.getElementById("card3").onclick = () => checkAnswer(options[2].word);
}

function checkAnswer(selectedWord) {
    if (selectedWord === correctWord) {
        score++;
        document.getElementById("count").innerText = score;
        showNewWord();
    } else {
        endGame("Wrong choice! You failed to choose the right one.");
    }
}

function endGame(message) {
    clearInterval(timer);
    document.getElementById("popup-text").innerText = message;
    document.getElementById("popup").classList.remove("hidden");
    document.querySelector(".game-container").classList.add("hidden");
}

window.onload = () => {
    fetch('word.json')
        .then(response => response.json())
        .then(data => {
            words = data;
        });
};


// let words = [];
// let usedWords = [];
// let time = 10;
// let score = 0;
// let correctWord = "";
// let timer;
// let selectedLevel = 1;

// function startGame() {
//     selectedLevel = parseInt(document.getElementById("level").value, 10);
//     document.getElementById("popup").classList.add("hidden");
//     document.querySelector(".game-container").classList.remove("hidden");
//     score = 0;
//     document.getElementById("count").innerText = score;
//     resetTimer();
//     showNewWord();
// }

// function showNewWord() {
//     const filteredWords = words.filter(word => word.level === selectedLevel);
//     if (usedWords.length === filteredWords.length) {
//         usedWords = [];
//         endGame("All words have been used. Game over!");
//         return;
//     }
//     resetTimer();

//     let selectedWord;
//     do {
//         const randomIndex = Math.floor(Math.random() * filteredWords.length);
//         selectedWord = filteredWords[randomIndex];
//     } while (usedWords.includes(selectedWord.word));

//     correctWord = selectedWord.word;
//     usedWords.push(correctWord);

//     document.getElementById("word-image").src = selectedWord.image;

//     const otherWords = filteredWords.filter(word => word.word !== correctWord);
//     const shuffledWords = [...otherWords].sort(() => Math.random() - 0.5);

//     const insertionIndex = Math.floor(Math.random() * 3);
//     shuffledWords.splice(insertionIndex, 0, selectedWord);

//     const options = shuffledWords.slice(0, 3);

//     document.getElementById("card1").innerText = options[0].word;
//     document.getElementById("card2").innerText = options[1].word;
//     document.getElementById("card3").innerText = options[2].word;

//     document.getElementById("card1").onclick = () => checkAnswer(options[0].word);
//     document.getElementById("card2").onclick = () => checkAnswer(options[1].word);
//     document.getElementById("card3").onclick = () => checkAnswer(options[2].word);
// }

// window.onload = () => {
//     fetch('word.json')
//         .then(response => response.json())
//         .then(data => {
//             words = data;
//         });
// };