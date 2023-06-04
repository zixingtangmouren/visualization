import { curry } from '../utils';
import { scale, translate } from './transforms';
import { type CanvasOptions } from './types';

function coordinate(transformOptions: any, canvasOptions: CanvasOptions) {
  console.log('coordinate', transformOptions);
  const { x, y, width, height } = canvasOptions;

  return [
    /**
     * 因为经过比例尺处理后的数据会被归一化
     * 所以当这个数据表现在画布上时，需要画布的比例缩放
     */
    scale(width, height),
    /**
     * 因为用户的坐标起始点不一定是 0,0 可能会是 30,40
     * 所需将平移 x y 的距离
     */
    translate(x, y),
  ];
}

export const cartesian = curry(coordinate);
