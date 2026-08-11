function createPlayer() {
    const segments = [{x: 0, y: 0}]; // Array of objects with x and y of the segments position, index 0 will always be the head
    let direction = "right"; // left, right, up, down
    let oldDirection = direction; // Direction in the current frame, prevents moving in the opposite direction by pressing something like "A" and "S" really fast

    // Private functions
    function changeDirection(newDirection) {
        // Check for valid direction and you aren't trying to move in the opposite direction.
        if (newDirection === "left" && oldDirection !== "right") {
            direction = newDirection;
        } else if (newDirection === "right" && oldDirection !== "left") {
            direction = newDirection;
        } else if (newDirection === "up" && oldDirection !== "down") {
            direction = newDirection;
        } else if (newDirection === "down" && oldDirection !== "up") {
            direction = newDirection;
        };
    };

    // Public functions
    function move() {
        oldDirection = direction;

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

    function checkCollided(pos) { // Check if segment head has collided with anything other than itself
        return (segments[0].x === pos.x && segments[0].y === pos.y) && pos !== segments[0];
    }

    function increaseLength() { // Increase length by 1
        const lastSegment = segments[segments.length - 1];
        segments.push({x: lastSegment.x, y: lastSegment.y});
    }

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
        checkCollided,
        increaseLength
    };
};

function createApple(gridSize) { // With how this is made, the game can only have 1 apple at a time
    let position = undefined // object of the apples x and y position, undefined means one hasnt spawned yet

    // Private functions
    function getRandomPosition(segments) {
        let randomPos;

        do { // Repeat getting a random position until it doesnt overlap with the player segments
            randomPos = {
                x: Math.floor(Math.random() * gridSize.x),
                y: Math.floor(Math.random() * gridSize.y)
            }
        } while (segments.some(pos => pos.x === randomPos.x && pos.y === randomPos.y));

        return randomPos;
    }

    // Public functions
    function spawn(segments) {
        position = getRandomPosition(segments)
    }

    function remove() {
        position = undefined;
    }

    return {
        spawn,
        remove,
        getPosition: () => position
    };
}

function createGame(gridSize) {
    // Init other functions
    const player = createPlayer();
    const apple = createApple(gridSize);

    let lastAppleTimeStamp = 0; // Keep track of when the last apple spawned

    let score = 0; // Score for the current game

    // Public functions
    function update(timeStamp) {
        player.move();

        // If its been longer than 1000ms and an apple has not spawned yet
        const applePos = apple.getPosition();
        if (timeStamp - lastAppleTimeStamp >= 2000 && applePos === undefined) {
            apple.spawn(player.segments);
            console.log("APPLE SPAWNED");
        }

        // Check collisions
        for (const segmentPos of player.segments) { // Player segments
            if (player.checkCollided(segmentPos)) {
                console.log("a");
                return true;
            }
        }

        if (applePos && player.checkCollided(applePos)) { // Apple
            apple.remove();
            player.increaseLength();
            lastAppleTimeStamp = timeStamp; // Reset apple spawn timer only after its been eaten
            score++;
        }

        const headPos = player.segments[0]
        if (headPos.x < 0 || headPos.x >= gridSize.x || headPos.y < 0 || headPos.y >= gridSize.y) { // Check if player is outside map boundaries
            return true;
        }
    };

    function getUIData() { // Data to be sent to the UI
        return {
            playerSegments: player.segments,
            applePosition: apple.getPosition,
            score
        };
    }

    return {
        update,
        getUIData
    };
};

export default createGame;