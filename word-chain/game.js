const WORD_LIST = [
  "apple", "elephant", "tiger", "rabbit", "banana", "ant", "turtle",
  "elephant", "hawk", "kangaroo", "orca", "ace", "eel", "lion",
  "night", "turtle", "eagle", "lion", "nose", "egg", "goat",
  "tiger", "rabbit", "bear", "rat", "tulip", "pine", "echo",
  "orbit", "tree", "eagle", "goose", "elephant", "tiger", "rabbit",
  "bear", "ant", "turtle", "lion", "snake", "eagle", "owl",
  "wolf", "fox", "deer", "elk", "koala", "alpaca", "antelope",
  "baboon", "beaver", "badger", "camel", "cobra", "crane", "donkey",
  "emu", "ferret", "frog", "gecko", "hippo", "ibis", "jackal",
  "kitten", "lemur", "mole", "newt", "otter", "panda", "quail",
  "rat", "snake", "turtle", "urchin", "viper", "walrus", "xerus",
  "yak", "zebra"
];

let currentChain = [];
let bestScore = localStorage.getItem('wordChainBest') || 0;
let lastLetter = '';
let usedWords = new Set();

document.getElementById('best-score').textContent = bestScore;
document.getElementById('word-input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') submitWord();
});
document.getElementById('submit-btn').addEventListener('click', submitWord);
document.getElementById('hint-btn').addEventListener('click', showHint);

function initGame() {
  const startWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
  currentChain = [startWord];
  lastLetter = startWord.slice(-1).toLowerCase();
  usedWords.add(startWord);
  updateDisplay();
}

function submitWord() {
  const input = document.getElementById('word-input');
  const word = input.value.trim().toLowerCase();
  const statusEl = document.getElementById('game-status');
  
  if (!word) return;
  
  if (word.length < 2) {
    statusEl.textContent = 'Word must be at least 2 letters!';
    statusEl.style.color = '#ef4444';
    return;
  }
  
  if (word[0] !== lastLetter) {
    statusEl.textContent = `Word must start with "${lastLetter.toUpperCase()}"!`;
    statusEl.style.color = '#ef4444';
    return;
  }
  
  if (usedWords.has(word)) {
    statusEl.textContent = 'Word already used!';
    statusEl.style.color = '#ef4444';
    return;
  }
  
  currentChain.push(word);
  usedWords.add(word);
  lastLetter = word.slice(-1).toLowerCase();
  input.value = '';
  statusEl.textContent = '';
  
  updateDisplay();
  
  if (currentChain.length > bestScore) {
    bestScore = currentChain.length;
    localStorage.setItem('wordChainBest', bestScore);
    document.getElementById('best-score').textContent = bestScore;
  }
  
  // Check if game over (no valid words left)
  if (!hasValidMove()) {
    statusEl.textContent = `Game Over! Chain length: ${currentChain.length}`;
    statusEl.style.color = '#fbbf24';
  }
}

function hasValidMove() {
  const nextWords = WORD_LIST.filter(w => w[0] === lastLetter && !usedWords.has(w));
  return nextWords.length > 0;
}

function updateDisplay() {
  document.getElementById('chain-length').textContent = currentChain.length;
  document.getElementById('target-letter').textContent = lastLetter.toUpperCase();
  
  const chainEl = document.getElementById('word-chain');
  chainEl.innerHTML = currentChain.map((w, i) => 
    `<span class="chain-word${i === currentChain.length - 1 ? ' current' : ''}">${w}</span>`
  ).join(' → ');
}

function showHint() {
  const validWords = WORD_LIST.filter(w => w[0] === lastLetter && !usedWords.has(w));
  if (validWords.length > 0) {
    const hint = validWords[Math.floor(Math.random() * validWords.length)];
    document.getElementById('hint-text').textContent = `Try: ${hint}`;
  } else {
    document.getElementById('hint-text').textContent = 'No valid words left!';
  }
}

initGame();
