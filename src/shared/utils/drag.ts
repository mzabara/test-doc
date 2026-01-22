export interface DragState {
  pageElement: HTMLElement;
  offsetX: number;
  offsetY: number;
}

export interface Position {
  x: number;
  y: number;
}

const clampRatio = (value: number): number => Math.min(1, Math.max(0, value));

export const getPointerRatio = (event: PointerEvent, pageElement: HTMLElement): Position => {
  const rect = pageElement.getBoundingClientRect();
  return {
    x: clampRatio((event.clientX - rect.left) / rect.width),
    y: clampRatio((event.clientY - rect.top) / rect.height)
  };
};

export const createDragState = (
  event: PointerEvent,
  pageElement: HTMLElement,
  position: Position
): DragState => {
  const rect = pageElement.getBoundingClientRect();
  return {
    pageElement,
    offsetX: (event.clientX - rect.left) / rect.width - position.x,
    offsetY: (event.clientY - rect.top) / rect.height - position.y
  };
};

export const getDraggedRatio = (event: PointerEvent, state: DragState): Position => {
  const rect = state.pageElement.getBoundingClientRect();
  return {
    x: clampRatio((event.clientX - rect.left) / rect.width - state.offsetX),
    y: clampRatio((event.clientY - rect.top) / rect.height - state.offsetY)
  };
};
