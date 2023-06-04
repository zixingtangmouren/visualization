import { type CreateBand, createBand } from './band';

export function createPoint(options: Omit<CreateBand, 'padding'>) {
  return createBand({ ...options, padding: 1 });
}
