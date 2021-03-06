import { arePointsEqual } from '../../lib';

describe('arePointsEqual', () => {
  it('should return true when Points are equal', () => {
    const point1 = { x: 1, y: 2 };
    const point2 = { x: 1, y: 2 };
    const result1 = arePointsEqual(point1, point2);
    expect(result1).toEqual(true);

    const point11 = { x: 0, y: 0 };
    const point12 = { x: 0, y: 0 };
    const result2 = arePointsEqual(point11, point12);
    expect(result2).toEqual(true);
  });

  it('should return false when Points are not equal', () => {
    const point1 = { x: 1, y: 1 };
    const point2 = { x: 1, y: 2 };
    const result1 = arePointsEqual(point1, point2);
    expect(result1).toEqual(false);

    const point11 = { x: 2, y: 0 };
    const point12 = { x: 0, y: 1 };
    const result2 = arePointsEqual(point11, point12);
    expect(result2).toEqual(false);
  });
});
