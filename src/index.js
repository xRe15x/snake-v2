import "./style.css";
import createGame from "./game.js";
import createUI from "./ui.js"

const gridSize = {x: 15, y: 10}

let game = createGame(gridSize);
const ui = createUI(gridSize);

let previousTimeStamp = 0;

function gameLoop(timeStamp) {
    requestAnimationFrame(gameLoop); // Recursive call to loop

    if (timeStamp - previousTimeStamp < 200) { // One frame every 200 milliseconds
        return;
    }
    previousTimeStamp = timeStamp;

    // Update game and UI
    let gameEnded = game.update(timeStamp);

    ui.update(game.getUIData());

    if (gameEnded === true) {
        game = createGame(gridSize);
    }
};

requestAnimationFrame(gameLoop); // Start loop

console.log("JS running!");