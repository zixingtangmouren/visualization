import {
  createRenderer,
  createCoordinate,
  createLinear,
  shapText,
  cartesian,
  createOrdinal,
} from '../src';

const data = [
  { x: 10, y: 30, text: 'Java' },
  { x: 30, y: 150, text: 'PHP' },
  { x: 200, y: 200, text: 'JavaScript' },
  { x: 180, y: 90, text: 'Python' },
];

const ctx = createRenderer(400, 300);
document.body.appendChild(ctx.node());

const coordinate = createCoordinate({
  x: 0,
  y: 0,
  width: 400,
  height: 300,
  transforms: [cartesian()],
});

const scaleX = createLinear({ domain: [0, 400], range: [0, 1] });
const scaleY = createLinear({ domain: [0, 300], range: [0, 1] });
const scaleFill = createOrdinal({
  domain: data.map(({ text }) => text),
  range: ['red', 'blue', 'green', 'black'],
});

const values = {
  x: data.map(({ x }) => x).map(scaleX),
  y: data.map(({ y }) => y).map(scaleY),
  text: data.map(({ text }) => text),
  fill: data.map(({ text }) => text).map(scaleFill),
  rotate: [90, 40, 0, 180],
};

const scales = {
  x: scaleX,
  y: scaleY,
  fill: scaleFill,
};

const I = Array.from(data, (_, i) => i);

shapText(ctx, I, scales, values, {}, coordinate);
