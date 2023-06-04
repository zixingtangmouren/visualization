import { ceil, floor, nice, normalize, ticks, tickStep } from './utils';

export interface CreateLinear {
  /**
   * 定义域
   */
  domain: [number, number];
  /**
   * 值域
   */
  range: [number, number];
  interpolate?: (t: number, start: number, stop: number) => number;
}

/**
 * 创建线性比例尺
 * (dv - ds) / (de - dv) = (rv - rs) / (re - rv)
 * @param param0
 */
export function createLinear({
  domain: [d0, d1],
  range: [r0, r1],
  interpolate = interpolateNumber,
}: CreateLinear) {
  const scale = (x: number) => {
    const t = normalize(x, d0, d1);
    // 根据输入在定义域的比例关系，算出输出的值
    return interpolate(t, r0, r1);
  };

  scale.ticks = (tickCount: number) => ticks(d0, d1, tickCount);
  scale.nice = (tickCount: number) => {
    const step = tickStep(d0, d1, tickCount);
    [d0, d1] = nice([d0, d1], {
      floor: (x: number) => floor(x, step),
      ceil: (x: number) => ceil(x, step),
    });
  };

  return scale;
}

/**
 * 数值插值器
 * @param t
 * @param start
 * @param stop
 * @returns
 */
export function interpolateNumber(t: number, start: number, stop: number) {
  return start * (1 - t) + stop * t;
}

/**
 * 颜色插值器
 * @param t
 * @param start
 * @param stop
 * @returns
 */
export function interolateColor(t: number, start: number[], stop: number[]) {
  const r = interpolateNumber(t, start[0], stop[0]);
  const g = interpolateNumber(t, start[1], stop[1]);
  const b = interpolateNumber(t, start[2], stop[2]);
  return `rgb(${r}, ${g}, ${b})`;
}
