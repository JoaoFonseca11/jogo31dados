let playerWins = false;
let player1 = {
    diceRolls: [],
    total: 0,
    isAlive: true,
};

let player2 = {
    diceRolls: [],
    total: 0,
    isAlive: true,
};

let currentPlayer = 1; // Tracks whose turn it is (1 or 2)
let message = "";

let messageEl = document.getElementById("message-el");
let player1DiceEl = document.getElementById("player1-dice-el");
let player1TotalEl = document.getElementById("player1-total-el");
let player2DiceEl = document.getElementById("player2-dice-el");
let player2TotalEl = document.getElementById("player2-total-el");

// Function to roll a dice (1-6)
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// Start Game Button
function startGameBtn() {
    playerWins = false;
    // Reset both players
    player1.diceRolls = [];
    player1.total = 0;
    player1.isAlive = true;

    player2.diceRolls = [];
    player2.total = 0;
    player2.isAlive = true;

    currentPlayer = 1; // Player 1 starts
    message = "Player 1's turn! Roll the dice!";
    renderGame();
}

// Render Game State
function renderGame() {
    // Update Player 1's display
    player1DiceEl.textContent = "Dice Rolls: " + player1.diceRolls.join(", ");
    player1TotalEl.textContent = "Total: " + player1.total;

    // Update Player 2's display
    player2DiceEl.textContent = "Dice Rolls: " + player2.diceRolls.join(", ");
    player2TotalEl.textContent = "Total: " + player2.total;

    // Update the message
    messageEl.textContent = message;
}

// Roll Dice Button
function rollDiceBtn() {
    if (playerWins === false) {
        let player = currentPlayer === 1 ? player1 : player2;

        if (!player.isAlive) {
            message = `Player ${currentPlayer} is out! Start a new round for Player ${currentPlayer}!`;
            renderGame();
            return;
        }

        // Roll the dice
        let dice = rollDice();
        player.diceRolls.push(dice);
        player.total += dice;

        // Check if the player has won or lost
        if (player.total === 31) {
            playerWins = true;
            message = `Player ${currentPlayer} wins! Start a new game to play again.`;
            renderGame();
            return;
        } else if (player.total > 31) {
            message = `Player ${currentPlayer} is out! Resetting Player ${currentPlayer}'s score.`;
            player.diceRolls = [];
            player.total = 0;
            player.isAlive = true;

            // Switch to the other player's turn
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            message += ` Player ${currentPlayer}'s turn!`;
        } else {
            // Switch to the other player's turn
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            message = `Player ${currentPlayer}'s turn! Roll the dice!`;
        }
    } else {
        message = 'Player has already won! Start a new game to play again.';
        renderGame();
        return;
    }

    renderGame();
}
