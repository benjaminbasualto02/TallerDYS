document.addEventListener("DOMContentLoaded", function () {
    const boardContainer = document.getElementById("board-container");
    const modal = new bootstrap.Modal(document.getElementById("boardSizeModal"));
    const player1ScoreElement = document.getElementById("player1-score");
    const player2ScoreElement = document.getElementById("player2-score");
    const tiesScoreElement = document.getElementById("ties-score");
    const gameStatus = document.getElementById("game-status");
    const backToMenuButton = document.getElementById("backToMenu");

    let player1Score = 0;
    let player2Score = 0;
    let tiesScore = 0;
    let roundCount = 0;
    const maxRounds = 3;
    let currentPlayer = "Player 1";
    let boardSize = 3;
    let boardState = [];

    // Construir el tablero según el tamaño seleccionado
    function buildBoard(size) {
        boardContainer.innerHTML = "";
        boardState = Array(size * size).fill(null);
        const board = document.createElement("div");
        board.className = "grid";
        board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

        for (let i = 0; i < size * size; i++) {
            const cell = document.createElement("div");
            cell.className = "cell border text-center";
            cell.dataset.index = i;
            cell.addEventListener("click", handleCellClick, { once: true });
            board.appendChild(cell);
        }

        boardContainer.appendChild(board);
        gameStatus.textContent = `Turno de: ${currentPlayer}`;
    }

    // Manejar clics en las celdas
    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = parseInt(cell.dataset.index);

        if (currentPlayer === "Player 1") {
            cell.textContent = "X";
            cell.classList.add("player1");
            boardState[cellIndex] = "X";
            currentPlayer = "Player 2";
        } else {
            cell.textContent = "O";
            cell.classList.add("player2");
            boardState[cellIndex] = "O";
            currentPlayer = "Player 1";
        }

        if (checkWinner()) {
            const winner = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
            updateScores(winner);
            return;
        } else if (isTie()) {
            tiesScore++;
            updateScores();
            return;
        }

        gameStatus.textContent = `Turno de: ${currentPlayer}`;
    }

    // Comprobar si hay un ganador
    function checkWinner() {
        const patterns = generateWinningPatterns(boardSize);

        for (const pattern of patterns) {
            const matches = pattern.map(index => boardState[index]);
            const allEqual = matches.every(val => val && val === matches[0]);

            if (allEqual) {
                gameStatus.textContent = `¡${matches[0]} gana esta ronda!`;
                return true;
            }
        }
        return false;
    }

    // Comprobar si hay empate
    function isTie() {
        return boardState.every(cell => cell !== null);
    }

    // Generar patrones ganadores según el tamaño del tablero
    function generateWinningPatterns(size) {
        const patterns = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            const col = [];
            for (let j = 0; j < size; j++) {
                row.push(i * size + j);
                col.push(j * size + i);
            }
            patterns.push(row, col);
        }
        const diag1 = [];
        const diag2 = [];
        for (let i = 0; i < size; i++) {
            diag1.push(i * size + i);
            diag2.push((i + 1) * size - (i + 1));
        }
        patterns.push(diag1, diag2);
        return patterns;
    }

    // Actualizar puntajes y rondas
    function updateScores(winner) {
        if (winner === "Player 1") {
            player1Score++;
        } else if (winner === "Player 2") {
            player2Score++;
        }

        player1ScoreElement.textContent = player1Score;
        player2ScoreElement.textContent = player2Score;
        tiesScoreElement.textContent = tiesScore;

        roundCount++;
        if (roundCount >= maxRounds) {
            declareFinalWinner();
            addEndGameButton();
        } else {
            buildBoard(boardSize);
        }
    }

    // Declarar el ganador final
    function declareFinalWinner() {
        if (player1Score > player2Score) {
            gameStatus.textContent = "¡Jugador 1 gana la partida!";
        } else if (player2Score > player1Score) {
            gameStatus.textContent = "¡Jugador 2 gana la partida!";
        } else {
            gameStatus.textContent = "¡Es un empate!";
        }
    }

    // Agregar botón para terminar el juego
    function addEndGameButton() {
        const buttonContainer = document.createElement("div");
        buttonContainer.style.display = "flex";
        buttonContainer.style.justifyContent = "center";
        buttonContainer.style.marginTop = "20px";

        const endGameButton = document.createElement("button");
        endGameButton.className = "btn btn-secondary";
        endGameButton.textContent = "Terminar";
        endGameButton.style.padding = "10px 20px";
        endGameButton.style.fontSize = "1.2rem";
        endGameButton.addEventListener("click", () => {
            roundCount = 0;
            resetScores();
            modal.show();
        });

        buttonContainer.appendChild(endGameButton);
        gameStatus.appendChild(buttonContainer);
    }

    // Restablecer puntajes
    function resetScores() {
        player1Score = 0;
        player2Score = 0;
        tiesScore = 0;
        player1ScoreElement.textContent = player1Score;
        player2ScoreElement.textContent = player2Score;
        tiesScoreElement.textContent = tiesScore;
    }

    // Mostrar el modal inicial
    document.querySelectorAll("[data-size]").forEach(button => {
        button.addEventListener("click", function () {
            boardSize = parseInt(this.getAttribute("data-size"));
            resetScores();
            buildBoard(boardSize);
            gameStatus.textContent = `Turno de: ${currentPlayer}`;
            modal.hide();
        });
    });

    // Configurar el botón "Volver al Menú"
    backToMenuButton.addEventListener("click", () => {
        window.location.href = "menu.html";
    });

    modal.show();
});

