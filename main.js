const gridBox = document.querySelectorAll(".gridBox");
const turnCommentH2 = document.querySelector("#turn-comment-h2");
const restart = document.querySelector("#restart");

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;
  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      gridBox[i].textContent = "";
    }
  };

  return {
    getBoard,
    reset,
  };
})();

const get = gameBoard.getBoard();

const displayController = (() => {
  const registerChoice = () => {
    let j = 1;
    for (let i = 0; i < 9; i++) {
      gridBox[i].addEventListener("click", function yo() {
        if (j == 1 && get[i] == "") {
          get[i] = "X";
          gameBoard.reset();
          render();
          checkWinner();
          if (winIndicator == true) {
            turnCommentH2.textContent = "Player X Wins!";;
          } else {
            j = 0;
            turnCommentH2.textContent = "Player Y's Turn";
          }
        } else if (j == 0 && get[i] == "") {
          get[i] = "O";
          gameBoard.reset();
          render();
          checkWinner();
          j = 1;
          turnCommentH2.textContent = "Player X's Turn";
        }
      });
    }
  };

  let winIndicator = false;

  const checkWinner = () => {
    if ((get[0] && get[1] && get[2]) == "X") {
      winIndicator = true;
    } else {
      console.log("continue");
    }
  };
  const render = () => {
    for (let i = 0; i < get.length; i++) {
      gridBox[i].textContent = get[i];
    }
  };
  const restartGame = () => {
    restart.addEventListener("click", () => {
      for (let i = 0; i < get.length; i++) {
        get[i] = "";
        gameBoard.reset();
        render();
      }
    });
  };
  return { registerChoice, restartGame, checkWinner };
})();

displayController.registerChoice();
displayController.restartGame();
