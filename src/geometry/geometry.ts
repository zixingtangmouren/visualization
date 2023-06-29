import { type Channel } from './channel';

interface Geometry {
  (
    renderer: any,
    I: number[],
    scales: Record<string, any>,
    values: Record<string, any[]>,
    styles: Record<string, any>,
    coordinate: (cd: number[]) => number[]
  ): void;
  channels: () => Record<string, Channel>;
}

export type RenderFunction = (
  renderer: any,
  I: number[],
  scales: Record<string, any>,
  values: Record<string, any[]>,
  styles: Record<string, any>,
  coordinate: (cd: number[]) => number[]
) => any[];

export function createGeometry(
  channels: Record<string, Channel>,
  render: RenderFunction
) {
  const geometry: Geometry = (
    renderer,
    I,
    scales,
    values,
    styles,
    coordinate
  ) => {
    for (const [key, { optional, scale }] of Object.entries(channels)) {
      // 只有必选的通道才会被检查
      if (!optional) {
        // 如果没有提供对应的值就抛出异常
        if (!values[key]) throw new Error(`Missing Channel: ${key}`);
        // 目前只用判断一下 band 比例尺
        if (scale === 'band' && !scales[key]?.bandWidth) {
          throw new Error(`${key} channel needs band scale.`);
        }
      }
    }
    render(renderer, I, scales, values, styles, coordinate);
  };

  geometry.channels = () => channels;

  return geometry;
}
