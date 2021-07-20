export interface Point {
  readonly x: number;
  readonly y: number;
}

export function arePointsEqual(point1: Point, point2: Point) {
  return point1.x === point2.x && point1.y === point2.y;
}

export function pointFromXY(x: number, y: number): Point {
  return { x, y };
}
