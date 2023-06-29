import {
  cartesian,
  createBand,
  createCoordinate,
  createLinear,
  createRenderer,
  line,
} from '../src';

const ctx = createRenderer(400, 300);
document.body.appendChild(ctx.node());

const data = [
  [20, 30, 10, 60, 80],
  [80, 37, 158, 40, 180],
];

const X = Array.from(data[0], (_, i) => i);

const I = data.flat().map((_, i) => i);

const scaleX = createBand({ domain: X, range: [0, 1], padding: 0.2 });
const scaleY = createLinear({ domain: [0, 180], range: [0, 1] });

const createValues = (data: number[][]) => {
  const res = {
    x: [] as number[],
    y: [] as number[],
    z: [] as any,
  };
  data.forEach((list, index) => {
    const z = `${index}`;
    list.forEach((d, i) => {
      res.x.push(scaleX(i));
      res.y.push(scaleY(d));
      res.z.push(z);
    });
  });

  return res;
};

const values = createValues(data);

const coordinate = createCoordinate({
  x: 0,
  y: 0,
  width: 400,
  height: 300,
  transforms: [cartesian()],
});

line(
  ctx,
  I,
  { x: scaleX, y: scaleY },
  values,
  { stroke: '#58bc48' },
  coordinate
);
