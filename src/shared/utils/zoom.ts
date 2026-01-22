function roundZoom(value: number): number {
  return Math.round(value * 100) / 100;
}

export function zoomIn(value: number, maxZoom: number, step: number): number {
  return Math.min(maxZoom, roundZoom(value + step));
}

export function zoomOut(value: number, minZoom: number, step: number): number {
  return Math.max(minZoom, roundZoom(value - step));
}
