export interface CreateThreshold {
  domain: number[];
  range: any[];
}

/**
 * 临界值比例尺
 * [domain0, domain1] 线性分布
 * @param param0
 * @returns
 */
export function createThreshold({ domain, range }: CreateThreshold) {
  const n = Math.min(domain.length, range.length - 1);
  return (x: number) => {
    const index = domain.findIndex((v) => x < v);
    return range[index === -1 ? n : index];
  };
}
