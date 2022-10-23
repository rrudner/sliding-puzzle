const gameTiles = document.querySelectorAll('.tile');
const gameBoard = document.querySelector('#game-board');
const stepsDiv = document.querySelector('#steps')
const header = document.querySelector('#header')
const gameState = [gameTiles[0], gameTiles[1], gameTiles[2], gameTiles[3], gameTiles[4], gameTiles[5], gameTiles[6], gameTiles[7], gameTiles[8]]
const isGameOver = () => !gameState.some((element, index) => element.id != index)
let steps = 0
let highscore = 0
let shuffled = false

render(gameBoard, gameState);
getHighScore()

gameBoard.addEventListener('click', (event) => {
  const target = event.target;
  let x, y, emptyX, emptyY

  gameState.forEach((element, index) => {
    if (element === target) {
      x = row(index)
      y = column(index)
    }
  })

  gameState.forEach((element, index) => {
    if (element.id === '8') {
      emptyX = row(index)
      emptyY = column(index)
    }
  })

  if (
    (y === emptyY && (x + 1 === emptyX || x - 1 === emptyX)) ||
    (x === emptyX && (y + 1 === emptyY || y - 1 === emptyY))
  ) {
    moveElement(gameState[index(x, y)], gameState[index(emptyX, emptyY)]);

    const temp = gameState[index(x, y)];
    gameState[index(x, y)] = gameState[index(emptyX, emptyY)];
    gameState[index(emptyX, emptyY)] = temp;
  }

  endOfTheGame(isGameOver())
});

function render(gameBoard, gameState) {
  gameState.forEach((element, index) => {
    element.style.top = `${row(index) * 100}px`
    element.style.left = `${column(index) * 100}px`
    element.style['background-position-y'] = `-${row(element.id) * 100}px`;
    element.style['background-position-x'] = `-${column(element.id) * 100}px`;
    gameBoard.appendChild(element)
  });
}

function moveElement(element1, element2) {
  const tempTop = element1.style.top;
  const tempLeft = element1.style.left;
  element1.style.top = element2.style.top;
  element1.style.left = element2.style.left;
  element2.style.top = tempTop;
  element2.style.left = tempLeft;
  if (shuffled) {
    steps++
    stepsDiv.innerHTML = `Steps: ${steps}`
  }
}

function row(elementIndex) {
  return Math.floor(elementIndex / 3)
}

function column(elementIndex) {
  return elementIndex % 3
}

function index(x, y) {
  if (x === 0) return y
  if (x === 1) return y + 3
  if (x === 2) return y + 6
}

function endOfTheGame(done) {
  if (done && shuffled) {
    stepsDiv.innerHTML = `You won in ${steps} steps`
    gameBoard.style.pointerEvents = "none"
    if (highscore > steps || highscore == 0) {
      setHighscore(steps)
    }
  }
}

function shuffle() {
  const tempGameState = [gameTiles[0], gameTiles[1], gameTiles[2], gameTiles[3], gameTiles[4], gameTiles[5], gameTiles[6], gameTiles[7], gameTiles[8]]
  let shuffledArray = randomizedArray(9)

  for (let i = 0; i < gameState.length; i++) {
    gameState[i] = tempGameState[shuffledArray[i]]
  }

  render(gameBoard, gameState)
  steps = 0
  stepsDiv.innerHTML = `Steps: ${steps}`
  shuffled = true
  gameBoard.style.pointerEvents = "auto"
}

function getHighScore() {
  if (document.cookie) setHighscore(getCookieValue("highscore"))
  else setHighscore(0)
}

function setHighscore(score) {
  highscore = score
  header.innerHTML = `Highscore: ${highscore}`
  setCookieValue("highscore", highscore)
}

function clearHighscore() {
  if (confirm('Are you sure you want to clear highscore?')) setHighscore(0)
}

function isSolvable(puzzle) {
  let inv = 0
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = i + 1; j < puzzle.length; j++) {
      if (puzzle[i] > puzzle[j] && puzzle[i] != 8 && puzzle[j] != 8) inv++
    }
  }
  return 0 === inv % 2
}
