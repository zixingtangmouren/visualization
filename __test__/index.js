import {
  createRenderer,
  createLinear,
  createTime,
  createPoint,
  interolateColor,
} from '../src/index';

const ctx = createRenderer(300, 300);
ctx.rect({ x: 0, y: 0, width: 100, height: 100 });
ctx.circle({ cx: 200, cy: 200, r: 50 });
ctx.line({ x1: 0, y1: 0, x2: 300, y2: 300, stroke: 'red' });
ctx.save();

ctx.rect({ x: 150, y: 150, width: 100, height: 100 });
ctx.rotate(-24);
ctx.restore();

const scaleNumber = createLinear({ domain: [2, 99], range: [0, 1] });

const timeScale = createTime({
  domain: [new Date(2023, 1, 1), new Date()],
  range: [0, 100],
});

const n1 = scaleNumber(4);

const ticks = scaleNumber.ticks(10);

console.log(n1, ticks);

console.log(timeScale(new Date(2023, 5, 20)));

const ps = createPoint({
  domain: ['a', 'b', 'c', 'd', 'e'],
  range: [0, 100],
});

console.log(ps('a'), ps('b'));

document.body.appendChild(ctx.node());

const colorScale = createLinear({
  domain: [0, 1],
  range: [
    [0, 0, 0],
    [255, 62, 66],
  ],
  interpolate: interolateColor,
});

const div = document.createElement('div');
div.style.width = '500px';
div.style.height = '500px';

for (let i = 0; i < 500; i++) {
  const color = colorScale(Math.random());
  const child = document.createElement('div');
  child.style.width = '10px';
  child.style.height = '10px';
  child.style.display = 'inline-block';
  child.style.backgroundColor = color;
  div.appendChild(child);
}

document.body.appendChild(div);

function curry(fn) {
  const arity = fn.length;
  return function curried(...args) {
    const newArgs = args.length === 0 ? [undefined] : args;
    if (newArgs.length >= arity) return fn(...newArgs);
    return curried.bind(null, ...newArgs);
  };
}

const fn = curry((a, b, c) => a + b + c);
console.log(fn());
