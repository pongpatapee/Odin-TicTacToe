const DIM = 3;

const display = (function() {
    const contentDiv = document.querySelector('.content');
    const displayDiv = document.createElement('div');
    displayDiv.setAttribute('id', 'display');

    function init() {
        for(let r = 0; r < DIM; r++){
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('row')
            for(let c = 0; c < DIM; c++){
                const boardDiv = document.createElement('div');
                boardDiv.setAttribute('id', `${r}-${c}`); 
                boardDiv.classList.add('board-piece')
                rowDiv.appendChild(boardDiv);
            }
            displayDiv.appendChild(rowDiv);
        }
        contentDiv.appendChild(displayDiv);
    }


    function render(gameboard) {
        let board = gameboard.getBoard();
        for(let r = 0; r < board.length; r++){
            for(let c = 0; c < board[0].length; c++){
                let position = document.getElementById(`${r}-${c}`);
                position.innerText = board[r][c];
            }
        }
    }

    init();

    return {render};
})();

const playerCreator = (function(sign, isComputer) {
    function playNextMove() {
        if(isComputer) {

        } else {
            // person Move
        }
    }
    
    function getSign() {
        return sign;
    }

    return {getSign, playNextMove};
});

const gameboard = (function() {
    let board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];

    function getBoard() {
        return board;
    }

    function reset() {
        for(let r = 0; r < DIM; r++){
            for(let c = 0; c < DIM; c++){
                board[r][c] = ' ';
            }
        }
    }


    return {getBoard, reset};

})();

const gameLogic = (function() {
    let players = [playerCreator('X', false), playerCreator('O', false)];
    let turn = 0;
    let currentPlayer = players[turn];
    let board = gameboard.getBoard();
    let gameState = 'playing';

    function bindClick() {
        for(let r = 0; r < DIM; r++){
            for(let c = 0; c < DIM; c++){
                let position = document.getElementById(`${r}-${c}`);
                position.addEventListener('click', performNextMove);
            }
        }
    }

    function performNextMove(e) {
        if(gameState != 'playing'){
            console.log('game state is no longer playing');
            return;
        }
        let position = e.target.id.split('-');
        let r = position[0];
        let c = position[1];
        if(board[r][c] == ' '){
            board[r][c] = currentPlayer.getSign();
            turn = (turn + 1) % 2;
        } else {
            alert('Error! spot is already filled');
        }
        currentPlayer = players[turn];
        display.render(gameboard);

        if(hasGameEnded()) {
            console.log('game ended');
            console.log(gameState);
        }
    }

    function hasGameEnded() {
        if(boardIsFull() && !hasWon()){
            gameState = 'tie';
            return true;
        }
        else if(hasWon()){
            gameState = 'won';
            return true;
        }

        return false;
    }

    function boardIsFull() {
        for(let r = 0; r < DIM; r++){
            if(board[r].includes(' ')){
                return false;
            }
        }

        return true;
    }

    function hasWon() {
        return (hasDiagnals() || hasHorizontal() || hasVertical());
    }

    function hasDiagnals() {
        if(board[0][0] != ' ' && board[0][0] == board[1][1] && board[1][1] == board[2][2]){
            return true;
        }

        if(board[0][2] != ' ' && board[0][2] == board[1][1] && board[1][1] == board[2][0]){
            return true;
        }

        return false;
    }

    function hasHorizontal() {
        for(let r = 0; r < DIM; r++){
            if(board[r][0] != ' ' && board[r][0] == board[r][1] && board[r][1] == board[r][2]) {
                return true;
            }
        }

        return false;
    }

    function hasVertical() {
        for(let c = 0; c < DIM; c++){
            if(board[0][c] != ' ' && board[0][c] == board[1][c] && board[1][c] == board[2][c]) {
                return true;
            }
        }

        return false;
    }

    bindClick();

    display.render(gameboard);

})();



//running on window
// display;


