/**
 *  Week 3 BCA Project:
 *    web based implementation of classic tic-tac-toe game
 *    using html, css, and javascript. Shows good use of 
 *    DOM Querying techniques
 *    Author: Nick Castle
 *    Start Date: 6/19/19
 */

/** Classes / Objects **/

// game object (class?)
let game = {
  // has a "whose turn" variablesetCellListeners();
  turn: 'X',
  winningConditions: [
    [0, 1, 2],  // top row
    [3, 4, 5],  // middle row
    [6, 7, 8],  // bottom row
    [0, 3, 6],  // left column
    [1, 4, 7],  // middle column
    [2, 5, 8],  // right column
    [0, 4, 8],  // down-right diagonal
    [2, 4, 6]   // down-left diagonal
  ],
  playerOne: {
    name: 'Player X',
    letter: 'X',
    human: true
  },
  playerTwo: {
    name: 'Player O',
    letter: 'O',
    human: false
  }

}

// assign elements to variables
let startButton = document.getElementById('start');
let turnStatus = document.getElementById('turn-status');
// select all divs with an id starting with 'cell-' in
// the element with a class of board (i.e. select all cells)
let board = document.querySelectorAll('.board div[id^="cell-"]');
let nameInput = document.getElementById('playerInput');
let nameButton = document.getElementById('nameButton');

// assign event listeners

// startButton listener disables start button,
// displays the turn status, and calls play() to start game
startButton.addEventListener('click', () => {
  console.log('start button clicked');
  startButton.disabled = true;
  turnStatus.textContent = `Player ${game.turn}'s turn!`;
  removeNameArea();
  // play game
  play();
});


nameButton.addEventListener('click', setNames);

function removeNameArea() {
  nameInput.style = 'display: none;';
  nameButton.style = 'display: none;';  
}

/** Functions **/

function setNames() {
  console.log(`${nameInput.value} ${game.playerOne.name}`)

  if (nameInput.value && game.playerOne.name === 'Player X') {
    game.playerOne.name = nameInput.value;
    nameInput.value = '';
    nameInput.placeholder = `Enter Player Two's name`;
  } else if (nameInput.value && game.playerTwo.name === 'Player O') {
    game.playerTwo.name = nameInput.value;
    nameInput.value = '';
    removeNameArea(); // both players have names so remove from display
  } else { 
    removeNameArea();
  }
  console.log(`player names: ${game.playerOne.name} ${game.playerTwo.name}`);
}

// play()
// this function starts the game when the start button is clicked
function play() {
  
  // inside play so that listeners arenPlayer X't
  // set until after game is started with button
  setCellListeners();
}

// function that switches the turn
function switchTurn() {
  // check for winner before switching turns so that
  // displayWinner knows who's turn it is when someone wins
  if(checkForWinner()) {
    console.log(`found a winner: ${game.turn}`)
    // do nothing / end game / ask to play again
  } else {
    // if X just went, then change turn to O
    if (game.turn === 'X') {
      game.turn = 'O';
      // change turnStatus
      turnStatus.textContent = `Player ${game.turn}'s turn!`;
    // otherwise, O just went
    } else {
      game.turn = 'X'  // so change turn to X
      turnStatus.textContent = `Player ${game.turn}'s turn!`;
    }
  }
}

// functionality for each cell listener, sets content to player turn,
// sets the style of the cell, and switches the turn
function cellListeners(evt) {
  if (evt.target.textContent !== '') {
    alert('Please click an empty cell');
  } else {
    evt.target.textContent = game.turn;  // set cell's textContent to turn
    evt.target.style = "font-size: 175px;";
    switchTurn();   // switch turn to opposite player
  }
};

//set up click listeners for each cell when clicked, they need 
// to display either an X or an O depending on the turn status
function setCellListeners() {
  board.forEach((elem) => {
    elem.addEventListener('click', cellListeners);
  });
}

// remove the cell listeners when the game is over so that
// no more empty cells can be clicked
function removeCellListers() {
  board.forEach((elem) => {
    elem.removeEventListener('click', cellListeners);
  });
}

// check for winner function will check the board
// against all win conditions for a winner
function checkForWinner() {
  console.log('checking for winner');

  // by default there is no winner (false)
  let winner = false;
  // for each winningCondition sub-array
  game.winningConditions.forEach((condition) => {
    let threeXs = 0;
    let threeOs = 0;
    // for each index in the sub-array
    for (let index in condition) {
      // increment Xs or Ox based on the content of that board cell
      if (board[condition[index]].textContent === 'X') threeXs++;
      if (board[condition[index]].textContent === 'O') threeOs++;
    }
    // winningCondition sub-array has three Xs
    if (threeXs === 3) {
      displayWinner('X');
      removeCellListers();
      winner = true;
    }
    // winningCondition sub-array has three Os
    if(threeOs === 3) {
      displayWinner('O');
      removeCellListers();
      winner = true;
    }
  })
  return winner; 
}

// function that will display the winner to the turn status area
function displayWinner(winner) {
  turnStatus.textContent = `Player ${winner} Wins!`;
}