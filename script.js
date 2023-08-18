const startBtn = document.querySelector(".startBtn");
const replayBtn = document.querySelector(".replayBtn");
const choosePlayerDiv = document.querySelector(".choosePlayer");
const result = document.querySelector(".result");
const playerBtn = document.querySelectorAll(".playerBtn");
const boxes = document.querySelectorAll(".box");
let board;
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let huPlayer;
let aiPlayer;

playerBtn.forEach((button) => {
  button.addEventListener("click", choosePlayer);
});

function choosePlayer(e) {
  if (e.target.innerHTML === "X") {
    huPlayer = "X";
    aiPlayer = "O";
    result.innerHTML = "You are 'X'";
  } else if (e.target.innerHTML === "O") {
    huPlayer = "O";
    aiPlayer = "X";
    result.innerHTML = "You are 'O'";
  }
}

startBtn.addEventListener("click", startGame);

replayBtn.addEventListener("click", replay);

function replay() {
  startBtn.classList.add("startBtn");
  startBtn.classList.remove("nowGaming");
  startBtn.innerHTML = "Game Start";
  replayBtn.classList.add("hidden");
  choosePlayerDiv.classList.remove("hidden");
  result.innerHTML = "";
  result.classList.remove("winMessage");
  board.fill(null);
  boxes.forEach((box) => {
    box.removeEventListener("click", boxClick);
    box.style.backgroundColor = "";
    box.innerHTML = "";
  });
  huPlayer = "";
  aiPlayer = "";
}

function startGame() {
  board = Array(9).fill(null);
  if (huPlayer) {
    startBtn.innerHTML = "Now Gaming...";
    startBtn.classList.remove("startBtn");
    startBtn.classList.add("nowGaming");
    replayBtn.classList.remove("hidden");
    choosePlayerDiv.classList.add("hidden");
    boxes.forEach((box) => {
      box.innerHTML = "";
      box.addEventListener("click", boxClick);
    });
  } else {
    alert('Choose "X" or "O" and click "Game Start"');
  }
}

function boxClick(e) {
  if (!board[e.target.id]) {
    turn(e.target.id, huPlayer);
    let gameWon = hasGameWon(board, huPlayer);
    if (checkTie() !== false) {
      return;
    } else if (gameWon) {
      gameOver(gameWon);
      return;
    }
    if (!checkTie()) {
      console.log("2.aiturn");
      turn(aiSpot(), aiPlayer);
    }
  }
}

function turn(boxId, player) {
  if (player === huPlayer) {
    boxes[boxId].style.color = "darkred";
    document.getElementById(boxId).innerHTML = player;
    board[boxId] = player;
  } else if (player === aiPlayer) {
    boxes[boxId].style.color = "darkblue";
    document.getElementById(boxId).innerHTML = player;
    board[boxId] = player;
    let gameWon = hasGameWon(board, player);
    if (gameWon) {
      gameOver(gameWon);
    }
  }
}

function hasGameWon(board) {
  let gameWon = false;
  for (const combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameWon = { wonCombo: [a, b, c], player: board[a] };
    }
  }
  return gameWon;
}

function leerBoxes() {
  let leerBoxes = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      leerBoxes.push(i);
    }
  }
  return leerBoxes;
}

let leerCells;
function aiSpot() {
  leerCells = leerBoxes();
  let randomNum = Math.floor(Math.random() * leerCells.length);

  return leerCells[randomNum];
}

function checkTie() {
  if (leerBoxes().length === 0) {
    result.classList.add("winMessage");
    result.innerHTML = "Tie Game!";
    boxes.forEach((box) => {
      box.style.backgroundColor = "rgb(199, 199, 198)";
      box.removeEventListener("click", boxClick);
    });
    console.log("checktie = true");
    return;
  }
  console.log("checktie = false");
  return false;
}

function gameOver(gameWon) {
  console.log("gameOver");
  const { wonCombo, player } = gameWon;

  wonCombo.forEach((combo) => {
    document.getElementById(combo).style.backgroundColor =
      player === huPlayer ? "rgb(23, 163, 198)" : "rgb(3, 60, 74)";
  });
  result.classList.add("winMessage");
  result.innerHTML = player === huPlayer ? "You won!" : "You lost...";

  boxes.forEach((box) => box.removeEventListener("click", boxClick));
}
