const gameBoard = (function() {
  const board = ["X", "O"];
  const addToBoard = (marker) => {
    board += marker;
  }
  return {board, addToBoard};
})();

const newPlayer = (name, marker) => {
  return {name, marker};
}

const displayController = (function() {
  document.addEventListener("click", (e) => {
    if (!(e.target.closest(".quadrant"))) {
      return;
    } else {
      //function to add marker to gameBoard.board
      const value = (gameBoard.board.length - 1);
      e.target.textContent = gameBoard.board[`${value}`]
    }
  });  
  
})();