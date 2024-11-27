let currentPlayer = 'X'; // Comienza siempre con el jugador
let boardState = []; // Estado del tablero
let isPlayerTurn = true; // Controla si es el turno del jugador
let playerWins = 0; // Contador de victorias del jugador
let aiWins = 0; // Contador de victorias de la IA
let ties = 0; // Contador de empates

function buildGame(boardSize, difficulty) {
    const boardContainer = document.getElementById('board-container');
    boardContainer.innerHTML = ''; // Limpiar contenido previo

    // Crear el tablero
    const grid = document.createElement('div');
    grid.classList.add('grid');
    grid.style.gridTemplateColumns = `repeat(${boardSize}, 100px)`;
    grid.style.gridTemplateRows = `repeat(${boardSize}, 100px)`;

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
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
        console.error("Usuario no encontrado");
        return;
    }

    // Obtener las estadísticas del jugador desde localStorage
    let stats = JSON.parse(localStorage.getItem(currentUser)) || { playerWins: 0, aiWins: 0, ties: 0 };

    // Actualizar las estadísticas según el resultado
    if (winner === 'player') {
        stats.playerWins += 1;
    } else if (winner === 'ai') {
        stats.aiWins += 1;
    } else if (winner === 'tie') {
        stats.ties += 1;
    }

    // Guardar las estadísticas actualizadas en el localStorage
    localStorage.setItem(currentUser, JSON.stringify(stats));

    // Mostrar el mensaje de victoria o empate
    setGameStatus(winner === 'player' ? '¡Has ganado!' : winner === 'ai' ? '¡La IA ganó!' : '¡Es un empate!');

    // Reiniciar el juego después de un breve tiempo
    setTimeout(() => {
        buildGame(3, 'facil');  // Puedes pasar el tamaño del tablero y la dificultad como quieras
    }, 2000);
}

function getBestMove(board, currentPlayer, boardSize, difficulty) {
    const emptyCells = getEmptyCells(board);

    if (difficulty === 'medio') {
        for (let cell of emptyCells) {
            board[cell] = currentPlayer;
            if (checkWin(board, boardSize, currentPlayer)) {
                board[cell] = null; // Deshace el movimiento
                return cell; // Gana si puede
            }
            board[cell] = null;

            board[cell] = getOpponent(currentPlayer);
            if (checkWin(board, boardSize, getOpponent(currentPlayer))) {
                board[cell] = null; // Deshace el movimiento
                return cell; // Bloquea al jugador si está a punto de ganar
            }
            board[cell] = null;
        }
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    if (difficulty === 'dificil') {
        return getBestMove(board, 'O', boardSize, 'medio'); // Simulación intermedia para mejorar rendimiento
    }
}

function getEmptyCells(board) {
    return board.map((cell, index) => (cell === null ? index : null)).filter(index => index !== null);
}

function getOpponent(player) {
    return player === 'X' ? 'O' : 'X';
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

function loadStats() {
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
        console.error("Usuario no encontrado");
        return;
    }

    // Obtener las estadísticas del jugador desde localStorage
    const stats = JSON.parse(localStorage.getItem(currentUser)) || { playerWins: 0, aiWins: 0, ties: 0 };

    // Mostrar las estadísticas en el estado del juego
    const statusElement = document.getElementById('game-status');
    statusElement.innerHTML = `
        <p>Victorias del jugador: ${stats.playerWins}</p>
        <p>Victorias de la IA: ${stats.aiWins}</p>
        <p>Empates: ${stats.ties}</p>
    `;
}
