import "./style.css";
import createGame from "./game.js";
import createUI from "./ui.js"

const game = createGame();
const ui = createUI();

function gameLoop(timeStamp) {
    requestAnimationFrame(gameLoop);

    game.update(timeStamp);
    ui.update();
};

requestAnimationFrame(gameLoop);

console.log("JS running!");