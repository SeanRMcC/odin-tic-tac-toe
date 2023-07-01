const cells = document.querySelectorAll(".cell");
const p1Div = document.querySelector("#first-player");
const p2Div = document.querySelector("#second-player");
const restartButton = document.querySelector(".restart-button");
const winnerDiv = document.querySelector(".winner");

const gameBoard = (function (){
    const board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]; 
    
    const canPlace = (row, col) => {
        return board[row][col] === ' ';
    };

    const place = (row, col, piece) => {
        board[row][col] = piece;
    };

    const verticalWin = piece => {
        for(let col = 0; col < board[0].length; col++){
            if(board[0][col] === piece && board[1][col] === piece && board[2][col] === piece){
                return true;
            }
        }
        return false;
    };

    const horizontalWin = piece => {
        for(let row = 0; row < board[0].length; row++){
            if(board[row][0] === piece && board[row][1] === piece && board[row][2] === piece){
                return true;
            }
        }
        return false;
    };

    const diagonalWin = piece => {
        return (board[0][0] === piece && board[1][1] === piece && board[2][2] === piece) || (board[2][0] === piece && board[1][1] === piece && board[0][2] === piece);
    };

    const isWinnerFor = piece => {
        return verticalWin(piece) || horizontalWin(piece) || diagonalWin(piece);
    };

    const isTie = () => {
        for(let r = 0; r < board.length; r++){
            for(let c = 0; c < board[r].length; c++){
                if(board[r][c] === ' '){
                    return false;
                }
            }
        }
        return true;
    };

    const clear = () => {
        for(let r = 0; r < board.length; r++){
            for(let c = 0; c < board[r].length; c++){
                board[r][c] = ' ';
            }
        }
    };

    return {board, canPlace, place, isWinnerFor, isTie, clear};

})();

const game = (function () {
    let over = false;
    let currPiece = 'X';
    const togglePiece = () => {
        if(currPiece === 'X'){
            currPiece = 'O';
            p1Div.classList.remove("turn");
            p2Div.classList.add("turn");
        }else{
            currPiece = 'X';
            p2Div.classList.remove("turn");
            p1Div.classList.add("turn");
        }
    };

    return {over, currPiece, togglePiece};
})();

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        if(!game.won && gameBoard.canPlace(row, col)){
            console.log(game);
            cell.textContent = game.currPiece;
            gameBoard.place(row, col, game.currPiece);
            if(gameBoard.isWinnerFor(game.currPiece)){
                game.over = true;
                restartButton.classList.add("restart-button-revealed");
                winnerDiv.textContent = `Winner is ${game.currPiece}!`;
            }else if(gameBoard.isTie()){
                game.over = true;
                restartButton.classList.add("restart-button-revealed");
                winnerDiv.textContent = "Its a tie!";
            }else{
                game.togglePiece();
                if(game.currPiece === 'X'){
                    game.currPiece = 'O';
                }else{
                    game.currPiece = 'X';
                }
            }
        }
    });
});

function clearGrid(){
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

restartButton.addEventListener("click", () => {
    restartButton.classList.remove("restart-button-revealed");
    gameBoard.clear();
    winnerDiv.textContent = '';
    game.over = false;
    game.currPiece = 'X';
    p1Div.classList.add("turn");
    p2Div.classList.remove("turn");
    clearGrid();
});
