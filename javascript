const grid = document.getElementById('grid');
const currentWordDisplay = document.getElementById('current-word');
const wordList = document.getElementById('word-list');
const scoreDisplay = document.getElementById('score');
const submitButton = document.getElementById('submit-word');

let board = [];
let selected = [];
let currentWord = '';
let score = 0;
let wordsFound = [];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Load dictionary
let dictionary = [];
fetch('words.json')
  .then(response => response.json())
  .then(data => dictionary = data);

function generateBoard() {
  board = [];
  grid.innerHTML = '';
  for (let i = 0; i < 25; i++) {
    const letter = alphabet[Math.floor(Math.random() * alphabet.length)];
    board.push(letter);
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = letter;
    cell.dataset.index = i;
    cell.addEventListener('click', () => selectLetter(i));
    grid.appendChild(cell);
  }
}

function selectLetter(index) {
  if (selected.includes(index)) return;
  if (selected.length > 0 && !isAdjacent(selected[selected.length - 1], index)) return;
  selected.push(index);
  currentWord += board[index];
  updateDisplay();
  grid.children[index].classList.add('selected');
}

function isAdjacent(lastIndex, newIndex) {
  const lastRow = Math.floor(lastIndex / 5);
  const lastCol = lastIndex % 5;
  const newRow = Math.floor(newIndex / 5);
  const newCol = newIndex % 5;
  return Math.abs(lastRow - newRow) <= 1 && Math.abs(lastCol - newCol) <= 1;
}

function updateDisplay() {
  currentWordDisplay.textContent = currentWord;
}

function clearSelection() {
  selected.forEach(i => grid.children[i].classList.remove('selected'));
  selected = [];
  currentWord = '';
  updateDisplay();
}

submitButton.addEventListener('click', () => {
  if (currentWord.length >= 3 && !wordsFound.includes(currentWord)) {
    if (dictionary.includes(currentWord.toLowerCase())) {
      wordsFound.push(currentWord);
      const li = document.createElement('li');
      li.textContent = currentWord;
      wordList.appendChild(li);
      score += currentWord.length;
      scoreDisplay.textContent = score;
    }
    clearSelection();
  } else {
    clearSelection();
  }
});

generateBoard();
