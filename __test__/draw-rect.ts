import {
  createRenderer,
  createLinear,
  createCoordinate,
  cartesian,
  createBand,
} from '../src';

const ctx = createRenderer(600, 400);
document.body.appendChild(ctx.node());

const data = [30, 20, 10, 14, 55, 78, 99, 100, 2, 10];
const names = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

const barHeghtScale = createLinear({ domain: [0, 100], range: [0, 1] });
const tickScale = createBand({ domain: names, range: [0, 600], padding: 0.2 });

const coordinate = createCoordinate({
  x: 0,
  y: 0,
  width: 600,
  height: 400,
  transforms: [cartesian()],
});

data.forEach((d, index) => {
  const attributeY = barHeghtScale(d);
  const attributeX = tickScale(names[index]);

  const [, y] = coordinate([0, attributeY]);

  console.log(attributeX, y);

  ctx.rect({
    x: attributeX,
    y,
    width: tickScale.bandWidth(),
    height: 600 - y,
  });
});
