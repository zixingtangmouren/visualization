/**
 * 创建 SVG 元素
 * @param type
 * @returns
 */
export function createSVGElement(type: string) {
  return document.createElementNS('http://www.w3.org/2000/svg', type);
}

/**
 * 挂载元素节点
 * @param parent
 * @param child
 */
export function mount(parent: SVGElement, child: SVGElement) {
  parent.appendChild(child);
}

/**
 * 设置元素属性
 * @param element
 * @param attributes
 */
export function applyAttributes(
  element: SVGElement,
  attributes: Record<string, string | number>
) {
  for (const [key, value] of Object.entries(attributes)) {
    const kebabCaseKey = key.replace(
      /[A-Z]/g,
      (d) => `-${d.toLocaleLowerCase()}`
    );
    element.setAttribute(kebabCaseKey, String(value));
  }
}

/**
 * 设置变换属性
 * @param element
 * @param transform
 */
export function applyTransform(element: SVGElement, transform: string) {
  const oldTransform = element.getAttribute('transform') ?? '';
  const prefix = oldTransform ? `${oldTransform} ` : '';
  element.setAttribute('transform', `${prefix}${transform}`);
}
