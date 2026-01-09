// Typing Speed Test Game Logic

const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes perfect.",
  "JavaScript makes web pages interactive.",
  "Typing fast requires accuracy and focus.",
  "Learning to code opens many opportunities."
];

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart");

let time = 60;
let timer;
let started = false;

// Load a random quote
function loadQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteEl.textContent = quotes[randomIndex];
}

// Start countdown timer
function startTimer() {
  timer = setInterval(() => {
    time--;
    timeEl.textContent = time;

    if (time === 0) {
      endGame();
    }
  }, 1000);
}

// Calculate WPM and accuracy
function calculateStats() {
  const typedText = inputEl.value;
  const quoteText = quoteEl.textContent;

  const wordsTyped = typedText.trim().split(/\s+/).length;
  const wpm = Math.round((wordsTyped / (60 - time)) * 60) || 0;

  let correctChars = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === quoteText[i]) {
      correctChars++;
    }
  }

  const accuracy = Math.round((correctChars / typedText.length) * 100) || 100;

  wpmEl.textContent = wpm;
  accuracyEl.textContent = accuracy;
}

// End the game
function endGame() {
  clearInterval(timer);
  inputEl.disabled = true;
  calculateStats();
}

// Restart game
function restartGame() {
  clearInterval(timer);
  time = 60;
  started = false;

  timeEl.textContent = time;
  wpmEl.textContent = 0;
  accuracyEl.textContent = 100;

  inputEl.value = "";
  inputEl.disabled = false;
  loadQuote();
}

// Event listeners
inputEl.addEventListener("input", () => {
  if (!started) {
    startTimer();
    started = true;
  }
  calculateStats();
});

restartBtn.addEventListener("click", restartGame);

// Initialize game
loadQuote();