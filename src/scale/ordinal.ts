import { equal } from './utils';

interface CreateOrdinal {
  domain: any[];
  range: any[];
}

/**
 * 序数比例尺
 * @param param0
 * @returns
 */
export function createOrdinal({ domain, range }: CreateOrdinal) {
  return (x: any) => {
    const index = domain.findIndex((d) => equal(d, x));
    return range[index % range.length];
  };
}
