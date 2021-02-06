import { Point } from "./point";

export class Piece {
  index: number;
  moveable: boolean;
  /** Position of the first 'subpiece', so to speak. */
  firstPosition: Point;
  shape: Point[];

  constructor({
    index,
    moveable = true,
    firstPosition,
    shape = null,
  }: {
    index: number;
    moveable?: boolean;
    firstPosition: Point,
    shape?: Point[] | null,
  }) {
      this.index = index;
      this.moveable = moveable;
      this.firstPosition = firstPosition;
      this.shape = shape ?? [];
  }
}
