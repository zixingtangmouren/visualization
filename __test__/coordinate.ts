import {
  cartesian,
  createBand,
  createCoordinate,
  createLinear,
  createRenderer,
} from '../src';

const ctx = createRenderer(300, 200);
document.body.appendChild(ctx.node());

const data = [10, 22, 30, 60, 50, 89];

const scaleX = createBand({
  domain: [0, 1, 2, 3, 4, 5],
  range: [0, 300],
  padding: 0.2,
});
const scaleY = createLinear({ domain: [0, 100], range: [0, 1] });

const coordinate = createCoordinate({
  x: 0,
  y: 0,
  width: 300,
  height: 200,
  transforms: [
    () => {
      const s = ([x, y]: [number, number]) => [x, 1 - y];
      s.type = () => 's';
      return s;
    },
    cartesian(),
  ],
});

const points: number[][] = [];

data.forEach((d, index) => {
  const x = scaleX(index);
  const attrY = scaleY(d);

  const [, y] = coordinate([0, attrY]);

  ctx.rect({
    x,
    y,
    width: scaleX.bandWidth(),
    height: 200 - y,
    fill: '#1a73e8',
  });

  const point = [(x as number) + scaleX.bandWidth() / 2, y];

  points.push(point);

  ctx.circle({
    cx: point[0],
    cy: point[1],
    r: 2,
    fill: '#58bc58',
    stroke: '#58bc58',
    strokeWidth: 1,
    index,
  });

  if (index >= 1) {
    const [x1, y1] = points[index - 1];
    ctx.line({
      x1,
      y1,
      x2: point[0],
      y2: point[1],
      stroke: '#58bc58',
      strokeWidth: '2',
    });
  }
});

console.log(points);
