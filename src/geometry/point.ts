import { createChannel, createChannels } from './channel';
import { createGeometry, type RenderFunction } from './geometry';
import { circle } from './shape';
import { channelStyles } from './style';

const channels = createChannels({
  r: createChannel({ name: 'r' }),
});

const render: RenderFunction = (
  renderer,
  I,
  scales,
  values,
  directStyles,
  coordinate
) => {
  const defaults = {
    r: 3,
    fill: 'none',
  };

  const { x: X, y: Y, r: R = [] } = values;
  return Array.from(I, (i) => {
    const { r: dr, ...restDefaults } = defaults;
    const r = R[i] || dr;
    return circle(renderer, coordinate, {
      ...restDefaults,
      ...directStyles,
      ...channelStyles(i, values),
      cx: X[i],
      cy: Y[i],
      r,
    });
  });
};

export const point = createGeometry(channels, render);
