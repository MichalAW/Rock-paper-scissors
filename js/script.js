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
var settings = {
    playerChoice: null,
    computerChoice: null,
    playerScore: 0,
    computerScore: 0,
    setNumberOfRounds: 3,
};

function newGame() {
    activeButtons()
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
        settings.playerScore = 0;
        settings.computerScore = 0;

        output.innerHTML = '';
        score.innerHTML = '';

        document.querySelector('#scoreRounds').innerHTML = rounds + ' won rounds means victory.';
        activeButtons()
    }
};

function resetScore() {
    document.getElementById('playerScoreWins').innerHTML = settings.playerScore = 0;
    document.getElementById('computerScoreWins').innerHTML = settings.computerScore = 0;
}

function playerMove(choice) {
    settings.playerChoice = choice;
}

function computerMove() {
    var possibleMoves = ['rock', 'paper', 'scissors'];
    var index = Math.floor(Math.random() * 3);
    settings.computerChoice = possibleMoves[index];
};

function checkRoundWinner() {
    rounds;
    if (settings.playerChoice === settings.computerChoice) {
        output.innerHTML = 'You made the same choice, so draw!';
    }

    if ((settings.playerChoice === 'rock' && settings.computerChoice === 'paper') || (settings.playerChoice === 'paper' && settings.computerChoice === 'scissors') || (settings.playerChoice === 'scissors' && settings.computerChoice === 'rock')) {
        output.innerHTML = "computer choose " + settings.computerChoice + ", so you lost!";
        settings.computerScore++;
        computerScoreOnBoard.innerHTML = settings.computerScore;
    }
    if ((settings.playerChoice === 'scissors' && settings.computerChoice === 'paper') || (settings.playerChoice === 'rock' && settings.computerChoice === 'scissors') || (settings.playerChoice === 'paper' && settings.computerChoice === 'rock')) {
        output.innerHTML = "computer choose " + settings.computerChoice + ", so you win!";
        settings.playerScore++;
        playerScoreOnBoard.innerHTML = settings.playerScore;
    }
    if (settings.playerScore === rounds || settings.computerScore === rounds) {
        toggleGameButtons();

        if (rounds == settings.playerScore) {
            score.innerHTML = 'Winner winner chicken dinner !<br> Press "NEW GAME"';
            disableButtons();
        } else if (rounds == settings.computerScore) {
            score.innerHTML = 'You have lost !<br> Press "NEW GAME"';
            disableButtons();
        }
    }
};

newGameButton.addEventListener('click', newGame);
rockButton.addEventListener('click', function () {
    playerMove('rock');
    computerMove();
    checkRoundWinner();
});

paperButton.addEventListener('click', function () {
    playerMove('paper');
    computerMove();
    checkRoundWinner();
});

scissorsButton.addEventListener('click', function () {
    playerMove('scissors');
    computerMove();
    checkRoundWinner();
});