let boardSize = null;
let difficulty = null;

function selectBoardSize(size) {
    boardSize = size;
    document.querySelector('#board-size').style.display = 'none'; // Ocultar selección de tablero
    document.querySelector('#difficulty').style.display = 'block'; // Mostrar selección de dificultad
}

function selectDifficulty(level) {
    difficulty = level;
    document.querySelector('#playButton').style.display = 'inline-block'; // Mostrar botón "Jugar"
}

function startGame() {
    if (boardSize && difficulty) {
        // Redirige al TicTacToe.html con los parámetros de tamaño de tablero y dificultad
        const url = `tictactoe.html?boardSize=${boardSize}&difficulty=${difficulty}`;
        console.log(`Redirigiendo a: ${url}`); // Para depuración
        window.location.href = url;
    } else {
        alert("Por favor, selecciona tanto el tamaño del tablero como la dificultad.");
    }
}
