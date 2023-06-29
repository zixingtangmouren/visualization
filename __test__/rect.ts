import {
  cartesian,
  createCoordinate,
  createLinear,
  createRenderer,
  rect,
} from '../src';

const ctx = createRenderer(400, 400);
document.body.appendChild(ctx.node());

const scaleX = createLinear({ domain: [0, 100], range: [0, 1] });
const scaleY = createLinear({ domain: [0, 100], range: [0, 1] });

const values = {
  x: [0, 0, 50].map(scaleX),
  y: [0, 50, 50].map(scaleY),
  x1: [100, 50, 100].map(scaleX),
  y1: [50, 100, 100].map(scaleY),
  fill: ['red', 'green', 'black'],
};

const coordinate = createCoordinate({
  width: 400,
  height: 400,
  x: 0,
  y: 0,
  transforms: [cartesian()],
});

rect(ctx, [0, 1, 2], {}, values, {}, coordinate);
