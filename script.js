const gameBoard = (function() {
  const board = [];
  const getBoard = () => board;
  return {getBoard};
})();

const player = (name, marker) => {
  const addToBoard = (marker) => {
    gameBoard.getBoard().push(`${marker}`);
  }
  return {name, marker, addToBoard};
}

const playerOne = player("Player One", "X");
const playerTwo = player("Player Two", "O");

const displayController = (function() {
  const quad1 = document.getElementById("quad-1");
  const quad2 = document.getElementById("quad-2");
  const quad3 = document.getElementById("quad-3");
  const quad4 = document.getElementById("quad-4");
  const quad5 = document.getElementById("quad-5");
  const quad6 = document.getElementById("quad-6");
  const quad7 = document.getElementById("quad-7");
  const quad8 = document.getElementById("quad-8");
  const quad9 = document.getElementById("quad-9");
  let gameOver = false;
  const checkForWinner = () => {
    switch (currentPlayer.marker) {
        case (quad1.textContent && quad4.textContent && quad7.textContent):
          alert(`${currentPlayer.name} has won!`);
          gameOver = true;
          break;
        case (quad1.textContent && quad2.textContent && quad3.textContent):
          alert(`${currentPlayer.name} has won!`);
          gameOver = true;
          break;
        case (quad1.textContent && quad5.textContent && quad9.textContent):
          alert(`${currentPlayer.name} has won!`);
          gameOver = true;
          break;
        case (quad2.textContent && quad5.textContent && quad8.textContent):
          alert(`${currentPlayer.name} has won!`);
          gameOver = true;
          break;
        case (quad3.textContent && quad6.textContent && quad9.textContent):
          alert(`${currentPlayer.name} has won!`);
          gameOver = true;
          break;
        case (quad4.textContent && quad5.textContent && quad6.textContent):
          alert(`${currentPlayer.name} has won!`);
          gameOver = true;
          break;
        case (quad7.textContent && quad8.textContent && quad9.textContent):
          alert(`${currentPlayer.name} has won!`);
          gameOver = true;
          break;
        case (quad3.textContent && quad5.textContent && quad7.textContent):
          alert(`${currentPlayer.name} has won!`);
          gameOver = true;
          break;
        default:
          return;
      }
  }
  let currentPlayer = playerOne;
  document.addEventListener("click", (e) => {
    if (!(e.target.closest(".quadrant"))) {
      return;
    } else if (e.target.textContent != "" || gameOver === true) {
      return;
    } else {
      currentPlayer.addToBoard(currentPlayer.marker);
      const value = (gameBoard.getBoard().length - 1);
      e.target.textContent = gameBoard.getBoard()[`${value}`];
      checkForWinner();
      currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }
  });  
  
})();


