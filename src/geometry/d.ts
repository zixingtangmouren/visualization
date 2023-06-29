export function pathLine([p0, ...points]: number[][]) {
  return [['M', ...p0], ...points.map((p) => ['L', ...p])];
}

export function pathArea(points: number[][]) {
  const pathList = pathLine(points);
  pathList.push(['Z']);
  return pathList;
}
