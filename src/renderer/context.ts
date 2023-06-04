import { createSVGElement, mount } from './utils';

export interface Context {
  node: SVGElement;
  group: SVGElement;
}

export function createContext(width: number, height: number) {
  const svg = createSVGElement('svg');
  svg.setAttribute('width', String(width));
  svg.setAttribute('height', String(height));
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  const g = createSVGElement('g');
  mount(svg, g);

  return {
    node: svg,
    group: g,
  };
}
