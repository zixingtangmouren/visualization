import { createChannel, createChannels } from './channel';
import { createGeometry, type RenderFunction } from './geometry';
import { link as shapeLink } from './shape';
import { channelStyles } from './style';

const channels = createChannels({
  x1: createChannel({ name: 'x1', optional: false }),
  y1: createChannel({ name: 'y1', optional: false }),
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
    fill: '#000',
    stroke: '#000',
  };
  const { x, y, x1, y1 } = values;
  return Array.from(I, (i) => {
    return shapeLink(renderer, coordinate, {
      ...defaultStyles,
      ...channelStyles(i, values),
      ...styles,
      x: x[i],
      y: y[i],
      x1: x1[i],
      y1: y1[i],
    });
  });
};

export const link = createGeometry(channels, render);
