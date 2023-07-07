const gameBoard = (function () {
  const board = new Array(9);
  const clearBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    } 
  };
  return { board, clearBoard };
})();

const player = (name, marker) => {
  let x = [], o = [];
  const addToBoard = (marker, quad) => {
    gameBoard.board[quad] = marker;
    if (marker === "X") {
      x.push(quad);
    } else if (marker === "O") {
      o.push(quad);
    }

  }
  return { name, marker, addToBoard, x, o };
}

const displayController = (function () {
  //  const quad1 = document.getElementById("quad-1");
  //  const quad2 = document.getElementById("quad-2");
  //  const quad3 = document.getElementById("quad-3");
  //  const quad4 = document.getElementById("quad-4");
  //  const quad5 = document.getElementById("quad-5");
  //  const quad6 = document.getElementById("quad-6");
  //  const quad7 = document.getElementById("quad-7");
  //  const quad8 = document.getElementById("quad-8");
  //  const quad9 = document.getElementById("quad-9");

  function emptyIndexes(board){
    return  board.filter(s => s != "O" && s != "X");
  }

  const playerOne = player("Player One", "X");
  const playerTwo = player("Player Two", "O");
  const aiPlayer = player("Terminator", "O");
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
    } else if (playerOne.name === "Robocop" || playerOne.name === "Terminator") {
      alert("Please choose a different name.");
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
    } else if (playerTwo.name === "Robocop" || playerTwo.name === "Terminator") {
      alert("Please choose a different name.");
      playerTwo.name = "Player Two";
    }
    player2.textContent = `${playerTwo.name}`;
    if (robocop.textContent === "Play User") {
      robocop.textContent = "Play Computer";
    } else if (terminator.textContent === "Play User") {
      terminator.textContent = "Play Evil Computer";
    }
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
      if (terminator.textContent === "Play User") {
        terminator.textContent = "Play Evil Computer";
      }
    } else {
      playerTwo.name = "Player Two";
      player2.textContent = "Player Two";
      robocop.textContent = "Play Computer";
    }
  })

  const terminator = document.getElementById("terminator");
  terminator.addEventListener("click", () => {
    if (terminator.textContent === "Play Evil Computer") {
      playerTwo.name = "Terminator";
      player2.textContent = "Terminator";
      isEvilRobot();
      terminator.textContent = "Play User";
      if (robocop.textContent === "Play User") {
        robocop.textContent = "Play Computer";
      }
    } else {
      playerTwo.name = "Player Two";
      player2.textContent = "Player Two";
      terminator.textContent = "Play Evil Computer";
    }
  })

  const quadrants = document.querySelectorAll(".quadrant");
  const includesAll = (arr, values) => values.every(v => arr.includes(v));

  let gameOver = false;

  function checkForWin(board, player){
    if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
    ) {
      gameOver = true;
      headDiv.textContent = `${currentPlayer.name} wins the game!`;
      const refresh = document.createElement("button");
      headDiv.appendChild(refresh);
      refresh.classList.add("refresh");
      refresh.textContent = "Play Again";
      refresh.addEventListener("click", () => {
        refresh.remove();
        for (quadrant of quadrants) {
          quadrant.textContent = "";
        }
        gameOver = false;
        gameBoard.clearBoard();
        playerOne.x.splice(0, 5);
        playerTwo.o.splice(0, 5);
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        headDiv.textContent = `${currentPlayer.name}'s turn`;
        isRobot();
        isEvilRobot();
      })
    } else if (playerOne.x.length === 5 || playerTwo.o.length === 5) {
      headDiv.textContent = "It's a tie!";
      gameOver = true;
      const refresh = document.createElement("button");
      headDiv.appendChild(refresh);
      refresh.classList.add("refresh");
      refresh.textContent = "Play Again";
      refresh.addEventListener("click", () => {
        refresh.remove();
        for (quadrant of quadrants) {
          quadrant.textContent = "";
        }
        gameOver = false;
        playerOne.x.splice(0, 5);
        playerTwo.o.splice(0, 5);
        gameBoard.clearBoard();
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        headDiv.textContent = `${currentPlayer.name}'s turn`;
        isRobot();
        isEvilRobot();
      })
    }
  }

  const isRobot = () => {
    if (playerTwo.name === "Robocop") {
      if (playerTwo === currentPlayer) {
        const choices = ["quad-1", "quad-2", "quad-3", "quad-4", "quad-5", "quad-6",
          "quad-7", "quad-8", "quad-9"];
        roboChoice = choices[Math.floor(Math.random() * choices.length)];
        let quad = document.querySelector(`#${roboChoice}`);
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

  const isEvilRobot = () => {
    if (playerTwo.name === "Terminator") {
      if (playerTwo === currentPlayer) {
        const choices = ["quad-1", "quad-2", "quad-3", "quad-4", "quad-5", "quad-6",
          "quad-7", "quad-8", "quad-9"];
        let roboChoice = "";
        if (quad1.textContent === "O" && quad2.textContent === "O" && quad3.textContent === "" || 
        quad6.textContent === "O" && quad9.textContent === "O" && quad3.textContent === "" || 
        quad5.textContent === "O" && quad7.textContent === "O" && quad3.textContent === "") {
          roboChoice = "quad-3";
        } else if (quad2.textContent === "O" && quad3.textContent === "O" && quad1.textContent === "" || 
        quad4.textContent === "O" && quad7.textContent === "O" && quad1.textContent === "" || 
        quad9.textContent === "O" && quad5.textContent === "O" && quad1.textContent === "") {
          roboChoice = "quad-1";
        } else if (quad1.textContent === "O" && quad4.textContent === "O" && quad7.textContent === "" || 
        quad8.textContent === "O" && quad9.textContent === "O" && quad7.textContent === "" || 
        quad3.textContent === "O" && quad5.textContent === "O" && quad7.textContent === "") {
          roboChoice = "quad-7";
        } else if (quad3.textContent === "O" && quad6.textContent === "O" && quad9.textContent === "" || 
        quad7.textContent === "O" && quad8.textContent === "O" && quad9.textContent === "" || 
        quad1.textContent === "O" && quad5.textContent === "O" && quad9.textContent === "") {
          roboChoice = "quad-9";
        } else if (quad1.textContent === "O" && quad9.textContent === "O" && quad5.textContent === "" || 
        quad3.textContent === "O" && quad7.textContent === "O" && quad5.textContent === "" || 
        quad4.textContent === "O" && quad6.textContent === "O" && quad5.textContent === "" || 
        quad2.textContent === "O" && quad8.textContent === "O" && quad5.textContent === "") {
          roboChoice = "quad-5";
        } else if (quad1.textContent === "O" && quad3.textContent === "O" && quad2.textContent === "" || 
        quad5.textContent === "O" && quad8.textContent === "O" && quad2.textContent === "") {
          roboChoice = "quad-2";
        } else if (quad3.textContent === "O" && quad9.textContent === "O" && quad6.textContent === "" || 
        quad4.textContent === "O" && quad5.textContent === "O" && quad6.textContent === "") {
          roboChoice = "quad-6";
        } else if (quad1.textContent === "O" && quad7.textContent === "O" && quad4.textContent === "" || 
        quad5.textContent === "O" && quad6.textContent === "O" && quad4.textContent === "") {
          roboChoice = "quad-4";
        } else if (quad7.textContent === "O" && quad9.textContent === "O" && quad8.textContent === "" || 
        quad2.textContent === "O" && quad5.textContent === "O" && quad8.textContent === "") {
          roboChoice = "quad-8";

        } else if (quad5.textContent === "X" && quad1.textContent === "" && quad3.textContent === "" && 
        quad7.textContent === "" && quad9.textContent === "") {
          const moves = ["quad-1", "quad-3", "quad-7", "quad-9"];
          roboChoice = moves[Math.floor(Math.random() * moves.length)];
        } else if (includesAll(playerOne.x, ["quad-1", "quad-2"]) && !(includesAll(playerOne.x, ["quad-3"])) && !(includesAll(playerTwo.o, ["quad-3"])) || 
        includesAll(playerOne.x, ["quad-6", "quad-9"]) && !(includesAll(playerOne.x, ["quad-3"])) && !(includesAll(playerTwo.o, ["quad-3"])) || 
        includesAll(playerOne.x, ["quad-5", "quad-7"]) && !(includesAll(playerOne.x, ["quad-3"])) && !(includesAll(playerTwo.o, ["quad-3"]))) {
          roboChoice = "quad-3"; 
        } else if (quad2.textContent === "X" && quad3.textContent === "X" && quad1.textContent === "" || 
        quad4.textContent === "X" && quad7.textContent === "X" && quad1.textContent === "" || 
        quad9.textContent === "X" && quad5.textContent === "X" && quad1.textContent === "") {
          roboChoice = "quad-1";
        } else if (quad1.textContent === "X" && quad4.textContent === "X" && quad7.textContent === "" || 
        quad8.textContent === "X" && quad9.textContent === "X" && quad7.textContent === "" || 
        quad3.textContent === "X" && quad5.textContent === "X" && quad7.textContent === "") {
          roboChoice = "quad-7";
        } else if (quad3.textContent === "X" && quad6.textContent === "X" && quad9.textContent === "" || 
        quad7.textContent === "X" && quad8.textContent === "X" && quad9.textContent === "" || 
        quad1.textContent === "X" && quad5.textContent === "X" && quad9.textContent === "") {
          roboChoice = "quad-9";
        } else if (quad1.textContent === "X" && quad9.textContent === "X" && quad5.textContent === "" || 
        quad3.textContent === "X" && quad7.textContent === "X" && quad5.textContent === "" || 
        quad4.textContent === "X" && quad6.textContent === "X" && quad5.textContent === "" || 
        quad2.textContent === "X" && quad8.textContent === "X" && quad5.textContent === "") {
          roboChoice = "quad-5";
        } else if (quad1.textContent === "X" && quad3.textContent === "X" && quad2.textContent === "" || 
        quad5.textContent === "X" && quad8.textContent === "X" && quad2.textContent === "") {
          roboChoice = "quad-2";
        } else if (quad3.textContent === "X" && quad9.textContent === "X" && quad6.textContent === "" || 
        quad4.textContent === "X" && quad5.textContent === "X" && quad6.textContent === "") {
          roboChoice = "quad-6";
        } else if (quad1.textContent === "X" && quad7.textContent === "X" && quad4.textContent === "" ||  
        quad5.textContent === "X" && quad6.textContent === "X" && quad4.textContent === "") {
          roboChoice = "quad-4";
        } else if (quad7.textContent === "X" && quad9.textContent === "X" && quad8.textContent === "" || 
        quad2.textContent === "X" && quad5.textContent === "X" && quad8.textContent === "") {
          roboChoice = "quad-8";
        } else if (quad1.textContent === "X" && quad3.textContent === "" && quad7.textContent === "" && 
        quad9.textContent === "" && quad5.textContent === "") {
          const moves = ["quad-5", "quad-9"];
          roboChoice = moves[Math.floor(Math.random() * moves.length)];
        } else if (quad1.textContent === "" && quad3.textContent === "X" && quad7.textContent === "" && 
        quad9.textContent === "" && quad5.textContent === "") {
          const moves = ["quad-5", "quad-7"];
          roboChoice = moves[Math.floor(Math.random() * moves.length)];
        } else if (quad1.textContent === "" && quad3.textContent === "" && quad7.textContent === "X" && 
        quad9.textContent === "" && quad5.textContent === "") {
          const moves = ["quad-5", "quad-3"];
          roboChoice = moves[Math.floor(Math.random() * moves.length)];
        } else if (quad1.textContent === "" && quad3.textContent === "" && quad7.textContent === "" && 
        quad9.textContent === "X" && quad5.textCOntent === "") {
          const moves = ["quad-5", "quad-1"];
          roboChoice = moves[Math.floor(Math.random() * moves.length)];
        } else {
          roboChoice = choices[Math.floor(Math.random() * choices.length)];
        }

        let quad = document.querySelector(`#${roboChoice}`);
        if (quad.textContent != "") {
          roboChoice = "";
          quad = "";
          isEvilRobot();
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
      let selected = "";
      for (let i = 0; i < quadrants.length; i++) {
        if (quadrants[i].id === e.target.id) {
          selected = i;
        }
      }
      console.log(selected);
      currentPlayer.addToBoard(currentPlayer.marker, selected);
      e.target.textContent = currentPlayer.marker;
      checkForWin(gameBoard.board, currentPlayer.marker);
      if (gameOver === false) {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        headDiv.textContent = `${currentPlayer.name}'s turn`;
      }
      isRobot();
      isEvilRobot();
      console.log(gameBoard.board);
    }
  });
  return { gameOver };

})();

