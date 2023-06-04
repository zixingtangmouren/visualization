import { createLinear } from './linear';

interface CreateTime {
  domain: [Date, Date];
  range: [number, number];
}

/**
 * 时间比例尺
 * @param param0
 * @returns
 */
export function createTime({ domain, range }: CreateTime) {
  const transform = (x: Date) => x.getTime();
  const transformedDomain = domain.map(transform);

  const linear = createLinear({
    domain: transformedDomain as [number, number],
    range,
  });

  const scale = (x: Date) => linear(transform(x));

  scale.nice = (tickCount: number) => {
    linear.nice(tickCount);
  };
  scale.ticks = (tickCount: number) =>
    linear.ticks(tickCount).map((d) => new Date(d));

  return scale;
}
