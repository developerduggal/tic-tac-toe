const gridBox = document.querySelectorAll(".gridBox");
const turnCommentH2 = document.querySelector("#turn-comment-h2");
const restart = document.querySelector("#restart");

// object to store the gameboard as an array
const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;
  const reset = () => {
    // to reset the grid
    for (let i = 0; i < board.length; i++) {
      gridBox[i].textContent = "";
    }
  };
  return {
    getBoard,
    reset,
  };
})();

const get = gameBoard.getBoard(); //to access the gameboard array

// object to control the flow of the game
const displayController = (() => {
  let winIndicator;
  let tieIndicator;
  let j; //variable created to control the turns of player 'X' and player 'O'
  const registerChoice = () => {
    j = 1;
    for (let i = 0; i < 9; i++) {
      gridBox[i].addEventListener("click", () => {
        if (j == 1 && get[i] == "") {
          get[i] = "X"; //update the move in the gameboard array
          gameBoard.reset(); //reset the grid
          render(); //render the updated array on the grid
          checkTie(); //check if the game has tied
          checkWinner(); //check if player 'X' or player 'O' has won

          if (winIndicator == true) {
            turnCommentH2.textContent = "Player X Wins!";
          } else if (tieIndicator == true) {
            turnCommentH2.textContent = "It's a Tie!";
          } else {
            j = 0;
            turnCommentH2.textContent = "Player O's Turn";
          }
        } else if (j == 0 && get[i] == "") {
          get[i] = "O";
          gameBoard.reset();
          render();
          checkTie();
          checkWinner();

          if (winIndicator == true) {
            turnCommentH2.textContent = "Player O Wins!";
          } else if (tieIndicator == true) {
            turnCommentH2.textContent = "It's a Tie!";
          } else {
            j = 1;
            turnCommentH2.textContent = "Player X's Turn";
          }
        }
      });
    }
  };

  //function to check if player 'X' or player 'O' has won the game
  const checkWinner = () => {
    if (
      (get[0] == get[1] &&
        get[1] == get[2] &&
        (get[2] == "X" || get[2] == "O")) ||
      (get[3] == get[4] &&
        get[4] == get[5] &&
        (get[5] == "X" || get[5] == "O")) ||
      (get[6] == get[7] &&
        get[7] == get[8] &&
        (get[8] == "X" || get[8] == "O")) ||
      (get[0] == get[3] &&
        get[3] == get[6] &&
        (get[6] == "X" || get[6] == "O")) ||
      (get[1] == get[4] &&
        get[4] == get[7] &&
        (get[7] == "X" || get[7] == "O")) ||
      (get[2] == get[5] &&
        get[5] == get[8] &&
        (get[8] == "X" || get[8] == "O")) ||
      (get[0] == get[4] &&
        get[4] == get[8] &&
        (get[8] == "X" || get[8] == "O")) ||
      (get[2] == get[4] && get[4] == get[6] && (get[6] == "X" || get[6] == "O"))
    ) {
      winIndicator = true;
    } else {
      return;
    }
  };

  const render = () => {
    //to render the gameboard array on the grid
    for (let i = 0; i < get.length; i++) {
      gridBox[i].textContent = get[i];
    }
  };

  const restartGame = () => {
    //restart the game when the restart button is clicked
    restart.addEventListener("click", () => {
      for (let i = 0; i < get.length; i++) {
        get[i] = "";
        gameBoard.reset();
        render();
        registerChoice();
        winIndicator = false;
        tieIndicator = false;
        turnCommentH2.textContent = "Player X's Turn";
      }
    });
  };

  const checkTie = () => {
    // function to check if the game has tied
    for (let i = 0; i < 9; i++) {
      if (get[i] == "") {
        tieIndicator = false;
        return;
      } else tieIndicator = true;
    }
  };
  return { registerChoice, restartGame, checkTie };
})();

displayController.registerChoice();
displayController.restartGame();
