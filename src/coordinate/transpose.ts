import { curry } from '../utils';
import { reflectX, translate, transpose as transposeT } from './transforms';
import { type CanvasOptions } from './types';

function coordinate(transformOptions: any, canvasOptions: CanvasOptions) {
  return [transposeT(), translate(-0.5, -0.5), reflectX(), translate(0.5, 0.5)];
}

export const transpose = curry(coordinate);
