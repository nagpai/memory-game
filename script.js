let player1 = {
      name: 'player1',
      score: 0,
    },

    player2 = {
      name: 'player2',
      score: 0,
    },

    gameState = {
      turn: 'player1',
      count: 0,
      winnerDeclared: false,
    };
  
  
let board = document.querySelectorAll('.block');
let commentary = document.querySelector('#commentary h3');
let gameGrid = document.getElementById('game-grid');
gameGrid.addEventListener('click', handleClick
);

function updateScore() {
  let scores = document.querySelectorAll('.score');
  scores[0].innerText = `Score: ${player1.score}`;
  scores[1].innerText = `Score: ${player2.score}`;
  }

  // start game
function startGame(){
    player1.score = 0;
    player2.score = 0; // reset score

    updateScore(); //update the display
    shuffleBoard(); //shuffle the board 
    commentary.innerText = "Let the games begin! \n Player 1 start!";

    //hide all cards with overlay
    let overlay = document.querySelectorAll('.overlay');
    overlay.forEach((x) => {
      x.style.opacity = 1;
    });
  }


function shuffleBoard() {

   //create a grid of  18 items repeated twice and shuffle it. Total array of 36 items. 
  let grid = Array.from(Array(18).keys());
  grid = grid.concat(grid);
  shuffleArray(grid);
  shuffleArray(grid);
  
  for (let i = 0; i < board.length; i++){
    let card = board[i].firstChild;
    card.src=`./img/sprites/${grid[i]}.png`;
  }
}

// Shuffle array function
function shuffleArray(array) {
let currentIndex = array.length;
let randomIndex, tempValue;

while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }
}
// allow first player to make two matches .. announce success or failure and count score.. toggle turns.. continue until sum of scores = 18

// set turn to player

function handleClick(event){
  let clickedCard = event.target;
  console.log(clickedCard);
  toggleOpacity(clickedCard);
}

function toggleOpacity(card){
  console.log(card.style.opacity === '0');
  card.hidden = true;
}

window.onload = startGame;
console.log('beep beep bop');