const gameBoard = (function() {
  let board = [];
  const getBoard = () => board;
  const clearBoard = () => board.splice(0, 9);
  return {getBoard, clearBoard};
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

  }
  return {name, marker, addToBoard, x, o};
}

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

  const playerOne = player("Player One", "X");
const playerTwo = player("Player Two", "O");
let currentPlayer = playerOne;

  const header = document.getElementById("header");
const headDiv = document.createElement("div");
headDiv.classList.add("head");
header.appendChild(headDiv);
document.querySelector(".head").style.fontSize = "20px";
document.querySelector(".head").style.textAlign = "center";
headDiv.textContent = "Player One's turn";

const change1 = document.getElementById("change-1");
const player1 = document.querySelector("#player1");
change1.addEventListener("click", () => {
  playerOne.name = prompt("Please enter your name.");
  if (playerOne.name === null) {
    playerOne.name = "Player One";
  }
  player1.textContent = `${playerOne.name}`;
  if (playerOne === currentPlayer) {
    headDiv.textContent = `${playerOne.name}'s turn`;
  }
})

const change2 = document.getElementById("change-2");
const player2 = document.querySelector("#player2");
change2.addEventListener("click", () => {
  playerTwo.name = prompt("Please enter your name.");
  if (playerTwo.name === null) {
    playerTwo.name = "Player Two";
  }
  player2.textContent = `${playerTwo.name}`;
  console.log(currentPlayer);
  if (playerTwo === currentPlayer) {
    headDiv.textContent = `${playerTwo.name}'s turn`;
  }
})

const robocop = document.getElementById("robocop");
robocop.addEventListener("click", () => {
  if (robocop.textContent === "Play Computer") {
    playerTwo.name = "Robocop";
    player2.textContent = "Robocop";
    isRobot();
    robocop.textContent = "Play User";
  } else {
    playerTwo.name = "Player Two";
    player2.textContent = "Player Two";
    robocop.textContent = "Play Computer";
  }
})

  let gameOver = false;
  const checkForWinner = () => {
    let winner = "";
    const includesAll = (arr, values) => values.every(v => arr.includes(v));
    if (includesAll(playerOne.x, ["quad-1", "quad-2", "quad-3"]) || includesAll(playerOne.x, ["quad-4", "quad-5", "quad-6"]) || 
    includesAll(playerOne.x, ["quad-7", "quad-8", "quad-9"]) || includesAll(playerOne.x, ["quad-1", "quad-4", "quad-7"]) || 
    includesAll(playerOne.x, ["quad-2", "quad-5", "quad-8"]) || includesAll(playerOne.x, ["quad-3", "quad-6", "quad-9"]) ||
    includesAll(playerOne.x, ["quad-1", "quad-5", "quad-9"]) || includesAll(playerOne.x, ["quad-3", "quad-5", "quad-7"])) {
      gameOver = true;
      headDiv.textContent = `${playerOne.name} wins the game!`;
      const refresh = document.createElement("button");
      headDiv.appendChild(refresh);
      refresh.style.marginLeft = "15px";
      refresh.style.height = "30px";
      refresh.textContent = "Play Again";
      refresh.addEventListener("click", () => {
        refresh.remove();
        quad1.textContent = "";
        quad2.textContent = "";
        quad3.textContent = "";
        quad4.textContent = "";
        quad5.textContent = "";
        quad6.textContent = "";
        quad7.textContent = "";
        quad8.textContent = "";
        quad9.textContent = "";
        gameOver = false;
        gameBoard.clearBoard();
        playerOne.x.splice(0, 5);
        playerTwo.o.splice(0, 5);
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        headDiv.textContent = `${currentPlayer.name}'s turn`;
        isRobot();
      })
    }

    else if (includesAll(playerTwo.o, ["quad-1", "quad-2", "quad-3"]) || includesAll(playerTwo.o, ["quad-4", "quad-5", "quad-6"]) || 
    includesAll(playerTwo.o, ["quad-7", "quad-8", "quad-9"]) || includesAll(playerTwo.o, ["quad-1", "quad-4", "quad-7"]) || 
    includesAll(playerTwo.o, ["quad-2", "quad-5", "quad-8"]) || includesAll(playerTwo.o, ["quad-3", "quad-6", "quad-9"]) ||
    includesAll(playerTwo.o, ["quad-1", "quad-5", "quad-9"]) || includesAll(playerTwo.o, ["quad-3", "quad-5", "quad-7"])) {
      gameOver = true;
      headDiv.textContent = `${playerTwo.name} wins the game!`;
      const refresh = document.createElement("button");
      headDiv.appendChild(refresh);
      refresh.style.marginLeft = "15px";
      refresh.style.height = "30px";
      refresh.textContent = "Play Again";
      refresh.addEventListener("click", () => {
        refresh.remove();
        quad1.textContent = "";
        quad2.textContent = "";
        quad3.textContent = "";
        quad4.textContent = "";
        quad5.textContent = "";
        quad6.textContent = "";
        quad7.textContent = "";
        quad8.textContent = "";
        quad9.textContent = "";
        gameOver = false;
        playerOne.x.splice(0, 5);
        playerTwo.o.splice(0, 5);
        gameBoard.clearBoard();
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        headDiv.textContent = `${currentPlayer.name}'s turn`;
        isRobot();
      })
    }
    
    else if (playerOne.x.length === 5 || playerTwo.o.length === 5) {
      headDiv.textContent = "It's a tie!";
      gameOver = true;
      const refresh = document.createElement("button");
      headDiv.appendChild(refresh);
      refresh.style.marginLeft = "15px";
      refresh.style.height = "30px";
      refresh.textContent = "Play Again";
      refresh.addEventListener("click", () => {
        refresh.remove();
        quad1.textContent = "";
        quad2.textContent = "";
        quad3.textContent = "";
        quad4.textContent = "";
        quad5.textContent = "";
        quad6.textContent = "";
        quad7.textContent = "";
        quad8.textContent = "";
        quad9.textContent = "";
        gameOver = false;
        playerOne.x.splice(0, 5);
        playerTwo.o.splice(0, 5);
        gameBoard.clearBoard();
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        headDiv.textContent = `${currentPlayer.name}'s turn`;
        isRobot();
      })
    }
    
  }
  
  const isRobot = () => {
    if (playerTwo.name === "Robocop") {
      if (currentPlayer === playerTwo) {
        const choices = ["quad-1", "quad-2", "quad-3", "quad-4", "quad-5", "quad-6", 
        "quad-7", "quad-8", "quad-9"];
        let roboChoice = choices[Math.floor(Math.random() * choices.length)];
        let quad = document.querySelector(`#${roboChoice}`);
        console.log(quad);
        if (quad.textContent != "") {
          roboChoice = "";
          quad = "";
          isRobot();
        } else {
        currentPlayer.addToBoard(currentPlayer.marker, roboChoice);
        const value = (gameBoard.getBoard().length - 1);
        quad.textContent = gameBoard.getBoard()[`${value}`];
        checkForWinner(currentPlayer.marker);
        if (gameOver === false) {
          currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
          headDiv.textContent = `${currentPlayer.name}'s turn`;
        }
      }
      }
    }
  }

  document.addEventListener("click", (e) => {
    if (!(e.target.closest(".quadrant"))) {
      return;
    } else if (e.target.textContent != "" || gameOver === true) {
      return;
    } else {
      let quad = e.target.id;
      currentPlayer.addToBoard(currentPlayer.marker, quad);
      const value = (gameBoard.getBoard().length - 1);
      e.target.textContent = gameBoard.getBoard()[`${value}`];
      checkForWinner(currentPlayer.marker);
      if (gameOver === false) {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        headDiv.textContent = `${currentPlayer.name}'s turn`;
      }
      isRobot();
    }
  }); 
  return {gameOver};
  
})();

