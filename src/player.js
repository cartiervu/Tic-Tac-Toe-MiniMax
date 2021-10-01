const Player = (name, symbol) => {
    let score = 0;
    const getName = () => name;
    const getSymbol = () => symbol;
    const getScore = () => score;
    const winRound = () => score++;
    const reset = () => score = 0;
    return {getName, getSymbol, getScore, winRound, reset};
}

export { Player } 