import { DragState } from '@shared/utils/drag';

export interface Annotation {
  id: string;
  text: string;
  pageNumber: number;
  x: number;
  y: number;
}

export interface AnnotationPosition {
  x: number;
  y: number;
}

export interface ActiveDragState extends DragState {
  annotationId: string;
}
