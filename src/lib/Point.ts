export interface Point {
  readonly x: number;
  readonly y: number;
}

export class Point {
  public static equal(point1: Point, point2: Point) {
    return point1.x === point2.x && point1.y === point2.y;
  }

  public static fromXY(x: number, y: number) {
    return { x, y };
  }
}
