const gameBoard = (function() {
  const board = [];
  const addToBoard = (marker) => {
    board += marker;
  }
  return {board, addToBoard};
})();

const newPlayer = (name, marker) => {
  return {name, marker};
}

