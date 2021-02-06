export class BoardState {
    constructor() {
        // 2D array.
        // 0 represents empty space,
        // 1 represents a wall,
        // >= 2 represents blocks.
        this.boardState = [];

        // States that can be reached from this state.
        // It's not a tree with a parent/child relationship, because every link is bi-directional.
        this.possibleStates = [];
    }

    createShifted(pieceIndex, moveDir) {

    }
}