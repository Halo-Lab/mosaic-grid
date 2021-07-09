import { Figure, Shape } from './base';

export interface Circle extends Figure {}

/** 
 * Create circle figure.
 * Its diameter equals to the lowest side of grid.
 */
export const circle: Shape<Circle> = ({
  centerCellRow,
  centerCellColumn,
  cellsInHalfWidth,
  cellsInHalfHeight,
}) => ({
  include: ({ row, column }) =>
    Math.min(cellsInHalfWidth, cellsInHalfHeight) ** 2 >=
    (row - centerCellRow) ** 2 + (column - centerCellColumn) ** 2,
});
