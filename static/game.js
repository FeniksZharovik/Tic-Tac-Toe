let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "Player 1";
let gameActive = true;
let gameMode = "PVP"; // Default mode is Player vs Player

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const modalElement = document.getElementById('modal');
const modalMessageElement = document.getElementById('modal-message');
const modalIconElement = document.getElementById('modal-icon');
const modeModalElement = document.getElementById('mode-modal');
const changeModeButton = document.getElementById('change-mode-btn');

function startGame(mode) {
    gameMode = mode;
    modeModalElement.classList.add('hidden');
    resetGame();
}

function showModeModal() {
    modeModalElement.classList.remove('hidden');
}

function handleCellClick(index) {
    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer === "Player 1" ? "X" : "O";
    renderBoard();

    if (checkWin()) {
        showModal(`${currentPlayer} wins!`, 'https://img.icons8.com/color/96/000000/trophy.png');
        gameActive = false;
        changeModeButton.classList.remove('hidden');
        return;
    }

    if (!board.includes("")) {
        showModal("It's a draw!", 'https://img.icons8.com/color/96/000000/handshake.png');
        gameActive = false;
        changeModeButton.classList.remove('hidden');
        return;
    }

    if (gameMode === "PVB" && currentPlayer === "Player 1") {
        currentPlayer = "Bot";
        showModal("Bot's turn", 'https://img.icons8.com/color/96/000000/robot.png');
        setTimeout(botMove, 2000); // Delay bot move for 2 seconds
    } else {
        currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
        messageElement.textContent = `${currentPlayer}'s turn`;
        showModal(`${currentPlayer}'s turn`, 'https://img.icons8.com/color/96/000000/refresh.png');
    }
}

function botMove() {
    let availableMoves = board.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
    let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    board[move] = "O";
    renderBoard();

    if (checkWin()) {
        showModal("Bot wins!", 'https://img.icons8.com/color/96/000000/trophy.png');
        gameActive = false;
        changeModeButton.classList.remove('hidden');
        return;
    }

    if (!board.includes("")) {
        showModal("It's a draw!", 'https://img.icons8.com/color/96/000000/handshake.png');
        gameActive = false;
        changeModeButton.classList.remove('hidden');
        return;
    }

    currentPlayer = "Player 1";
    messageElement.textContent = `${currentPlayer}'s turn`;
    showModal(`${currentPlayer}'s turn`, 'https://img.icons8.com/color/96/000000/refresh.png');
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === (currentPlayer === "Player 1" ? "X" : "O"));
    });
}

function renderBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('w-24', 'h-24', 'flex', 'items-center', 'justify-center', 'bg-gray-200', 'text-3xl', 'font-bold', 'cursor-pointer');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        boardElement.appendChild(cellElement);
    });
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "Player 1";
    gameActive = true;
    messageElement.textContent = `${currentPlayer}'s turn`;
    changeModeButton.classList.add('hidden');
    renderBoard();
}

function showModal(message, iconUrl) {
    modalMessageElement.textContent = message;
    modalIconElement.src = iconUrl;
    modalElement.classList.remove('hidden');
    setTimeout(() => {
        modalElement.classList.add('hidden');
    }, 2000);
}

renderBoard();