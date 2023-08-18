const startBtn = document.querySelector(".startBtn");
const replayBtn = document.querySelector(".replayBtn");
const choosePlayerDiv = document.querySelector(".choosePlayer");
const result = document.querySelector(".result");
const playerBtn = document.querySelectorAll(".playerBtn");
const boxes = document.querySelectorAll(".box");
const board = Array(9).fill(null);
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
  if (huPlayer) {
    startBtn.innerHTML = "Now Gaming...";
    startBtn.classList.remove("startBtn");
    startBtn.classList.add("nowGaming");
    replayBtn.classList.remove("hidden");
    choosePlayerDiv.classList.add("hidden");
  }

  boxes.forEach((box) => {
    box.innerHTML = "";
    box.addEventListener("click", boxClick);
  });
}

function boxClick(e) {
  turn(e.target.id, huPlayer);
  let gameWon = hasGameWon(board, huPlayer);
  if (gameWon) {
    gameOver(gameWon);
    return;
  }

  turn(aiSpot(), aiPlayer);
}

function turn(boxId, player) {
  if (board[boxId] === null) {
    if (player === huPlayer) {
      boxes[boxId].style.color = "red";
      document.getElementById(boxId).innerHTML = player;
      board[boxId] = player;
      let gameWon = hasGameWon(board, player);
      if (gameWon) {
        gameOver(gameWon);
      }
    } else if (player === aiPlayer) {
      boxes[boxId].style.color = "blue";
      document.getElementById(boxId).innerHTML = player;
      board[boxId] = player;
      let gameWon = hasGameWon(board, player);
      if (gameWon) {
        gameOver(gameWon);
      }
    }
  }
}

function hasGameWon(board, player) {
  let gameWon = false;
  for (const combo of winCombos) {
    const [a, b, c] = combo;
    console.log(board[a], board[b], board[c]);
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameWon = { wonCombo: [a, b, c], player: player };
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

let leercells;
function aiSpot() {
  leercells = leerBoxes();
  return leercells[0];
}

//tiegame
function checkTie() {
  if (leerBoxes().length === 0) {
    result.innerHTML = "Tie Game!";
    boxes.forEach((box) => box.removeEventListener("click", boxClick));
    return;
  }
}

function gameOver(gameWon) {
  console.log("gameOver");
  const { wonCombo, player } = gameWon;

  wonCombo.forEach((combo) => {
    document.getElementById(combo).style.backgroundColor =
      player === huPlayer ? "white" : "rgb(4, 64, 79);";
  });
  result.classList.add("winMessage");
  result.innerHTML = player === huPlayer ? "You won!" : "You lost...";

  boxes.forEach((box) => box.removeEventListener("click", boxClick));
}
