let cell = document.querySelectorAll(".cell")
let restartBtn = document.querySelector(".restartBtn")
let player1Cells = []
let player2Cells = []
let player1Span = document.querySelector(".player1")
let player2Span = document.querySelector(".player2")
let player1Score = 0
let player2Score = 0
let turn = true
let winCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]
const addCell = (player, id) => {
  if (player === 1) {
    player1Cells.push(id)
  } else {
    player2Cells.push(id)
  }
}

const toggleNameStyle = () => {
  if (turn) {
    player1Span.classList.remove("out-turn")
    player2Span.classList.add("out-turn")
  } else {
    player2Span.classList.remove("out-turn")
    player1Span.classList.add("out-turn")
  }
}
toggleNameStyle()

const restartFunction = () => {
  cell.forEach((cell) => {
    cell.innerHTML = ""
  })
  player1Cells = []
  player2Cells = []
  turn = true
  toggleNameStyle()
}

const restartAllFunction = () => {
  restartFunction()
  player1Score = 0
  player2Score = 0
  player1Span.innerHTML = `Player 1: ${player1Score}`
  player2Span.innerHTML = `Player 2: ${player2Score}`
}

const checkWin = () => {
  winCombination.find((item) => {
    if (item.filter((i) => player1Cells.includes(i)).length === 3) {
      alert("Player 1 is the winner")
      player1Score++
      player1Span.innerHTML = `Player 1: ${player1Score}`
      restartFunction()
    } else if (item.filter((i) => player2Cells.includes(i)).length === 3) {
      alert("Player 2 is the winner")
      player2Score++
      player2Span.innerHTML = `Player 2: ${player2Score}`
      restartFunction()
    } else if (
      (player2Cells.length >= 4 && player1Cells.length > 4) ||
      (player2Cells.length > 4 && player1Cells.length >= 4)
    ) {
      alert("is a draw")
      restartFunction()
    }
  })
}

for (let i = 0; i < cell.length; i++) {
  cell[i].addEventListener("click", (e) => {
    if (turn) {
      e.target.innerHTML = "X"
      e.target.style.color = "#226347"
      turn = !turn
      addCell(1, i)
      toggleNameStyle()
    } else {
      e.target.innerHTML = "O"
      e.target.style.color = "#2c0075"
      turn = !turn
      addCell(2, i)
      toggleNameStyle()
    }
    checkWin()
  })
}

restartBtn.addEventListener("click", restartAllFunction)
