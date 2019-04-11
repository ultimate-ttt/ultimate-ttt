export interface Point {
  readonly x: number;
  readonly y: number;
}

export const arePointsEqual = (point1: Point, point2: Point) => {
  if (point1.x === point2.x && point1.y === point2.y) {
    return true;
  }
  return false;
};
