import { createChannel, createChannels } from './channel';
import { createGeometry, type RenderFunction } from './geometry';
import { rect as shapeRect } from './shape';
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
  const defaultStyle = { fill: '#000' };
  const { x: X, y: Y, x1: X1, y1: Y1 } = values;

  return Array.from(I, (i) =>
    shapeRect(renderer, coordinate, {
      ...defaultStyle,
      ...channelStyles(i, values),
      ...styles,
      x1: X[i],
      y1: Y[i],
      x2: X1[i],
      y2: Y1[i],
    })
  );
};

export const rect = createGeometry(channels, render);
