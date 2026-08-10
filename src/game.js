function createPlayer() {
    const segments = [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}]; // Array of objects with x and y of the segments position, index 0 will always be the head
    let direction = "right"; // left, right, up, down

    // Private functions
    function changeDirection(newDirection) {
        // Check for valid direction and you aren't trying to move in the opposite direction.
        if (newDirection === "left" && direction !== "right") {
            direction = newDirection;
        } else if (newDirection === "right" && direction !== "left") {
            direction = newDirection;
        } else if (newDirection === "up" && direction !== "down") {
            direction = newDirection;
        } else if (newDirection === "down" && direction !== "up") {
            direction = newDirection;
        };
    };

    // Public functions
    function move() {
        const oldSegmentPositions = []; // Old position of segments before the shift in direction
        segments.forEach((pos, index) => {
            oldSegmentPositions[index] = {...pos}; // Store old position to access later otherwise a chain reaction will occur when shifting the positions of all elements
            if (index === 0) { // Head
                // Update heads position
                switch (direction) {
                    case "left":
                        segments[index].x -= 1;
                        break;
                    case "right":
                        segments[index].x += 1;
                        break;
                    case "up":
                        segments[index].y -= 1;
                        break;
                    case "down":
                        segments[index].y += 1;
                        break;
                }
            } else {
                segments[index] = oldSegmentPositions[index - 1]; // Make the position of the current segment the one infront of it
            };
        });
    };

    document.addEventListener("keydown", event => {
        const validDirections = {w: "up", a: "left", s: "down", d: "right"};
        if (validDirections[event.key]) {
            changeDirection(validDirections[event.key]);
        }
    });

    return {
        move,
        segments,
        getDirection: () => direction,
    };
};

function createApple() { // With how this is made, the game can only have 1 apple at a time
    let position = undefined // object of the apples x and y position

    // Private functions
    function getRandomPosition(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    // Public functions
    function spawn() {
        position = {
            x: getRandomPosition(),
            y: getRandomPosition()
        }
    }

    return {
        spawn,
        getPosition: () => position
    };
}

function createGame(gridSize) {
    const player = createPlayer();
    const apple = createApple();
    // Private functions

    // Public functions
    function update() {
        player.move();

        if (apple.getPosition() !== undefined) {

        }
    };

    function getUIData() { // Data to be sent to the UI
        return {
            playerSegments: player.segments,
            applePosition: apple.getPosition,
        };
    }

    return {
        update,
        getUIData
    };
};

export default createGame;