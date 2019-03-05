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
var params = {
  playerChoice: null,
  computerChoice: null,
  playerScore: 0,
  computerScore: 0,
  numberOfRounds: 0,
  progres: []
};

var moveButtons = document.querySelectorAll('.player-move');

function newGame() {
  activeButtons();
  toggleGameButtons();
  setNumberOfRounds();
  resetScore();
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

function activeButtons() {
  for (var i = 0; i < numberOfButtons; i++) {
    allButtons[i].disabled = false;
  }
}

function disableButtons() {
  for (var i = 0; i < numberOfButtons; i++) {
    allButtons[i].disabled = true;
  }
}

function setNumberOfRounds() {
  rounds = parseInt(window.prompt('How many rounds?'));
  if (isNaN(rounds) || rounds === '0' || rounds === '') {
    alert('Wrong value!');
  } else {
    params.playerScore = 0;
    params.computerScore = 0;
    params.numberOfRounds = rounds;
    
    output.innerHTML = '';
    score.innerHTML = '';
    
    document.querySelector('#scoreRounds').innerHTML = rounds + ' won rounds means victory.';
    activeButtons()
  }
};

function resetScore() {
  document.getElementById('playerScoreWins').innerHTML = params.playerScore = 0;
  document.getElementById('computerScoreWins').innerHTML = params.computerScore = 0;
}

function playerMove(choice) {
  params.playerChoice = choice;

  params.progress.push({
    //number of round
    numberOfRounds: params.numberOfRounds,
    // player move
    playerChoice: choice,
    // computer move
    computerChoice: params.computerChoice,
    // round score
    roundScore: params.playerScore + ' : ' + params.computerScore
  });

  // create <tr>
  var tr = document.createElement('tr');

  // create value <tr> - 4 x <td> with values
  var gameTableRows = '<td>' + params.numberOfRounds + 
  '</td><td>' + choice +'</td><td>' + params.computerChoice + '</td><td>' 
  + params.playerScore + ' : ' + params.computerScore + '</td>';

  // add to created <tr> var gameTableRows, that contains <td>
  tr.innerHTML = gameTableRows;
  // add <tr> to table - with every "move" , it will add new <tr>
  document.querySelector('#game-log tbody').appendChild(tr);
}

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

function checkRoundWinner() {
  rounds;
  if (params.playerChoice === params.computerChoice) {
    output.innerHTML = 'You made the same choice, so draw!';
  }
  
  if ((params.playerChoice === 'rock' && params.computerChoice === 'paper') || (params.playerChoice === 'paper' && params.computerChoice === 'scissors') || (params.playerChoice === 'scissors' && params.computerChoice === 'rock')) {
    output.innerHTML = "computer choose " + params.computerChoice + ", so you lost!";
    params.computerScore++;
    computerScoreOnBoard.innerHTML = params.computerScore;
  }
  if ((params.playerChoice === 'scissors' && params.computerChoice === 'paper') || (params.playerChoice === 'rock' && params.computerChoice === 'scissors') || (params.playerChoice === 'paper' && params.computerChoice === 'rock')) {
    output.innerHTML = "computer choose " + params.computerChoice + ", so you win!";
    params.playerScore++;
    playerScoreOnBoard.innerHTML = params.playerScore;
  }
  if (params.playerScore === rounds || params.computerScore === rounds ) {
    toggleGameButtons();
  
    if (rounds == params.playerScore) {
      disableButtons();
      // modal
      endGameModal('Winner winner chicken dinner !');
    }
    else if (rounds == params.computerScore) {
      disableButtons();
      //modal
      endGameModal('You have lost !');
    }}
};

newGameButton.addEventListener('click', newGame);
document.querySelector('.close').addEventListener('click', closeModal);

for (var i = 0; i < moveButtons.length;i++ ) {
  moveButtons[i].addEventListener('click', function() {
    computerMove();
    playerMove(this.getAttribute("data-move"));
    checkRoundWinner();
});

}