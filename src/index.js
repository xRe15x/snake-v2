import "./style.css";
import createGame from "./game.js";
import createUI from "./ui.js"

const gridSize = {x: 15, y: 10}

let game = createGame(gridSize);
const ui = createUI(gridSize);

const dsRestart = document.getElementById("restart"); // Restart button

let previousTimeStamp = 0;
let isPlaying = true;

function gameLoop(timeStamp) {
    requestAnimationFrame(gameLoop); // Recursive call to loop

    if (timeStamp - previousTimeStamp < 200) { // One frame every 200 milliseconds
        return;
    }
    previousTimeStamp = timeStamp;

    // Only update game logic if currently playing
    if (isPlaying === true) {
        let gameEnded = game.update(timeStamp);
        if (gameEnded === true) { // Show death screen stuff is lost
            isPlaying = false;
            ui.showDeathScreen(game.getScore());
        }
    }

    ui.update(game.getUIData(), isPlaying);
};

dsRestart.addEventListener("click", () => {
    isPlaying = true;
    ui.hideDeathScreen();
    game = createGame(gridSize);
})

requestAnimationFrame(gameLoop); // Start loop

console.log("JS running!");