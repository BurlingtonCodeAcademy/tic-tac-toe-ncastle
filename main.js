/**
 *  Week 3 BCA Project:
 *    web based implementation of classic tic-tac-toe game
 *    using html, css, and javascript. Shows good use of 
 *    DOM Querying techniques
 *    Author: Nick Castle
 *    Start Date: 6/19/19
 */

// variables
let turn = 'X';

/** Classes / Objects **/

// game object (class?)
let game = {
  // has a "whose turn" variable
  turn: 'X'
}

// assign elements to variables
let startButton = document.getElementById('start');
let turnStatus = document.getElementById('turn-status');
let cell0 = document.getElementById('cell-0');
// select all divs with an id starting with 'cell-' in
// the element with a class of board (i.e. select all cells)
let board = document.querySelectorAll('.board div[id^="cell-"]');
console.log({board});

// assign event listeners

// startButton listener disables start button,
// displays the turn status, and calls play() to start game
startButton.addEventListener('click', () => {
  console.log('start button clicked');
  startButton.disabled = true;
  turnStatus.textContent = `Player ${game.turn}'s turn!`;
  // play game
  play();
});

// // adds an event listener to cell 0
// cell0.addEventListener('click', () => {
//   cell0.textContent = turn;
//   cell0.style = "font-size: 150px;";
// })


/** Functions **/

// play()
// this function starts the game when the start button is clicked
function play() {

  // inside play so that listeners aren't
  // set until after game is started with button
  setCellListeners();

}

// function that switches the turn
function switchTurn() {
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

//set up click listeners for each cell when clicked, they need 
// to display either an X or an O depending on the turn status
function setCellListeners() {
  board.forEach((elem) => {
    elem.addEventListener('click', () => {
      elem.textContent = game.turn;  // set cell's textContent to turn
      elem.style = "font-size: 150px;";
      switchTurn();   // switch turn to opposite player
    });
  });
}