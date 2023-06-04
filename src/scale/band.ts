import { createOrdinal } from './ordinal';
import { band } from './utils';

export interface CreateBand {
  domain: any[];
  range: [number, number];
  padding: number;
}

interface OrdinalScale extends Function {
  bandWidth: () => number;
  step: () => number;
}

export function createBand(options: CreateBand) {
  const { bandWidth, step, bandRange } = band(options);
  const scale: OrdinalScale = createOrdinal({
    domain: options.domain,
    range: bandRange,
  }) as any;

  scale.bandWidth = () => bandWidth;
  scale.step = () => step;

  return scale;
}
