const gameBoard = (function() {
  const board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;
  return {getBoard};
})();

const player = (name, marker) => {
  let x = [], o = [];
  const addToBoard = (marker, quad) => {
    gameBoard.getBoard().push(`${marker}`);
    if (marker === "X") {
      x.push(quad);
    } else if (marker === "O") {
      o.push(quad);
    }
    console.log(x);
    console.log(o);
  }
  return {name, marker, addToBoard, x, o};
}

const playerOne = player("Player One", "X");
const playerTwo = player("Player Two", "O");

const displayController = (function() {
//  const quad1 = document.getElementById("quad-1");
//  const quad2 = document.getElementById("quad-2");
//  const quad3 = document.getElementById("quad-3");
//  const quad4 = document.getElementById("quad-4");
//  const quad5 = document.getElementById("quad-5");
//  const quad6 = document.getElementById("quad-6");
//  const quad7 = document.getElementById("quad-7");
//  const quad8 = document.getElementById("quad-8");
//  const quad9 = document.getElementById("quad-9");
  let gameOver = false;
  const checkForWinner = () => {
    let winner = "";
    const includesAll = (arr, values) => values.every(v => arr.includes(v));
    if (includesAll(playerOne.x, ["quad-1", "quad-2", "quad-3"]) || includesAll(playerOne.x, ["quad-4", "quad-5", "quad-6"]) || 
    includesAll(playerOne.x, ["quad-7", "quad-8", "quad-9"]) || includesAll(playerOne.x, ["quad-1", "quad-4", "quad-7"]) || 
    includesAll(playerOne.x, ["quad-2", "quad-5", "quad-8"]) || includesAll(playerOne.x, ["quad-3", "quad-6", "quad-9"]) ||
    includesAll(playerOne.x, ["quad-1", "quad-5", "quad-9"]) || includesAll(playerOne.x, ["quad-3", "quad-5", "quad-7"])) {
      winner = playerOne;
      gameOver = true;
      headDiv.textContent = `${playerOne.name} wins the game!`;
      const refresh = document.createElement("button");
      headDiv.appendChild(refresh);
      document.querySelector(".refresh").style.marginLeft = "15px";
      refresh.textContent = "Play Again";
      refresh.addEventListener("click", () => {

      })
    }
    if (winner !== playerOne)
    if (includesAll(playerTwo.o, ["quad-1", "quad-2", "quad-3"]) || includesAll(playerTwo.o, ["quad-4", "quad-5", "quad-6"]) || 
    includesAll(playerTwo.o, ["quad-7", "quad-8", "quad-9"]) || includesAll(playerTwo.o, ["quad-1", "quad-4", "quad-7"]) || 
    includesAll(playerTwo.o, ["quad-2", "quad-5", "quad-8"]) || includesAll(playerTwo.o, ["quad-3", "quad-6", "quad-9"]) ||
    includesAll(playerTwo.o, ["quad-1", "quad-5", "quad-9"]) || includesAll(playerTwo.o, ["quad-3", "quad-5", "quad-7"])) {
      winner = playerTwo;
      gameOver = true;
      headDiv.textContent = `${playerTwo.name} wins the game!`;
      const refresh = document.createElement("button");
      headDiv.appendChild(refresh);
      document.querySelector(".refresh").style.marginLeft = "15px";
      refresh.textContent = "Play Again";
      refresh.addEventListener("click", () => {
        
      })
    }

    else if (playerOne.x.length === 5) {
      alert("It's a tie!");
    }
    
  }


  let currentPlayer = playerOne;
  document.addEventListener("click", (e) => {
    if (!(e.target.closest(".quadrant"))) {
      return;
    } else if (e.target.textContent != "" || gameOver === true) {
      return;
    } else {
      quad = e.target.id;
      currentPlayer.addToBoard(currentPlayer.marker, quad);
      const value = (gameBoard.getBoard().length - 1);
      e.target.textContent = gameBoard.getBoard()[`${value}`];
      checkForWinner(currentPlayer.marker);
      if (gameOver === false) {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        headDiv.textContent = `${currentPlayer.name}'s turn`;
      }
    }
  }); 
  return {gameOver};
  
})();

const header = document.getElementById("header");
const headDiv = document.createElement("div");
headDiv.classList.add("head");
header.appendChild(headDiv);
document.querySelector(".head").style.fontSize = "20px";
document.querySelector(".head").style.textAlign = "center";
headDiv.textContent = "Player One's turn";


