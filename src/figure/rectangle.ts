import { Figure, Shape, ShapeInfo } from './base';

export interface Rectangle extends Figure {}

/** Create rectangle figure. */
export const rectangle: Shape<Rectangle> = ({
  centerCellRow,
  cellsInHalfWidth,
  centerCellColumn,
  cellsInHalfHeight,
}: ShapeInfo) => ({
  include: ({ row, column }) =>
    Math.abs(column - centerCellColumn) <= cellsInHalfWidth &&
    Math.abs(row - centerCellRow) <= cellsInHalfHeight,
});
