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
