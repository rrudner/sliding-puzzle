const gameTiles = document.querySelectorAll('.tile');
const gameBoard = document.querySelector('#game-board');
const gameState = [gameTiles[0], gameTiles[1], gameTiles[2], gameTiles[3], gameTiles[4], gameTiles[5], gameTiles[6], gameTiles[7], gameTiles[8]]
render(gameBoard, gameState);

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
});

function render(gameBoard, gameState) {
  gameState.forEach((element, index) => {
    element.style.top = `${row(index) * 100}px`
    element.style.left = `${column(index) * 100}px`
    element.style['background-position-y'] = `-${row(index) * 100}px`;
    element.style['background-position-x'] = `-${column(index) * 100}px`;
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