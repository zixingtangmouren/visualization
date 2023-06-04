import { applyAttributes, createSVGElement, mount } from './utils';
import { type Context } from './context';

type CreateElementAttributes<T extends Record<any, any>> = T &
  Record<string, number | string>;

export function shape(
  type: string,
  context: Context,
  attributes: Record<string, string | number>
) {
  const { group } = context;
  const el = createSVGElement(type);
  applyAttributes(el, attributes);
  mount(group, el); // 挂载
  return el;
}

/**
 * 绘制线
 * @param context
 * @param attributes
 * @returns
 */
export function line(context: Context, attributes: Record<string, string>) {
  return shape('line', context, attributes);
}

export type RectAttributes = CreateElementAttributes<{
  width: number;
  height: number;
  x: number;
  y: number;
}>;

/**
 * 绘制线
 * @param context
 * @param attributes
 * @returns
 */
export function rect(context: Context, attributes: RectAttributes) {
  return shape('rect', context, attributes);
}

export type TextAttributes = CreateElementAttributes<{ text: string }>;

/**
 * 绘制文字
 * @param context
 * @param attributes
 * @returns
 */
export function text(context: Context, attributes: TextAttributes) {
  const { text, ...rest } = attributes;
  const textElement = shape('text', context, rest);
  textElement.textContent = text;
  return textElement;
}

export function path(context: Context, attributes: Record<string, any>) {
  const { d } = attributes;
  return shape('path', context, { ...attributes, d: d.flat().join(' ') });
}

export type CircleAttributes = CreateElementAttributes<{
  cx: number;
  cy: number;
  r: number;
  stroke: string;
  fill: string;
  strokeWidth: number;
}>;

/**
 * 绘制圆弧
 * @param context
 * @param attributes
 * @returns
 */
export function circle(context: Context, attributes: CircleAttributes) {
  return shape('circle', context, attributes);
}

export type RingAttributes = CreateElementAttributes<{
  cx: number;
  cy: number;
  r1: number;
  r2: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
}>;

export function ring(context: Context, attributes: RingAttributes) {
  // // r1 是内圆的半径，r2 是外圆的半径
  // const { cx, cy, r1, r2, stroke, strokeWidth, fill, ...styles } = attributes;
  // const defaultStrokeWidth = 1;
  // const innerStroke = circle(context, {
  //   fill: 'transparent',
  //   stroke: stroke ?? fill,
  //   strokeWidth,
  //   cx,
  //   cy,
  //   r: r1,
  // });
  // const ring = circle(context, {
  //   ...styles,
  //   strokeWidth: r2 - r1 - (strokeWidth || defaultStrokeWidth),
  //   stroke: fill,
  //   fill: 'transparent',
  //   cx,
  //   cy,
  //   r: (r1 + r2) / 2,
  // });
  // const outerStroke = circle(context, {
  //   fill: 'transparent',
  //   stroke: stroke || fill,
  //   strokeWidth,
  //   cx,
  //   cy,
  //   r: r2,
  // });
  // return [innerStroke, ring, outerStroke];
}
