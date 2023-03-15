const letters = Array.from({ length: 16 }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 97));

const board = document.getElementById("board");
const wordsList = document.getElementById("words");
let words = [];

for (let i = 0; i < 16; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  square.textContent = letters[i];
  square.setAttribute("draggable", true);
  board.appendChild(square);
}

board.addEventListener("drop", (event) => {
  event.preventDefault();
  const letter = event.dataTransfer.getData("text/plain");
  const square = event.target;
  if (square.textContent === "") {
    square.textContent = letter;
    square.classList.remove("droppable");
    letters[letters.indexOf(letter)] = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    checkWords();
  }
});

board.addEventListener("dragover", (event) => {
  event.preventDefault();
});

board.addEventListener("dragstart", (event) => {
  const square = event.target;
  event.dataTransfer.setData("text/plain", square.textContent);
  square.classList.add("droppable");
});

function checkWords() {
  words = [];
  const squares = document.querySelectorAll(".square");
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].textContent === "") {
      squares[i].classList.add("droppable");
      continue;
    }
    if (i % 4 <= 1) {
      checkWord(i, i + 1, i + 2, i + 3); // check horizontal words
    }
    if (i < 8) {
      checkWord(i, i + 4, i + 8, i + 12); // check vertical words
    }
    if (i % 4 <= 1 && i < 8) {
      checkWord(i, i + 5, i + 10, i + 15); // check diagonal words
    }
    if (i % 4 >= 3 && i < 8) {
      checkWord(i, i + 3, i + 6, i + 9); // check diagonal words
    }
  }
  displayWords();
}

function checkWord(a, b, c, d) {
  const squares = document.querySelectorAll(".square");
  const word = squares[a].textContent + squares[b].textContent + squares[c].textContent + squares[d].textContent;
  if (/^[a-z]{4}$/.test(word)) {
    words.push(word);
    squares[a].classList.add("found");
    squares[b].classList.add("found");
    squares[c].classList.add("found");
    squares[d].classList.add("found");
  }
}

function displayWords() {
  wordsList.innerHTML = "";
  for (let i = 0; i < words.length; i++) {
    const word = document.createElement("div");
    word.classList.add("word");
    word.textContent = words[i];
    wordsList.appendChild(word);
  }
}
