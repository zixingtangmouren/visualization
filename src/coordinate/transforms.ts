interface Transformer extends Function {
  type: () => string;
}

/**
 * 转换
 * @param type
 * @param transformer
 * @returns
 */
export function transform(type: string, transformer: any) {
  const _transformer: Transformer = transformer;
  _transformer.type = () => type;
  return _transformer;
}

// 平移
export function translate(tx = 0, ty = 0) {
  return transform('translate', ([px, py]: [number, number]) => [
    px + tx,
    py + ty,
  ]);
}

// 缩放
export function scale(sx = 1, sy = 1) {
  return transform('scale', ([px, py]: [number, number]) => [px * sx, py * sy]);
}

// 反置
export function reflect() {
  return transform('reflect', scale(-1, -1));
}

export function reflectX() {
  return transform('reflectX', scale(-1, 1));
}

export function reflectY() {
  return transform('reflectY', scale(1, -1));
}

// 转置
export function transpose() {
  return transform('transpose', ([px, py]: [number, number]) => [py, px]);
}

export function polar() {
  // 这里我们把点的第一个维度作为 theta
  // 第二个维度作为 radius
  return transform('polar', ([theta, radius]: [number, number]) => {
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    return [x, y];
  });
}
