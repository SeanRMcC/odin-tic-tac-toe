const cells = document.querySelectorAll(".cell");
const p1Div = document.querySelector("#first-player");
const p2Div = document.querySelector("#second-player");

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

    return {board, canPlace, place, isWinnerFor};

})();

const playerFactory = (name, piece) => {
    return {name, piece};
};

const game = (function () {
    return 1;
})();
