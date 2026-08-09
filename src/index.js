import "./style.css";
import createGame from "./game";
import createUI from "./ui.js"

const game = createGame();
const ui = createUI();

function gameLoop() {
    requestAnimationFrame(gameLoop);

    game.update();
    ui.update();
};

requestAnimationFrame(gameLoop);

console.log("JS running!");