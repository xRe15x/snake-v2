function createPlayer() {
    const segments = [{x: 0, y: 0}]; // Array of objects with x and y of the segments position, index 0 will always be the head
    const direction = {x: 1, y: 0}; // Direction the player is moving in, x +1 = right, x -1 = left, y +1 = down, y -1 = up // MIGHT CHANGE THIS TO "right", "left" ETC

    function move() {
        const oldSegmentPositions = []; // Old position of segments before the shift in direction
        segments.forEach((pos, index) => {
            oldSegmentPositions[index] = pos; // Store old position to access later otherwise a chain reaction will occur when shifting the positions of all elements
            if (index === 0) { // Head
                segments[index].x = segments[index].x !== 0 ? segments[index].x + direction.x : segments[index].x
                segments[index].y = segments[index].y !== 0 ? segments[index].y + direction.y : segments[index].y
            } else {
                segments[index] = oldSegmentPositions[index - 1]; // Make the position of the current segment the one infront of it
            }
        })
    };
};

function createGame() {
    const player = createPlayer();

    // Private functions

    // Public functions
    function update() {
        
    };

    return {update};
};

export default createGame;