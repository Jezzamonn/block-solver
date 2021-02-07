import { Piece } from "./piece";
import { Point } from "./point";

export class BoardState {
  /**
   * 2D array.
   * 0 represents empty space,
   * 1 represents a wall,
   * >= 2 represents blocks.
   */
  board: number[][];
  depth: number;
  moveNumber: number;
  lastMovedPiece: number;
  #pieces: { [key: number]: Piece } | null;

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

    this.#pieces = null;
  }

  isInRange(pos: Point): boolean {
    if (this.board.length == 0) return false;

    return (
      pos.x >= 0 &&
      pos.x < this.board[0].length &&
      pos.y >= 0 &&
      pos.y < this.board.length
    );
  }

  get pieces() {
    if (this.#pieces == null) {
      const pieces: { [key: number]: Piece } = {};
      for (let y = 0; y < this.board.length; y++) {
        for (let x = 0; x < this.board[y].length; x++) {
          const pieceIndex = this.board[y][x];
          if (pieceIndex == 0) {
            continue;
          }

          if (!(pieceIndex in pieces)) {
            // Create the first position of this piece.
            pieces[pieceIndex] = new Piece({
              index: pieceIndex,
              moveable: pieceIndex != 1,
              firstPosition: { x, y },
            });
          }
          const piece = pieces[pieceIndex];
          pieces[pieceIndex].shape.push({
            x: x - piece.firstPosition.x,
            y: y - piece.firstPosition.y,
          });
        }
      }

      this.#pieces = pieces;
    }

    return this.#pieces;
  }

  createShifted(pieceIndex: number, moveDir: Point): BoardState | null {
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
          if (!this.isInRange({ x: newX, y: newY })) {
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

  static createFromString(boardString: string): BoardState {
    if (boardString.length == 0) {
      throw new Error("Board string must have a length > 0");
    }
    const pieceMap: { [key: string]: number } = {
      " ": 0,
      "#": 1,
    };
    let nextPiece = 2;

    const board: number[][] = [];
    for (const row of boardString.split("\n")) {
      if (row.length == 0) {
        continue;
      }
      const boardRow: number[] = [];
      const chars = [...row];
      for (const char of chars) {
        if (!(char in pieceMap)) {
          pieceMap[char] = nextPiece;
          nextPiece++;
        }
        boardRow.push(pieceMap[char]);
      }
      board.push(boardRow);
    }
    // Quick length sanity check
    for (let i = 1; i < board.length; i++) {
      if (board[i].length != board[0].length) {
        throw new Error(
          `Invalid board size. All rows must be equal length. ` +
          `Lengths = ${board.map(row => row.length)}`);
      }
    }

    return new BoardState({ board });
  }
}
