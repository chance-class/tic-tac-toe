const gameBoard = (function() {
  const board = [];
  return {board};
})();

const player = (name, marker) => {
  const addToBoard = (marker) => {
    gameBoard.board.push(`${marker}`);
  }
  return {name, marker, addToBoard};
}

const displayController = (function() {
  document.addEventListener("click", (e) => {
    if (!(e.target.closest(".quadrant"))) {
      return;
    } else if (e.target.textContent != "") {
      return;
    } else {
      if (currentPlayer === playerOne) {
        currentPlayer = playerTwo;
      } else if (currentPlayer === playerTwo) {
        currentPlayer = playerOne;
      }
      currentPlayer.addToBoard(currentPlayer.marker);
      const value = (gameBoard.board.length - 1);
      e.target.textContent = gameBoard.board[`${value}`]
    }
  });  
  
})();

const playerOne = player("Jeff", "X");
const playerTwo = player("Manny", "O");
let currentPlayer = playerTwo;