import { createContext } from './context';
import {
  line,
  circle,
  text,
  rect,
  path,
  ring,
  type CircleAttributes,
  type TextAttributes,
  type RectAttributes,
  type RingAttributes,
} from './shape';
import { restore, save, scale, translate, rotate } from './transform';

export function createRenderer(width: number, height: number) {
  const context = createContext(width, height); // 创建上下文信息
  return {
    line: (options: Record<string, any>) => line(context, options),
    circle: (options: CircleAttributes) => circle(context, options),
    text: (options: TextAttributes) => text(context, options),
    rect: (options: RectAttributes) => rect(context, options),
    path: (options: Record<string, any>) => path(context, options),
    ring: (options: RingAttributes) => {
      ring(context, options);
    }, // 绘制圆环
    restore: () => {
      restore(context);
    },
    save: () => {
      save(context);
    },
    scale: (sx: number, sy: number) => {
      scale(context, sx, sy);
    },
    rotate: (theta: number) => {
      rotate(context, theta);
    },
    translate: (tx: number, ty: number) => {
      translate(context, tx, ty);
    },
    node: () => context.node, // 下面会讲解
    group: () => context.group, // 下面会讲解
  };
}
