import { Shape } from './base';
import { Rectangle, rectangle } from './rectangle';

export interface Square extends Rectangle {}

/**
 * Create circle figure.
 * Its size equals to the lowest side of grid.
 */
export const square: Shape<Square> = ({
  centerCellRow,
  cellsInHalfWidth,
  cellsInHalfHeight,
  centerCellColumn,
}) =>
  rectangle({
    centerCellRow,
    centerCellColumn,
    cellsInHalfWidth: Math.min(cellsInHalfWidth, cellsInHalfHeight),
    cellsInHalfHeight: Math.min(cellsInHalfWidth, cellsInHalfHeight),
  });
