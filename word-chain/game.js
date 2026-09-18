const WORD_LIST = ["apple","elephant","tiger","rabbit","banana","ant","turtle","hawk","kangaroo","orca","ace","eel","lion","night","eagle","goose","nose","egg","bear","rat","tulip","pine","echo","orbit","wolf","fox","deer","elk","koala","alpaca","baboon","beaver","camel","cobra","donkey","emu","frog","gecko","hippo","ibis","jackal","kitten","lemur","mole","newt","otter","panda","quail","snake","urchin","viper","walrus","xerus","yak","zebra"];
let currentChain = [], bestScore = localStorage.getItem('wcBest') || 0, lastLetter = '', usedWords = new Set();
document.getElementById('best-score').textContent = bestScore;
document.getElementById('word-input').addEventListener('keypress', e => { if(e.key==='Enter') submitWord(); });
document.getElementById('submit-btn').addEventListener('click', submitWord);
document.getElementById('hint-btn').addEventListener('click', showHint);
function initGame() {
  const startWord = WORD_LIST[Math.floor(Math.random()*WORD_LIST.length)];
  currentChain = [startWord]; lastLetter = startWord.slice(-1).toLowerCase(); usedWords.add(startWord);
  updateDisplay();
}
function submitWord() {
  const input = document.getElementById('word-input'), word = input.value.trim().toLowerCase(), statusEl = document.getElementById('game-status');
  if(!word) return;
  if(word.length<2){statusEl.textContent='Min 2 letters!';statusEl.style.color='#ef4444';return;}
  if(word[0]!==lastLetter){statusEl.textContent='Start with "'+lastLetter.toUpperCase()+'"!';statusEl.style.color='#ef4444';return;}
  if(usedWords.has(word)){statusEl.textContent='Already used!';statusEl.style.color='#ef4444';return;}
  currentChain.push(word); usedWords.add(word); lastLetter = word.slice(-1).toLowerCase(); input.value=''; statusEl.textContent='';
  updateDisplay();
  if(currentChain.length>bestScore){bestScore=currentChain.length;localStorage.setItem('wcBest',bestScore);document.getElementById('best-score').textContent=bestScore;}
  if(!hasValidMove()) statusEl.textContent='Game Over! Chain: '+currentChain.length;
}
function hasValidMove() { return WORD_LIST.filter(w=>w[0]===lastLetter&&!usedWords.has(w)).length>0; }
function updateDisplay() {
  document.getElementById('chain-length').textContent=currentChain.length;
  document.getElementById('target-letter').textContent=lastLetter.toUpperCase();
  document.getElementById('word-chain').innerHTML=currentChain.map((w,i)=>`<span class="${i===currentChain.length-1?'current':''}">${w}</span>`).join(' → ');
}
function showHint() {
  const valid=WORD_LIST.filter(w=>w[0]===lastLetter&&!usedWords.has(w));
  document.getElementById('hint-text').textContent=valid.length?`Try: ${valid[Math.floor(Math.random()*valid.length)]}`:'No hints!';
}
initGame();