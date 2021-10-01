import { board, move, checkWinner, clearSpace } from './gameBoard';

const scores = {
    X: -10,
    O: 10,
    tie: 0
}

const bestMove = (humanSymbol, computerSymbol) => {
    let bestScore = -Infinity;
    let coord;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (move(i, j, computerSymbol)) {
                let score = minimax(0, false, humanSymbol, computerSymbol);
                clearSpace(i, j);
                if (score > bestScore) {
                    bestScore = score;
                    coord = {row: i , col: j};
                }
            }
        }
    }
    move(coord.row, coord.col, computerSymbol);
}

const minimax = (depth, isMaximizing, humanSymbol, computerSymbol) => {
    let result = checkWinner();
    if (result != null) {
        return scores[result.symbol];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (move(i, j, computerSymbol)) {
                    let score = minimax(depth + 1, false, humanSymbol, computerSymbol);
                    clearSpace(i, j);
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (move(i, j, humanSymbol)) {
                    let score = minimax(depth + 1, true, humanSymbol, computerSymbol);
                    clearSpace(i, j);
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}

export { bestMove };
