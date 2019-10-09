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
  playerX: {
    name: 'Player X',
    letter: 'X',
    human: true
  },
  playerO: {
    name: 'Player O',
    letter: 'O',
    human: false
  },
  players: 0,

}

// assign elements to variables
let startButton = document.getElementById('start');
let turnStatus = document.getElementById('turn-status');
// select all divs with an id starting with 'cell-' in
// the element with a class of board (i.e. select all cells)
let board = document.querySelectorAll('.board div[id^="cell-"]');
let nameInput = document.getElementById('playerInput');
let nameButton = document.getElementById('nameButton');
let timer = document.getElementById('timer');
let timerID = undefined;
// buttons
let ppBtn = document.getElementById('pp');
let pcBtn = document.getElementById('pc');
//modal
let modal = document.getElementById('myModal');



// assign event listeners

// startButton listener disables start button,
// displays the turn status, and calls play() to start game
startButton.addEventListener('click', () => {
  console.log('start button clicked');
  startButton.disabled = true;
  turnStatus.textContent = `${game.playerX.name}'s turn!`;
  removeNameArea();
  turnStatus.classList.remove('hidden');
  // play game
  play();
});

// listens for button presses, closes the modal in front of the game
ppBtn.addEventListener('click', () => {
  console.log('player vs player clicked');
  game.players+=2;
  game.playerO.human = true;
  modal.style.display = 'none';
  console.log(game)
});

pcBtn.addEventListener('click', () => {
  console.log('player vs computer clicked');
  game.players++;
  modal.style.display = 'none';
  console.log(game)
});

// window.onclick = (e) => {
//   if (e.target === modal) modal.style.display = 'none';
// }


nameButton.addEventListener('click', setNames);

// sets display to none for name text input and button
function removeNameArea() {
  nameInput.classList.add('hidden');
  nameButton.classList.add('hidden');  
}

/** Functions **/

// function used for the name button's event listener callback
function setNames() {
  console.log(`${nameInput.value} ${game.playerX.name}`)

  if (nameInput.value && game.playerX.name === 'Player X') {
    game.playerX.name = nameInput.value;
    nameInput.value = '';
    nameInput.placeholder = `Enter Player O's name`;
  } else if (nameInput.value && game.playerO.name === 'Player O') {
    game.playerO.name = nameInput.value;
    nameInput.value = '';
    removeNameArea(); // both players have names so remove from display
  } else { 
    removeNameArea();
  }
  console.log(`player names: ${game.playerX.name} ${game.playerO.name}`);
}

// play()
// this function starts the game when the start button is clicked
function play() {
  // inside play so that listeners arenPlayer X't
  // set until after game is started with button
  setCellListeners();
  timerID = startTimer();
  console.log(timerID);
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
      turnStatus.textContent = `${game.playerO.name}'s turn!`;
    // otherwise, O just went
    } else {
      game.turn = 'X'  // so change turn to X
      turnStatus.textContent = `${game.playerX.name}'s turn!`;
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
  if (winner === 'X') turnStatus.textContent = `${game.playerX.name} Wins!`;
  if (winner === 'O') turnStatus.textContent = `${game.playerO.name} Wins!`;
  clearInterval(timerID);
}

// function that starts a timer for the game
function startTimer() {
  let intervalID = setInterval(tick, 1000);
  let minutes = 0;
  let seconds = 0;

  function tick() {
    seconds++;
    // this is bad code, but it works
    if (minutes < 10) {
      if (seconds < 10) {
        timer.textContent = `Time: 0${minutes}:0${seconds}`;
      } else {
        timer.textContent = `Time: 0${minutes}:${seconds}`;
      }
    } else {
      if (seconds < 10) {
        timer.textContent = `Time: ${minutes}:0${seconds}`;
      } else {
        timer.textContent = `Time: ${minutes}:${seconds}`;
      }
    }
    if (seconds > 59) {
      minutes++;
      seconds = 0;
    }
  }
  return intervalID;
}