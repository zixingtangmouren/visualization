import { group } from '../utils';
import { createChannel, createChannels } from './channel';
import { createGeometry, type RenderFunction } from './geometry';
import { line as shapeLine } from './shape';
import { groupChannelStyles } from './style';

const channels = createChannels({
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
  const defaultStyles = {
    stroke: '#000',
  };
  const { x: X, y: Y, z: Z } = values;
  const series = Z ? group(I, (i) => Z[i]).values() : [I];
  return Array.from(series, (I) => {
    console.log(I);
    return shapeLine(renderer, coordinate, {
      ...defaultStyles,
      ...styles,
      ...groupChannelStyles(I, values),
      X,
      Y,
      I,
      fill: 'none',
    });
  });
};

export const line = createGeometry(channels, render);
