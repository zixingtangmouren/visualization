// import { sub } from '../utils';
import { pathArea, pathLine } from './d';

export type Shape<T = Record<string, any>> = (
  renderer: any,
  coordinate: (cr: number[]) => number[],
  options: T
) => any;

export const circle: Shape = (
  renderer,
  coordinate,
  options: Record<string, any>
) => {
  const { cx, cy, r, ...styles } = options;
  const [px, py] = coordinate([cx, cy]);
  return renderer.circle({ cx: px, cy: py, r, ...styles });
};

export const text: Shape = (renderer, coordinate, options) => {
  const { x, y, text, rotate, ...styles } = options;
  const [px, py] = coordinate([x, y]);
  renderer.save();
  renderer.translate(px, py);
  renderer.rotate(rotate);
  const elem = renderer.text({ x: 0, y: 0, text, ...styles });
  renderer.restore();
  return elem;
};

export const link: Shape = (renderer, coordinate, options) => {
  const { x, y, x1, y1, ...styles } = options;
  const [px, py] = coordinate([x, y]);
  const [px1, py1] = coordinate([x1, y1]);

  return renderer.line({ x1: px, y1: py, x2: px1, y2: py1, ...styles });
};

export const line: Shape = (
  renderer,
  coordinate,
  { X, Y, I: I0, ...styles }
) => {
  const I = I0;
  const points: number[][] = I.map((i) => coordinate([X[i], Y[i]]));
  const d = pathLine(points);
  console.log(d);
  return renderer.path({ d, ...styles });
};

export const area: Shape = (
  renderer,
  coordinate,
  { X1, Y1, X2, Y2, I: I0, ...styles }
) => {
  const I = I0;
  const points = [
    ...I.map((i) => [X1[i], Y1[i]]),
    ...I.map((i) => [X2[i], Y2[i]]).reverse(),
  ].map(coordinate);

  return renderer.path({ d: pathArea(points), ...styles });
};

export const rect: Shape = (
  renderer,
  coordinate,
  { x1, y1, x2, y2, ...styles }
) => {
  // const v0 = [x1, y1];
  // const v1 = [x2, y1];
  // const v2 = [x2, y2];
  // const v3 = [x1, y2];
  // // @ts-expect-error
  // const vs = coordinate.isTranspose() ? [v3, v0, v1, v2] : [v0, v1, v2, v3];
  // const ps = vs.map(coordinate);
  // const [p0, p1, p2, p3] = ps;
  // // 笛卡尔坐标系绘制矩形
  // // @ts-expect-error
  // if (!coordinate.isPolar()) {
  //   const [width, height] = sub(p2, p0);
  //   const [x, y] = p0;
  //   return renderer.rect({ x, y, width, height, ...styles });
  // }
  // const center = coordinate.center();
  // const [cx, cy] = center;
  // if (!(equal(p0, p1) && equal(p2, p3))) {
  //   return renderer.path({ d: pathSector([center, ...ps]), ...styles });
  // }
  // const r1 = dist(center, p2);
  // const r2 = dist(center, p0);
  // return ring(renderer, { cx, cy, r1, r2, ...styles });
};
