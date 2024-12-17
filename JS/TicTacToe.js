let currentPlayer = 'X'; // Comienza siempre con el jugador
let boardState = []; // Estado del tablero
let isPlayerTurn = true; // Controla si es el turno del jugador
let playerWins = 0; // Contador de victorias del jugador
let aiWins = 0; // Contador de victorias de la IA
let ties = 0; // Contador de empates
let totalGames = 0; // Contador de partidas jugadas
const maxGames = 3; // Número máximo de partidas

// Cargar skin seleccionada y aplicarla al tablero
function applyBoardSkin(grid) {
    const selectedSkin = localStorage.getItem('selectedSkin');
    if (selectedSkin) {
        grid.classList.add(selectedSkin); // Añade la clase de la skin seleccionada
    }
}

function buildGame(boardSize, difficulty) {
    const boardContainer = document.getElementById('board-container');
    boardContainer.innerHTML = ''; // Limpiar contenido previo

    // Crear el tablero
    const grid = document.createElement('div');
    grid.classList.add('grid');
    grid.style.gridTemplateColumns = `repeat(${boardSize}, 100px)`;
    grid.style.gridTemplateRows = `repeat(${boardSize}, 100px)`;

    // Aplicar la skin al tablero
    applyBoardSkin(grid);

    boardState = Array(boardSize * boardSize).fill(null); // Inicializar estado del tablero

    // Crear celdas
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;

        // Evento para manejar clics del jugador
        cell.addEventListener('click', function () {
            if (!isPlayerTurn) {
                setGameStatus('¡Espera tu turno!');
                return;
            }

            if (boardState[i] !== null) {
                setGameStatus('¡Esta casilla ya está ocupada!');
                return;
            }

            // Actualizar el estado y el tablero con la jugada del jugador
            boardState[i] = 'X';
            cell.textContent = 'X';

            // Verificar si el jugador ganó
            if (checkWin(boardState, boardSize, 'X')) {
                updateStats('player');
                return;
            }

            // Cambiar turno a la IA
            isPlayerTurn = false;
            setGameStatus('Turno de la IA...');
            setTimeout(() => aiMove(boardSize, difficulty), 500);
        });

        grid.appendChild(cell);
    }

    boardContainer.appendChild(grid);
    setGameStatus('¡Tu turno!');
}

function aiMove(boardSize, difficulty) {
    const availableMoves = getEmptyCells(boardState);

    if (availableMoves.length === 0) {
        updateStats('tie');
        return;
    }

    let move;
    if (difficulty === 'facil') {
        move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    } else if (difficulty === 'medio') {
        move = getBestMove(boardState, 'O', boardSize, 'medio');
    } else if (difficulty === 'dificil') {
        move = getBestMove(boardState, 'O', boardSize, 'dificil');
    }

    if (move === undefined) {
        updateStats('tie');
        return;
    }

    boardState[move] = 'O';
    const cell = document.querySelector(`[data-index="${move}"]`);
    cell.textContent = 'O';

    if (checkWin(boardState, boardSize, 'O')) {
        updateStats('ai');
        return;
    }

    isPlayerTurn = true; // Cambiar turno al jugador
    setGameStatus('¡Tu turno!');
}

function setGameStatus(message) {
    const status = document.getElementById('game-status');
    status.textContent = message;
}

function updateStats(winner) {
    if (winner === 'player') {
        playerWins++;
    } else if (winner === 'ai') {
        aiWins++;
    } else if (winner === 'tie') {
        ties++;
    }

    totalGames++;

    // Actualizar el marcador
    document.getElementById('player-score').textContent = playerWins;
    document.getElementById('ai-score').textContent = aiWins;
    document.getElementById('ties-score').textContent = ties;

    // Mostrar el mensaje de victoria o empate
    setGameStatus(
        winner === 'player' ? '¡Has ganado!' :
        winner === 'ai' ? '¡La IA ganó!' :
        '¡Es un empate!'
    );

    // Revisar si se alcanzó el máximo de partidas
    if (totalGames >= maxGames) {
        setTimeout(endGame, 2000); // Finalizar el juego después de un breve tiempo
    } else {
        // Reiniciar el juego después de un breve tiempo
        setTimeout(() => {
            buildGame(3, 'facil'); // Puedes pasar el tamaño del tablero y la dificultad como quieras
        }, 2000);
    }
}

function endGame() {
    const boardContainer = document.getElementById('board-container');
    boardContainer.innerHTML = `
        <h3>Resultados Finales</h3>
        <p>Victorias del jugador: ${playerWins}</p>
        <p>Victorias de la IA: ${aiWins}</p>
        <p>Empates: ${ties}</p>
        <button id="back-to-menu" class="btn btn-primary">Volver al Menú</button>
    `;

    document.getElementById('back-to-menu').addEventListener('click', () => {
        window.location.href = '../HTML/menu.html'; // Cambiar por la ruta correcta al menú
    });
}

function getEmptyCells(board) {
    return board.map((cell, index) => (cell === null ? index : null)).filter(index => index !== null);
}

function checkWin(boardState, size, player) {
    const winPatterns = getWinPatterns(size);

    return winPatterns.some(pattern =>
        pattern.every(index => boardState[index] === player)
    );
}

function getWinPatterns(boardSize) {
    const patterns = [];
    const rows = [...Array(boardSize).keys()];

    rows.forEach(row => {
        patterns.push(rows.map(col => row * boardSize + col)); // Filas
        patterns.push(rows.map(col => col * boardSize + row)); // Columnas
    });

    patterns.push(rows.map(i => i * (boardSize + 1))); // Diagonal principal
    patterns.push(rows.map(i => (i + 1) * (boardSize - 1))); // Diagonal secundaria

    return patterns;
}
