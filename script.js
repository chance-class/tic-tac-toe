const gameBoard = (function () {
  const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const clearBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = i;
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
    if (playerOne === currentPlayer && gameOver === false) {
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
    if (playerTwo === currentPlayer && gameOver === false) {
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
      return true;
    } else {
      return false;
    }
  }

  const win = () => {
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
    } 

    const isATie = () => {
      if (playerOne.x.length === 5 || playerTwo.o.length === 5) {
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
        const choices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        roboChoice = choices[Math.floor(Math.random() * choices.length)];
        let quad = document.querySelector(`#quad-${roboChoice}`);
        if (quad.textContent != "") {
          roboChoice = "";
          quad = "";
          isRobot();
        } else {
          currentPlayer.addToBoard(currentPlayer.marker, roboChoice);
          quad.textContent = currentPlayer.marker;
          if (checkForWin(gameBoard.board, currentPlayer.marker) === true) {
            win();
          } else {
            isATie();
          };
          if (gameOver === false) {
            currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
            headDiv.textContent = `${currentPlayer.name}'s turn`;
          }
        }
      }
    }
  }

  function emptyIndexes(board){
    return  board.filter(s => s != "O" && s != "X");
  }

  function minimax(newBoard, player){
  

    let availSpots = emptyIndexes(newBoard);

    if (checkForWin(newBoard, playerOne.marker)){
        return {score:-10};
     }
       else if (checkForWin(newBoard, playerTwo.marker)){
       return {score:10};
       }
     else if (availSpots.length === 0){
         return {score:0};
     }

     let moves = [];

    for (let i = 0; i < availSpots.length; i++){
    
    let move = {};
  	move.index = newBoard[availSpots[i]];

    newBoard[availSpots[i]] = player;

    
    if (player === playerTwo.marker){
      let result = minimax(newBoard, playerOne.marker);
      move.score = result.score;
    }
    else{
      let result = minimax(newBoard, playerTwo.marker);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;

    moves.push(move);
  }

  let bestMove;
  if(player === playerTwo.marker){
    let bestScore = -10000;
    for(let i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {

    let bestScore = 10000;
    for(let i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}


const isEvilRobot = () => {
  if (playerTwo.name === "Terminator") {
    if (playerTwo === currentPlayer) {
      roboChoice = minimax(gameBoard.board, playerTwo.marker);
      currentPlayer.addToBoard(currentPlayer.marker, roboChoice.index);
      let selected = document.querySelector(`#quad-${roboChoice.index}`);
      selected.textContent = currentPlayer.marker;
      if (checkForWin(gameBoard.board, currentPlayer.marker) === true) {
        win();
      } else {
        isATie();
      };
      if (gameOver === false) {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        headDiv.textContent = `${currentPlayer.name}'s turn`;
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
      let quad = "";
      for (let i = 0; i < quadrants.length; i++) {
        if (quadrants[i].id === e.target.id) {
          quad = i;
        }
      }
      currentPlayer.addToBoard(currentPlayer.marker, quad);
      e.target.textContent = currentPlayer.marker;
      if (checkForWin(gameBoard.board, currentPlayer.marker) === true) {
        win();
      } else {
        isATie();
      };
      if (gameOver === false) {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        headDiv.textContent = `${currentPlayer.name}'s turn`;
      }
      isRobot();
      isEvilRobot();
    }
  });
  return { gameOver };

})();

