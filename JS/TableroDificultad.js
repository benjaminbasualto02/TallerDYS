let boardSize = null;
let difficulty = null;

function selectBoardSize(size) {
    boardSize = size;
    document.querySelector('#board-size').style.display = 'none';  // Ocultar selección de tablero
    document.querySelector('#difficulty').style.display = 'block';  // Mostrar selección de dificultad
}

function selectDifficulty(level) {
    difficulty = level;
    document.querySelector('#playButton').style.display = 'inline-block';  // Mostrar botón "Jugar"
}

function startGame() {
    if (boardSize && difficulty) {
        // Redirige al TicTacToe.html con los parámetros de tamaño de tablero y dificultad
        window.location.href = `TicTacToe.html?boardSize=${boardSize}&difficulty=${difficulty}`;
    } else {
        alert("Por favor, selecciona tanto el tablero como la dificultad.");
    }
}
