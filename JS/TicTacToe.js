function buildGame(boardSize, difficulty) {
    const gameContainer = document.getElementById('game-container');
    
    // Crear el tablero basado en el tamaño seleccionado
    const grid = document.createElement('div');
    grid.classList.add('grid');
    
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        grid.appendChild(cell);
    }
    
    gameContainer.appendChild(grid);

    // Lógica para manejar el turno de los jugadores
    let currentPlayer = 'X';  // 'X' siempre empieza
    let boardState = Array(boardSize * boardSize).fill(null);  // Estado del tablero (null = vacío)

    grid.addEventListener('click', function(event) {
        const cell = event.target;
        const index = parseInt(cell.dataset.index);

        if (boardState[index] !== null) return;  // Si la celda ya está ocupada, no hacer nada
        
        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        
        if (checkWin(boardState, currentPlayer)) {
            alert(`${currentPlayer} ganó!`);
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';  // Cambiar turno

        if (currentPlayer === 'O' && difficulty !== 'facil') {
            aiMove(boardState, boardSize, difficulty);  // Llamar a la IA si es el turno de 'O'
        }
    });

    // Función de la IA (para dificultad más alta se puede agregar más lógica)
    function aiMove(boardState, boardSize, difficulty) {
        let availableMoves = boardState.map((value, index) => value === null ? index : null).filter(index => index !== null);
        let move;
        
        if (difficulty === 'facil') {
            // Jugada aleatoria en "Fácil"
            move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        } else {
            // Lógica de dificultad media o difícil (puedes mejorar con más lógica de IA)
            move = availableMoves[0]; // Esto es solo un marcador, puedes implementar tu propia IA aquí
        }

        boardState[move] = 'O';
        document.querySelector(`[data-index="${move}"]`).textContent = 'O';

        if (checkWin(boardState, 'O')) {
            alert('¡La IA ganó!');
        }
    }

    // Función para verificar si hay un ganador
    function checkWin(boardState, player) {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
            [0, 4, 8], [2, 4, 6]             // Diagonales
        ];

        return winningCombos.some(combination => combination.every(index => boardState[index] === player));
    }
}
