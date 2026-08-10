function createPlayer() {
    const segments = [{x: 0, y: 0}]; // Array of objects with x and y of the segments position, index 0 will always be the head
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
            oldSegmentPositions[index] = pos; // Store old position to access later otherwise a chain reaction will occur when shifting the positions of all elements
            if (index === 0) { // Head
                // Update heads position
                switch (direction) {
                    case "left":
                        segments[index].x = segments[index].x - 1;
                        break;
                    case "right":
                        segments[index].x = segments[index].x + 1;
                        break;
                    case "up":
                        segments[index].y = segments[index].y - 1;
                        break;
                    case "down":
                        segments[index].y = segments[index].y + 1;
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

function createGame() {
    const player = createPlayer();
    let previousTimeStamp = 0;
    // Private functions

    // Public functions
    function update(timeStamp) {
        if (timeStamp - previousTimeStamp > 1000) {
            previousTimeStamp = timeStamp;
            player.move();
            console.log(player.segments[0])
        }
        //console.log(player.getDirection())
    };

    return {update};
};

export default createGame;