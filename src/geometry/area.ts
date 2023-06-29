import { group } from '../utils';
import { createChannel, createChannels } from './channel';
import { createGeometry, type RenderFunction } from './geometry';
import { area as pathArea } from './shape';
import { groupChannelStyles } from './style';

const channles = createChannels({
  x1: createChannel({ name: 'x1', optional: false }),
  y1: createChannel({ name: 'y1', optional: false }),
  z: createChannel({ name: 'z' }),
});

const render: RenderFunction = (
  renderer,
  I,
  scales,
  values,
  styles,
  coordinate
) => {
  const defaults = {};
  const { x: X, y: Y, x1: X1, y1: Y1, z: Z } = values;
  const series = Z ? group(I, (i) => Z[i]).values() : [I];

  return Array.from(series, (I) =>
    pathArea(renderer, coordinate, {
      ...defaults,
      ...styles,
      ...groupChannelStyles(I, values),
      X1: X,
      Y1: Y,
      X2: X1,
      Y2: Y1,
      I,
    })
  );
};

export const area = createGeometry(channles, render);
