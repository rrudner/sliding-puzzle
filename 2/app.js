/* 1. No dobra, na początku przygotujemy sobie plik HTML, jeśli
 używacie Visual Studio Code, to wystarczy, że napiszecie 
 html:5 i wciśniecie TAB wygeneruje nam cały markup, ja nigdy nie 
 pamiętam jak się wpisuje charset, wiec taki skrót to dla mnie wybawienie.

 2. Potrzebny nam będzie oczywiście plik ze stylami. Dodajmy go i dołączmy do 
 htmla. Zeby sprwadzic czy wszystko działa, ustawię kolor tła dla całego dokumentu.
 Dobra, działa. 

 3. Ok, dodajmy jeszcze plik JS, w którym będzie znajdował się nasz kod gry. Nazwę go
 game.js. Dodam w nim console.log("Dziala!"), żeby sprawdzić czy kod działa. 

 4. Stworzyliśmy już wszystkie pliki, które będą nam potrzebne do stworzenia gry.

 5. Zanim rzucimy się na programowanie czegokolwiek, przemyślmy co tak na prawdę musimy 
 zaprogramować. Nasza łamigłówka składa się z dziewięciu pól. Na ośmiu z nich mamy 
 kafelki a jedno z nich jest puste. Pozwala to przesuwać i mieszać kafelki 
*/

const gameBoard = document.querySelector("#game-board");

// 1. Musimy podzielić sobie planszę na kawałki.

const EMPTY_GAME_PIECE = null;
const gameState = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", EMPTY_GAME_PIECE],
];

function render(gameState, gameBoard) {
  gameBoard.innerHTML = "";
  gameState.forEach((row, rowIndex) => {
    row.forEach((tile, columnIndex) => {
      if (tile) {
        const element = document.createElement("div");
        element.innerText = tile;
        element.classList.add("tile");
        element.style.top = `${rowIndex * 100}px`;
        element.style.left = `${columnIndex * 100}px`;
        gameBoard.appendChild(element);
      }
    });
  });
}

render(gameState, gameBoard);

// // 2. No dobra, i gra będzie polegać na tym, że będziemy przesuwwać elementy,
// // które mają nulla wokół siebie. Więc teraz zrobimy sobie obrazek

// gameState.forEach((row, rowIndex) => {
//   row.forEach((gamePiece, columnIndex) => {
//     if (gamePiece !== EMPTY_GAME_PIECE) {
//       gamePiece.style.backgroundPosition = `-${columnIndex * 100}px -${
//         rowIndex * 100
//       }px`;
//     }
//   });
// });

// 3. OK obrazek nam się bardzo ładnie przestawił. Czas zaprogramować grę!
// Delegacja eventów

gameBoard.addEventListener("click", (e) => {
  if (e.target.classList.contains("tile")) {
    // Zobazcie, brak kropki w classList!

    let x, y;
    let emptyPieceX, emptyPieceY;

    gameState.forEach((row, rowIndex) => {
      row.forEach((gamePiece, columnIndex) => {
        if (gamePiece === e.target.innerText) {
          x = rowIndex;
          y = columnIndex;
        }

        if (gamePiece === EMPTY_GAME_PIECE) {
          emptyPieceX = rowIndex;
          emptyPieceY = columnIndex;
        }
      });
    });

    if (x === emptyPieceX) {
      if (y + 1 === emptyPieceY || y - 1 === emptyPieceY) {
        gameState[emptyPieceX][emptyPieceY] = gameState[x][y];
        gameState[x][y] = EMPTY_GAME_PIECE;

        e.target.style.top = `${emptyPieceX * 100}px`;
        e.target.style.left = `${emptyPieceY * 100}px`;
        return;
      }
    }

    if (y === emptyPieceY) {
      if (x + 1 === emptyPieceX || x - 1 === emptyPieceX) {
        gameState[emptyPieceX][emptyPieceY] = gameState[x][y];
        gameState[x][y] = EMPTY_GAME_PIECE;

        e.target.style.top = `${emptyPieceX * 100}px`;
        e.target.style.left = `${emptyPieceY * 100}px`;

        return;
      }
    }
  }
});
