function createUI(gridSize) {
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    const scoreText = document.getElementById("score");
    const bestScoreText = document.getElementById("best-score");

    const cellX = canvas.width / gridSize.x;
    const cellY = canvas.height / gridSize.y;

    // Private functions
    function drawSnake(segments) {
        segments.forEach(pos => {
            ctx.fillStyle = "rgb(252, 252, 252)";
            ctx.fillRect(cellX * pos.x + 0.5, cellY * pos.y + 0.5, cellX - 1, cellY - 1);
        });
    };

    function drawApple(position) {
        if (position === undefined) return; // Apple has not spawned yet

        ctx.fillStyle = "rgb(255,0,0)";
        ctx.fillRect(cellX * position.x + 2.5, cellY * position.y + 2.5, cellX - 5, cellY - 5)
    }

    // Public functions
    function update(gameData) {
        const {playerSegments, applePosition, score} = gameData;

        // Clear last frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw everything
        drawSnake(playerSegments);
        drawApple(applePosition());

        // Update UI
        scoreText.textContent = "Score: " + score;
    };

    return {update};
};

export default createUI;