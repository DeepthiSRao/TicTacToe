const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winning-message');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartBtn = document.getElementById('resetButton');

const CIRCLE_CLASS = 'circle';
const X_CLASS = 'x';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let circleTurn;

startGame();

function startGame(){
    circleTurn = false;
    cellElements.forEach(cell =>{
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);    
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

restartBtn.addEventListener('click', startGame);

function handleClick(e){
    /**
     *  1. Place Mark
     *  2. Check for win
     *  3. Check for Draw
     *  4. Switch turns
     */
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMarker(cell, currentClass);

    if(checkWin(currentClass)){
        endGame(false);
    }else if(isDraw()){
        endGame(true);
    }else{
        swapTurns();
        setBoardHoverClass();
    }  
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS);
    })
}

function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = "Draw!";
    }else{
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    }
    winningMessageElement.classList.add('show')
}

function placeMarker(cell, currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    circleTurn = !circleTurn;
}

function setBoardHoverClass(){
    board.classList.remove(CIRCLE_CLASS);
    board.classList.remove(X_CLASS);

    circleTurn 
    ? board.classList.add(CIRCLE_CLASS)
    : board.classList.add(X_CLASS);
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass);
        })
    })
}