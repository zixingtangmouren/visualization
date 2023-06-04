// src/scale/quantile.js

import { createThreshold } from './threshold';

interface CreateQuantile {
  domain: number[];
  range: any[];
}

export function createQuantile({ domain, range }: CreateQuantile) {
  const n = range.length - 1;
  const sortedDomain = domain.sort((a, b) => a - b);
  const step = (sortedDomain.length - 1) / (n + 1);
  const quantileDomain = new Array(n).fill(0).map((_, index) => {
    const i = (index + 1) * step;
    const i0 = Math.floor(i);
    const i1 = i0 + 1;
    const v0 = sortedDomain[i0];
    const v1 = sortedDomain[i1];
    return v0 * (i1 - i) + v1 * (i - i0);
  });
  return createThreshold({ domain: quantileDomain, range });
}
