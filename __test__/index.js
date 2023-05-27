import { createRenderer } from '../src/index';

const ctx = createRenderer(300, 300);

ctx.rect({ x: 0, y: 0, width: 100, height: 100 });

ctx.circle({ cx: 200, cy: 200, r: 50 });

ctx.line({ x1: 0, y1: 0, x2: 300, y2: 300, stroke: 'red' });

document.body.appendChild(ctx.node());
