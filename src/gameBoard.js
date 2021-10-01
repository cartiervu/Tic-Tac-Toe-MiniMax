let board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

const move = (row, col, playerSymbol) => {
    if (board[row][col] == ' ') {
        board[row][col] = playerSymbol;
        return true;
    } else {
        return false;
    }
}

const checkWinner = () => {
    let winner = null;
    
    // ROWS
    for (let i = 0; i < 3; i++) {
        if (board[i][0] != ' ' && (board[i][0] == board[i][1] && board[i][1] == board[i][2])) {
                return winner = {type: 'row', index: i, symbol: board[i][0]};
        }
    }

    // COLUMNS
    for (let i = 0; i < 3; i++) {
        if (board[0][i] != ' ' && (board[0][i] == board[1][i] && board[1][i] == board[2][i])) {
                return winner = {type: 'column', index: i, symbol: board[0][i]};
        }
    }

    // DIAGONAL
    if (board[0][0] != ' ' && (board[0][0] == board[1][1] && board[1][1] == board[2][2])) {
        return winner = {type: 'diagonal', index: true, symbol: board[0][0]};
    }

    // REVERSE DIAGONAL
    if (board[0][2] != ' ' && (board[0][2] == board[1][1] && board[1][1] == board[2][0])) {
        return winner = {type: 'diagonal', index: false, symbol: board[0][2]};
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == ' ') {
                return null;
            }
        }
    }

    return winner = {type: 'tie', symbol: 'tie'};
}

const clearSpace = (row, col) => {
    board[row][col] = ' ';
}

const clearBoard = () => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            clearSpace(i, j);
        }
    }
}


export { board, move, checkWinner, clearSpace, clearBoard };