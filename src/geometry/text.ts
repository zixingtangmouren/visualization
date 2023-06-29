import { createChannel, createChannels } from './channel';
import { createGeometry, type RenderFunction } from './geometry';
import { text as shapeText } from './shape';
import { channelStyles } from './style';

const channels = createChannels({
  rotate: createChannel({ name: 'rotate' }),
  fontSize: createChannel({ name: 'fontSize' }),
  fontWeight: createChannel({ name: 'fontWeight' }),
  text: createChannel({ name: 'text', optional: false, scale: 'identity' }),
});

const render: RenderFunction = (
  renderer,
  I,
  scales,
  values,
  directStyles,
  coordinate
) => {
  const defaultStyles = {
    rotate: 0,
    fontSize: 14,
    fontWeight: 'normal',
  };

  const {
    x: X,
    y: Y,
    rotate: R = [],
    fontSize: FS = [],
    fontWeight: FW = [],
    text: T,
  } = values;

  return Array.from(I, (i) => {
    return shapeText(renderer, coordinate, {
      ...directStyles,
      ...channelStyles(i, values),
      x: X[i],
      y: Y[i],
      rotate: R[i] || defaultStyles.rotate,
      fontSize: FS[i] || defaultStyles.fontSize,
      fontWeight: FW[i] || defaultStyles.fontWeight,
      text: T[i],
    });
  });
};

export const text = createGeometry(channels, render);
