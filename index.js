

const game = () => {
// change page style
  displayBoard();

  var continueGame = true;
  var p1Moves = [];
  var p2Moves = [];
  var currentMoves = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];

// player factory
  const Player = (name, marker, turn) => {
    return { name, marker, turn }
  }

  const player1 = Player('p1', 'X', true);
  const player2 = Player('p2', 'O', false);


// event listener sends gameboard move to be checked if there has not been a winner
  var board = document.querySelector('.gameboard');
  board.addEventListener('click', handleClick, false);

  function handleClick(event) {
    if ( continueGame === true) {
    var currentPosition = event.target.id;
    checkChoice(currentPosition);
    }
  };

// checks if move is already used
  const checkChoice = (currentPosition) => {
    var index = currentMoves.indexOf(currentPosition);
    if (index > -1) { handleChoice(currentPosition, index)}
  }

// stores move in current player move array, deletes move from available moves, updates styling
  const handleChoice = (currentPosition, index) => {
    if (player1.turn === true) {
      p1Moves.push(currentPosition);
      currentMoves.splice(index, 1);
      styleX(currentPosition);
      document.querySelector('#gameTitle').innerHTML = "Player 2's turn"
      checkWinner(p1Moves);

    } if (player2.turn === true) {
      p2Moves.push(currentPosition);
      currentMoves.splice(index, 1);
      styleO(currentPosition);
      document.querySelector('#gameTitle').innerHTML = "Player 1's turn"
      checkWinner(p2Moves);
    }
    nextTurn();
  }
// changes player turn
  const nextTurn = () => {
    player1.turn = !player1.turn
    player2.turn = !player2.turn
  }

// iterates over 2 sets, possibleWinSet and its "sub" sets. compares against the playermoves set, to see if there are 3 matches.
  const checkWinner = (playerMoves) => {
    const gameBoard = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];

    const possibleWins = [
      new Set ( [gameBoard[0], gameBoard[1], gameBoard[2]] ),
      new Set ( [gameBoard[3], gameBoard[4], gameBoard[5]] ),
      new Set ( [gameBoard[6], gameBoard[7], gameBoard[8]] ),
      new Set ( [gameBoard[0], gameBoard[3], gameBoard[6]] ),
      new Set ( [gameBoard[1], gameBoard[4], gameBoard[7]] ),
      new Set ( [gameBoard[2], gameBoard[5], gameBoard[8]] ),
      new Set ( [gameBoard[0], gameBoard[4], gameBoard[8]] ),
      new Set ( [gameBoard[6], gameBoard[4], gameBoard[2]] ),
    ]
    
    var possibleWinsSet = new Set(possibleWins);
    playerMoves = new Set(playerMoves);
    for (const possibleWin of possibleWinsSet) {
      var win = 0;
      for (const itemsPWin of possibleWin) {
        if ( !(playerMoves.has(itemsPWin)) )  {
          break;
        }
        if ( playerMoves.has(itemsPWin) ) {
          win++;
          if (win === 3) {
            displayWinner();
            break;
          }
        }
      }
    }
  }

  // resets gameboard displays and game variables
  function restartGame() {
    // removes original event listener by replacing div with its clone
    board.replaceWith(board.cloneNode(true));
    // clear styling
    document.querySelector('#gameTitle').innerHTML = "Player 1's turn";
    var positions = document.querySelectorAll('.positions');
    for (var i=0; i < positions.length; i++) {
      positions[i].innerHTML = ""
    };

    game();

  };

  return { restartGame };

};

// styling functions
function styleX(currentPosition) {
  document.querySelector('#'+currentPosition).innerHTML = 'X';
  document.querySelector('#'+currentPosition).style.color = '#FE8745';
}

function styleO(currentPosition) {
  document.querySelector('#'+currentPosition).innerHTML = 'O';
  document.querySelector('#'+currentPosition).style.color = '#F576EB';
}

function displayWinner() {
  document.querySelector('#gameTitle').innerHTML = 'WINNER!';
  continueGame = false;
  document.querySelector('.restartBtn').style.display = "block";
}

function displayBoard() {
  document.querySelector('.game').style.display = "block";
  document.querySelector('.startingPage').style.display = "none";
}


