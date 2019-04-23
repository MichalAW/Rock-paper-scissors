'use strict'
var newGameButton = document.getElementById("newGameButton");
var rockButton = document.getElementById('rock-button');
var paperButton = document.getElementById('paper-button');
var scissorsButton = document.getElementById('scissors-button');
var output = document.getElementById('score-output');
var playerScoreOnBoard = document.getElementById('playerScoreWins');
var computerScoreOnBoard = document.getElementById('computerScoreWins');
var output = document.getElementById('output');
var score = document.getElementById('scoreRounds');
var result = document.getElementById('result');
var allButtons = document.getElementsByClassName('btn'); 
//var allButtons = [rockButton, paperButton, scissorsButton];
var numberOfButtons = allButtons.length;
var rounds;
var tableBody = document.querySelector('#game-log tbody');
var params = {
  playerChoice: null,
  computerChoice: null,
  playerScore: 0,
  computerScore: 0,
  numberOfRounds: 0,
  currentComputerScore: 0,
  currentPlayerScore: 0,
  progres: []
};

var moveButtons = document.querySelectorAll('.player-move');

function newGame() {
  disableActiveButton(false);
  toggleGameButtons();
  setNumberOfRounds();
  resetScore();
  // added
  clearScoreTable();
}

function toggleGameButtons() {
  var boxWithGame = document.getElementById("show");
  var loadedDisplayStyleForBoxWithGame = window.getComputedStyle(boxWithGame, null).getPropertyValue("display");

  if (loadedDisplayStyleForBoxWithGame === "none") {
    boxWithGame.style.display = "block";
  } else {
    boxWithGame.style.display = "none";
  }
}

function disableActiveButton(booleanVal) {
  for (var i = 0; i < numberOfButtons; i++) {
    allButtons[i].disabled = booleanVal;
  }
}

function setNumberOfRounds() {
  rounds = parseInt(window.prompt('How many rounds?'));
  if (isNaN(rounds) || rounds === '0' || rounds === '') {
    alert('Wrong value!, please refresh site');
  } else {
    params.playerScore = 0;
    params.computerScore = 0;
    params.numberOfRounds = rounds;
    
    output.innerHTML = '';
    score.innerHTML = '';
    
    document.querySelector('#scoreRounds').innerHTML = rounds + ' won rounds means victory.';
    // activeButtons()
    disableActiveButton(false);
  }
};

function resetScore() {
  document.getElementById('playerScoreWins').innerHTML = params.playerScore = 0;
  document.getElementById('computerScoreWins').innerHTML = params.computerScore = 0;
}

function clearScoreTable() {
  params.progres = [];
  tableBody.innerHTML = '';
}
//create table
function scoreTable() {
  var numberOfParamsProgres = params.progres.length;

  for (var i = 0; i < numberOfParamsProgres; i++) {
    var tr = document.createElement('tr');

    Object.keys(params.progres[i]).forEach(key => {
      var value = params.progres[i][key];
      var td = document.createElement('td');
      
      td.innerHTML = value;
      tr.appendChild(td);
    });
  }
  tableBody.appendChild(tr);
}

function playerMove(choice) {
  params.playerChoice = choice;
  setGameScore();

  params.progres.push({
    numberOfRounds: params.progres.length + 1,
    playerChoice: choice,
    computerChoice: params.computerChoice,
    roundScore: params.currentPlayerScore + ' : ' + params.currentComputerScore,
    gameScore: params.playerScore + ' : ' + params.computerScore
  });

};

function computerMove() {
  var possibleMoves = ['rock', 'paper', 'scissors'];
  var index = Math.floor(Math.random() * 3);
  params.computerChoice = possibleMoves[index];
};

function endGameModal(text) {
  document.querySelector('.overlay').classList.add('show');
  document.querySelector('.modal').classList.add('show');
  document.querySelector('.modal header').innerHTML = text;
}

function closeModal() {
  document.querySelector('.overlay').classList.remove('show');
  document.querySelector('.modal').classList.remove('show');
}

// added
function setGameScore() {
  if (params.playerChoice === params.computerChoice) {
    output.innerHTML = 'You made the same choice, so draw!';
    params.currentComputerScore = 0;
    params.currentPlayerScore = 0;
  }

  if ((params.playerChoice === 'rock' && params.computerChoice === 'paper') || (params.playerChoice === 'paper' && params.computerChoice === 'scissors') || (params.playerChoice === 'scissors' && params.computerChoice === 'rock')) {
    output.innerHTML = "computer choose " + params.computerChoice + ", so you lost!";
    params.currentComputerScore = 1;
    params.currentPlayerScore = 0;

    params.computerScore++;
    computerScoreOnBoard.innerHTML = params.computerScore;
  }
  
  if ((params.playerChoice === 'scissors' && params.computerChoice === 'paper') || (params.playerChoice === 'rock' && params.computerChoice === 'scissors') || (params.playerChoice === 'paper' && params.computerChoice === 'rock')) {
    output.innerHTML = "computer choose " + params.computerChoice + ", so you win!";
    params.currentComputerScore = 0;
    params.currentPlayerScore = 1;

    params.playerScore++;
    playerScoreOnBoard.innerHTML = params.playerScore;
  }
}

function checkRoundWinner() {
  if (params.playerScore === rounds || params.computerScore === rounds ) {
    toggleGameButtons();
  
    if (rounds == params.playerScore) {
      disableActiveButton(true);
      // modal
      endGameModal('Winner winner chicken dinner !');
    }
    else if (rounds == params.computerScore) {
      disableActiveButton(true);
      //modal
      endGameModal('You have lost !');
    }}
};

newGameButton.addEventListener('click', newGame);
document.querySelector('.close').addEventListener('click', closeModal);

var numberOfMoveButtons = moveButtons.length

for (var i = 0; i < numberOfMoveButtons; i++ ) {
  moveButtons[i].addEventListener('click', function() {
    computerMove();
    playerMove(this.getAttribute("data-move"));
    checkRoundWinner();
    scoreTable();
  });
};
