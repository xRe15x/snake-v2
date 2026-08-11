function createUI(gridSize) {
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    const styles = getColours();

    // Get X and Y size of a cell
    const cellX = canvas.width / gridSize.x;
    const cellY = canvas.height / gridSize.y;

    const scoreText = document.getElementById("score");
    const bestScoreText = document.getElementById("best-score");

    const deathScreen = document.getElementById("death-screen");
    const dsScore = document.getElementById("death-screen-score");
    const dsRestart = document.getElementById("restart"); // Restart button

    // Private functions
    function showDeathScreen() {
        deathScreen.style.display = "flex";
    };

    function hideDeathScreen() {
        deathScreen.style.display = "none";
    }

    function getColours() {
        const styles = getComputedStyle(document.documentElement); // Root element
        const colours = {};

        for (const name of Object.values(styles)) {
            if (name.startsWith("--")) {
                const value = styles.getPropertyValue(name).trim(); // Apparently you need to trim, personally I haven't had any issues but I might as well
                colours[name] = value;
            }
        }

        return colours;
    }

    function drawMap() { // Draw the checkered background
        const shrink = 4; // Amount to shrink each cell so the background colour slightly reveals
        for (let x = 0; x < gridSize.x; x++) {
            for (let y = 0; y < gridSize.y; y++) {
                if ((x + y) % 2 === 0) {
                    ctx.fillStyle = styles["--grid-colour1"];
                } else {
                    ctx.fillStyle = styles["--grid-colour2"];
                }
                ctx.fillRect(cellX * x + shrink / 2, cellY * y + shrink / 2, cellX - shrink, cellY - shrink); // Fill cells and apply shrink
            }
        }
    };

    function drawSnake(segments) {
        const shrink = 2;
        segments.forEach(pos => {
            ctx.fillStyle = styles["--snake-colour"];
            ctx.fillRect(cellX * pos.x + shrink / 2, cellY * pos.y + shrink / 2, cellX - shrink, cellY - shrink);
        });
    };

    function drawApple(position) {
        if (position === undefined) return; // Apple has not spawned yet

        const shrink = 10;
        ctx.fillStyle = styles["--apple-colour"];
        ctx.fillRect(cellX * position.x + shrink / 2, cellY * position.y + shrink / 2, cellX - shrink, cellY - shrink)
    }

    // Public functions
    function update(gameData, isPlaying) {
        if (isPlaying === false) {
            console.log("GAME OVER");
            showDeathScreen();
            //return;
        } else {
            console.log("PLAYING");
            hideDeathScreen();
        }

        const {playerSegments, applePosition, score} = gameData;

        // Clear last frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw everything
        drawMap();
        drawSnake(playerSegments);
        drawApple(applePosition());

        // Update scores
        scoreText.textContent = "Score: " + score;
    };

    return {update};
};

export default createUI;