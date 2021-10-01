import { board, checkWinner, clearBoard, move } from './gameBoardLogic';
import { bestMove } from './minimax';
import { Player } from './player';
import './style.css';

const container = document.getElementById('game-board-container');
const playerVsPlayerButton = document.getElementById('player-mode-button');
const playerVsComputerButton = document.getElementById('ai-mode-button');
const playAgainButton = document.getElementById('restart-button');

const playerOneScoreContainer = document.getElementById('player-one-score');
const playerTwoScoreContainer = document.getElementById('player-two-score');

let playerOne;
let playerTwo;

let currentPlayerSymbol = null;
let isVersusComputer = false;

const init = () => {
    clearBoard();
    resetButtonColor();
    container.style.setProperty('grid-template-columns', `repeat(3, 1fr)`);
    container.style.setProperty('grid-template-rows', `repeat(3, 1fr)`);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j< 3; j++) {
            const block = document.createElement('div');
            block.classList.add('block');
            block.setAttribute('data-row', i);
            block.setAttribute('data-col', j);
            block.addEventListener('click', () => {
                if (currentPlayerSymbol != null && move(i, j, currentPlayerSymbol)) {
                    endTurn();

                    if (isVersusComputer) {
                        bestMove(playerOne.getSymbol(), playerTwo.getSymbol());
                        endTurn();
                    }
                }
            });
            container.appendChild(block);
        }   
    }
    playAgainButton.style.visibility = 'hidden';
    Math.floor(Math.random() * 2) == 0 ? currentPlayerSymbol = 'X' : currentPlayerSymbol = 'O';
}

const initButtons = () => {
    playerVsPlayerButton.addEventListener('click', () => playerVsPlayerMode());
    playerVsComputerButton.addEventListener('click', () => playerVsComputerMode());

    playAgainButton.addEventListener('click', () => reset());
}

const playerVsPlayerMode = () => {
    isVersusComputer = false;
    playerOne = Player('Player 1', 'X');
    playerTwo = Player('Player 2', 'O');

    document.getElementById("player-one-title").textContent = playerOne.getName() + ' (' + playerOne.getSymbol() + ')';
    document.getElementById("player-two-title").textContent = playerTwo.getName() + ' (' + playerTwo.getSymbol() + ')';
    reset();
    activeButtonColor(playerVsPlayerButton);
}

const playerVsComputerMode = () => {
    isVersusComputer = true;
    playerOne = Player('Human', 'X');
    playerTwo = Player('Computer', 'O');

    document.getElementById("player-one-title").textContent = playerOne.getName() + ' (' + playerOne.getSymbol() + ')';
    document.getElementById("player-two-title").textContent = playerTwo.getName() + ' (' + playerTwo.getSymbol() + ')';
    reset();
    activeButtonColor(playerVsComputerButton);

    if (currentPlayerSymbol == playerTwo.getSymbol()) {
        bestMove(playerOne.getSymbol(), playerTwo.getSymbol());
        endTurn();
    }
}   

const activeButtonColor = (button) => {
    button.style.backgroundColor = '#000000';
    button.style.color = '#ffffff';
}

const endTurn = () => {
    const winner = checkWinner();
    if (winner != null) {
        declareWinner(winner);
    } else {
        switchPlayers();
        render();
    }
}

const switchPlayers = () => {
    currentPlayerSymbol == 'X' ? currentPlayerSymbol = 'O' : currentPlayerSymbol = 'X';
}

const render = () => {
    updateScoreBoard();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const block = document.querySelector(`.block[data-row="${i}"][data-col="${j}"]`);
            block.innerHTML = board[i][j];
        }
    }
}

const updateScoreBoard = () => {
    playerOneScoreContainer.textContent = playerOne.getScore();
    playerTwoScoreContainer.textContent = playerTwo.getScore();
}

const declareWinner = (winner) => {
    document.getElementById("restart-button").style.visibility = "visible";
    if (winner.symbol == playerOne.getSymbol()) {
        playerOne.winRound();
        highlight(winner.type, winner.index);
    } else if (winner.symbol == playerTwo.getSymbol()) {
        playerTwo.winRound();
        highlight(winner.type, winner.index);
    } else {
        highlight(winner.type);
    }
    currentPlayerSymbol = null;
}

const highlight = (direction, indicator) => {
    switch (direction) {
        case 'row':
            highlightRow(indicator);
            break;
        case 'column':
            highlightColumn(indicator);
            break;
        case 'diagonal':
            highlightDiagonal(indicator);
            break;
        case 'tie':
            highlightBoard();
            break;
    }
    render();
};

const highlightBoard = () => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const block = document.querySelector(`.block[data-row="${i}"][data-col="${j}"]`);
            block.style.backgroundColor = "lightgrey";
        }
    }
}

const highlightRow = (row) => {
    for (let i = 0; i < 3; i++) {
        const block = document.querySelector(`.block[data-row="${row}"][data-col="${i}"]`);
        block.style.backgroundColor = "yellow";
    }
};
const highlightColumn = (col) => {
    for (let i = 0; i < 3; i++) {
        const block = document.querySelector(`.block[data-row="${i}"][data-col="${col}"]`);
        block.style.backgroundColor = "yellow";
    }
};
const highlightDiagonal = (isForward) => {
    if (isForward) {
        for (let i = 0; i < 3; i++) {
            const block = document.querySelector(`.block[data-row="${i}"][data-col="${i}"]`);
            block.style.backgroundColor = "yellow";
        }
    } else {
        for (let i = 0; i < 3; i++) {
            const block = document.querySelector(`.block[data-row="${2 - i}"][data-col="${i}"]`);
            block.style.backgroundColor = "yellow";
        }
    }
}

const resetButtonColor = () => {
    playerVsPlayerButton.style.backgroundColor = '#f0f0f0';
    playerVsPlayerButton.style.color = '#000000';

    playerVsComputerButton.style.backgroundColor = '#f0f0f0';
    playerVsComputerButton.style.color = '#000000';
}

const reset = () => {
    container.innerHTML = "";
    init();
    render();
}   

init();
initButtons();