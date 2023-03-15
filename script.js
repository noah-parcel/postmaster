const grid = document.getElementById('grid');
const wordsFound = document.getElementById('words-found');
const wordList = ['word', 'game', 'grid', 'play', 'tile', 'luck'];

function randomLetter() {
  return String.fromCharCode(65 + Math.floor(Math.random() * 26));
}

function generateGrid() {
  for (let i = 0; i < 16; i++) {
    const button = document.createElement('button');
    button.textContent = randomLetter();
    button.addEventListener('click', onButtonClick);
    grid.appendChild(button);
  }
}

function onButtonClick(event) {
  const button = event.target;
  const letter = button.textContent;
  button.textContent = randomLetter();

  wordList.forEach((word) => {
    if (word.includes(letter) && !wordsFound.textContent.includes(word)) {
      const regex = new RegExp(`[${letter}]`, 'g');
      if (word.match(regex).length === letter.length) {
        const wordElement = document.createElement('div');
        wordElement.textContent = word;
        wordsFound.appendChild(wordElement);
      }
    }
  });
}

generateGrid();
