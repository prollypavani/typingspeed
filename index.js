const quoteDisplay = document.getElementById("quoteDisplay");
const inputBox = document.getElementById("inputBox");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const errorDisplay = document.getElementById("errors");
const restartBtn = document.getElementById("restartBtn");

const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Code is like humor. When you have to explain it, it’s bad.",
  "First, solve the problem. Then, write the code.",
  "I convert caffeine into code and bugs into features.",
  "Typing fast won't fix your logic bugs."
];

let currentQuote = "";
let startTime;
let timerInterval;
let errorCount = 0;

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function startGame() {
  currentQuote = getRandomQuote();
  quoteDisplay.textContent = currentQuote;
  inputBox.value = "";
  inputBox.disabled = false;
  inputBox.focus();

  timerDisplay.textContent = "0";
  wpmDisplay.textContent = "0";
  errorDisplay.textContent = "0";

  errorCount = 0;
  startTime = null;
  clearInterval(timerInterval);
}

inputBox.addEventListener("input", () => {
  const typedText = inputBox.value;

  if (!startTime) {
    startTime = new Date();
    timerInterval = setInterval(() => {
      const elapsed = Math.floor((new Date() - startTime) / 1000);
      timerDisplay.textContent = elapsed;
    }, 1000);
  }

  errorCount = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] !== currentQuote[i]) {
      errorCount++;
    }
  }
  errorDisplay.textContent = errorCount;

  const words = typedText.trim().split(" ").length;
  const elapsedTime = (new Date() - startTime) / 60000;
  if (elapsedTime > 0) {
    const wpm = Math.round(words / elapsedTime);
    wpmDisplay.textContent = wpm;
  }

  if (typedText === currentQuote) {
  clearInterval(timerInterval);
  inputBox.disabled = true;

  const finalTime = timerDisplay.textContent;
  const finalWPM = wpmDisplay.textContent;
  const finalErrors = errorDisplay.textContent;

  document.getElementById("finalStats").textContent =
    `⏱ Time: ${finalTime}s | 💬 WPM: ${finalWPM} | ❌ Errors: ${finalErrors}`;

  document.getElementById("resultScreen").classList.remove("hidden");
}

document.getElementById("playAgainBtn").addEventListener("click", () => {
  document.getElementById("resultScreen").classList.add("hidden");
  startGame();
});

});

restartBtn.addEventListener("click", startGame);

startGame();
