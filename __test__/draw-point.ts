import {
  createRenderer,
  createCoordinate,
  point,
  cartesian,
  createLinear,
  createOrdinal,
} from '../src';

const ctx = createRenderer(400, 300);
document.body.appendChild(ctx.node());

const data = [
  { width: 100, height: 200, size: 4, name: 'tang' },
  { width: 230, height: 80, size: 10, name: 'zhang' },
  { width: 150, height: 160, size: 2, name: 'huang' },
];

const widths = data.map(({ width }) => width);
const heights = data.map(({ height }) => height);
const names = data.map(({ name }) => name);
const sizes = data.map(({ size }) => size);

const I = data.map((_, index) => index);

const scaleX = createLinear({ domain: [0, 400], range: [0, 1] });
const scaleY = createLinear({ domain: [0, 300], range: [0, 1] });

const scaleColor = createOrdinal({
  domain: names,
  range: ['red', 'green', 'blue'],
});

const values = {
  x: widths.map(scaleX),
  y: heights.map(scaleY),
  fill: names.map(scaleColor),
  r: sizes,
};

console.log(values);

const scales = {
  x: scaleX,
  y: scaleY,
  fill: scaleColor,
};

const coordinate = createCoordinate({
  x: 0,
  y: 0,
  width: 400,
  height: 300,
  transforms: [cartesian()],
});

point(ctx, I, scales, values, { r: 10 }, coordinate);
