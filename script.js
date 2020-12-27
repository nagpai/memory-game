// Objects to track player and Game states

let player1 = {
      name: 'Player 1',
      score: 0,
    },

    player2 = {
      name: 'Player 2',
      score: 0,
    },

    gameState = {
      turn: 'player1',
      count: 0,
      winnerDeclared: false,
      selections: [],
      toggleTurn: function() {
        (this.turn === 'player1') ? this.turn = 'player2' : this.turn = 'player1';
      },
    }
    
let blocks = document.querySelectorAll('.block');
let commentary = document.querySelector('#commentary h3');
let overlay = document.querySelectorAll('.overlay');
blocks.forEach((x) => x.addEventListener('click', handleClick));

// Update score display
function updateScore() {
  let scores = document.querySelectorAll('.score');
  scores[0].innerText = `Score: ${player1.score}`;
  scores[1].innerText = `Score: ${player2.score}`;
  }

// Start game
function startGame(){
    //Reset scores
    player1.score = 0;
    player2.score = 0; 

    //Initiate game state
    gameState.turn = 'player1';
    gameState.count = 0;
    gameState.winnerDeclared = false;

    updateScore(); //update the score display
    shuffleBoard(); //shuffle the board 
    commentary.innerText = 'Let the games begin! \n Player 1 start!';

    //hide all cards with overlay
    let overlay = document.querySelectorAll('.overlay');
    blocks.forEach((x) => resetBlock(x));
  }

// Hide a specified block  
function resetBlock(block) {
    const overlay = block.lastChild;
    overlay.style.visibility = 'visible';
    overlay.style.backgroundColor = 'blue';
    overlay.style.opacity = 1;
}

//Create a new shuffled board
function shuffleBoard() {
   // Create a grid of  18 items repeated twice and shuffle it. Total array of 36 items. 
  let grid = Array.from(Array(18).keys());
  grid = grid.concat(grid);
  shuffleArray(grid);
  shuffleArray(grid); // Shuffle twice just like we do with cards. Once is not enough ;)
  
  // Assign images to each block in the game grid
  for (let i = 0; i < blocks.length; i++){
    let block = blocks[i].firstChild;
    block.src=`./img/sprites/${grid[i]}.png`;
  }
}

// Shuffle array function - Fisher Yates algorithm
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

// Click event handler
function handleClick(event){
  let selectedBlock = event.currentTarget;
  let overlay = selectedBlock.lastChild;

  // Function to set block color depending on the player clicking it
  let setOverlay = function(overlay,color){
    overlay.style.backgroundColor = color;
    overlay.style.opacity = 0.6;
    gameState.selections.push({
      img: selectedBlock.firstChild.src,
      blockId: selectedBlock.id,
    });
  }

  switch (gameState.turn) {
    // If it is player 1
    case 'player1' : {
      switch (gameState.count) {
        case 0 : {
          setOverlay(overlay,'magenta');
          commentary.innerText = `Hiya, ${gameState.turn}, nice choice! Select another card.`;
          gameState.count++;
          break;
        }

        case 1 : {
          setOverlay(overlay,'magenta');
          checkAnswer(player1);
          break;
        }
      }
      break;
    }

    // If it is player 2
    case 'player2': {
      switch (gameState.count) {
        case 0 : {
          setOverlay(overlay,'green');
          commentary.innerText = `Hiya, ${gameState.turn}, nice choice! Select another card.`;
          gameState.count++;
          break;
        }

        case 1 : {
          setOverlay(overlay,'green');
          checkAnswer(player2);
          break;
        }
      }
      break;
    }

  }

}

// Check if selections match
function checkAnswer(player) {
  if(gameState.selections[0].img === gameState.selections[1].img){
    // Matching blocks found!
    commentary.innerText = `Excellent, ${player.name}!, You score a point!`
    //increase score by 1
    player.score++;
    updateScore();
    gameState.toggleTurn();
    gameState.selections = [];
    gameState.count = 0;
    // Check if winner
    if ((player1.score + player2.score) === 18){
      // If yes - announce and conclude game
      if( player1.score === player2.score ) {
        commentary.innerText = `Congratulations ${player1.name} and ${player2.name}. You both win!`
      } else if ( player1.score > player2.score ) {
        commentary.innerText = `Congratulations, ${player1.name}, you win!`
      } else {
        commentary.innerText = `Congratulations, ${player2.name}, you win!`
      }
      blocks.forEach((x) => x.removeEventListener('click', handleClick));
    }
    // If no, change turn to other player
  } else {
    commentary.innerText = `Sorry, ${player.name}, \nyour cards do not match! Next Player!`
    // hide the selected blocks again after 1 second
    setTimeout(function () {gameState.selections.forEach((x) => {
      let id = x.blockId;
      let unBlock = document.getElementById(id);
      resetBlock(unBlock);
      gameState.selections = [];
      gameState.count = 0;
    })}, 1000);
    // change the turn to other player
    gameState.toggleTurn();
  }
}

window.onload = startGame;
console.log('beep beep bop');