import { applyTransform, createSVGElement, mount } from '../utils';
import { type Context } from './context';

export function transform(
  type: string,
  context: Context,
  ...params: Array<number | string>
) {
  const { group } = context;
  applyTransform(group, `${type}(${params.join(', ')})`);
}

export function translate(context: Context, tx: number, ty: number) {
  transform('translate', context, tx, ty);
}

export function rotate(context: Context, theta: number) {
  transform('rotate', context, theta);
}

export function scale(context: Context, sx: number, sy: number) {
  transform('scale', context, sx, sy);
}

export function save(context: Context) {
  const { group } = context;
  const newGroup = createSVGElement('g');
  mount(group, newGroup);
  context.group = newGroup;
}

export function restore(context: Context) {
  const { group } = context;
  const { parentNode } = group;

  context.group = parentNode as SVGElement;
}
