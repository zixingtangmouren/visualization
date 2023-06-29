import {
  cartesian,
  createCoordinate,
  createLinear,
  createRenderer,
  link,
} from '../src';

const ctx = createRenderer(400, 300);
document.body.appendChild(ctx.node());

const data = [
  {
    s: [20, 40],
    e: [280, 300],
  },
  {
    s: [80, 310],
    e: [40, 100],
  },
];

const scaleX = createLinear({ domain: [0, 400], range: [0, 1] });
const scaleY = createLinear({ domain: [0, 300], range: [0, 1] });

const values = {
  x: data.map((i) => i.s[0]).map(scaleX),
  y: data.map((i) => i.s[1]).map(scaleY),
  x1: data.map((i) => i.e[0]).map(scaleX),
  y1: data.map((i) => i.e[1]).map(scaleY),
  stroke: ['red', 'green'],
};

const I = Array.from(data, (_, i) => i);

const coordinate = createCoordinate({
  x: 0,
  y: 0,
  width: 400,
  height: 300,
  transforms: [cartesian()],
});

link(ctx, I, {}, values, {}, coordinate);
