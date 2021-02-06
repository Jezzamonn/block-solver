export class BoardState {
  /**
   * 2D array.
   * 0 represents empty space,
   * 1 represents a wall,
   * >= 2 represents blocks.
   */
  board: number[][];
  /**
   * States that can be reached from this state.
   *
   * It's not a tree with a parent/child relationship, because every link is bi-directional.
   */
  possibleStates: BoardState[];
  depth: number;
  moveNumber: number;
  lastMovedPiece: number;

  constructor({
    board,
    depth = 0,
    moveNumber = 0,
    lastMovedPiece = 0,
  }: {
    board: number[][];
    depth?: number;
    moveNumber?: number;
    lastMovedPiece?: number;
  }) {
    this.board = board;
    this.depth = depth;
    this.moveNumber = moveNumber;
    this.lastMovedPiece = lastMovedPiece;

    this.possibleStates = [];
  }

  isInRange(x: number, y: number): boolean {
    if (this.board.length == 0) return false;

    return (
      x >= 0 && x < this.board[0].length && y >= 0 && y < this.board.length
    );
  }

  createShifted(
    pieceIndex: number,
    moveDir: {
      x: number;
      y: number;
    }
  ): BoardState | null {
    // Copy the board over
    const newBoard = this.board.map((row) => row.slice());
    // Erase the piece on the new board
    for (let y = 0; y < newBoard.length; y++) {
      for (let x = 0; x < newBoard[y].length; x++) {
        if (newBoard[y][x] == pieceIndex) {
          newBoard[y][x] = 0;
        }
      }
    }
    // Try place a piece in the new position
    for (let y = 0; y < newBoard.length; y++) {
      for (let x = 0; x < newBoard[y].length; x++) {
        if (this.board[y][x] == pieceIndex) {
          const newX = x + moveDir.x;
          const newY = y + moveDir.y;
          if (!this.isInRange(newX, newY)) {
            // Moving outside the board! Give up!
            return null;
          }
          if (newBoard[newY][newX] != 0) {
            // Can only move into an empty space! Give up!
            return null;
          }
          newBoard[newY][newX] = pieceIndex;
        }
      }
    }

    let moveNumber = this.moveNumber;
    if (pieceIndex != this.lastMovedPiece) {
      moveNumber++;
    }
    // All the moves must have been successful, so create the new state.
    // Note that the edge tracking stuff is handled outside this function.
    return new BoardState({
      board: newBoard,
      depth: this.depth + 1,
      moveNumber,
      lastMovedPiece: pieceIndex,
    });
  }
}
