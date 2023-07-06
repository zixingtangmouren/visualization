export function curry<T extends Function>(fn: T) {
  const arity = fn.length;
  return function curried(...args: any[]): any {
    // 如果没有传入参数就把参数列表设置为 [undefined]
    const newArgs = args.length === 0 ? [undefined] : args;
    if (newArgs.length >= arity) return fn(...newArgs);
    return curried.bind(null, ...newArgs);
  };
}

export function identity(x: any) {
  return x;
}

export function compose(...rest: Function[]) {
  return rest.reduce((total, cur) => (x: any) => cur(total(x)), identity);
}

/**
 * 根据对应的 key 进行分组
 * @param array
 * @param key
 * @returns
 */
export function group(array: any[], key = (d) => d) {
  const keyGroups = new Map();
  for (const item of array) {
    const k = key(item);
    const g = keyGroups.get(k);
    if (g) {
      g.push(item);
    } else {
      keyGroups.set(k, [item]);
    }
  }
  return keyGroups;
}

export function sub([x1, y1]: [number, number], [x0, y0]: [number, number]) {
  return [x1 - x0, y1 - y0];
}

export function equal([x1, y1]: [number, number], [x0, y0]: [number, number]) {
  return x1 === x0 && y1 === y0;
}
