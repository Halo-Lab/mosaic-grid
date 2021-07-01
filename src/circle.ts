import { Shift } from './types';
import { Figure, FigureCreator } from './figure';

export interface Circle extends Figure {}

export interface CircleOptions {
  readonly shift: Shift;
  readonly range: number;
}

/** Create circle figure. */
export const circle: FigureCreator<Circle> = (grid) => (shift, range) => {
  const radius = (Math.min(grid.height, grid.width) / 2) * range;

  const cellsInRadius = grid.cellsIn(radius);

  const centerCellNumber = grid.cellNumber(grid.actualPosition(shift));
  const centerCellRow = grid.rowOf(centerCellNumber);
  const centerCellColumn = grid.columnOf(centerCellNumber);

  return {
    shift,
    range,

    include: (cellNumber: number): boolean => {
      const cellRow = grid.rowOf(cellNumber);
      const cellColumn = grid.columnOf(cellNumber);

      return (
        Math.pow(cellsInRadius, 2) >=
        Math.pow(cellRow - centerCellRow, 2) +
          Math.pow(cellColumn - centerCellColumn, 2)
      );
    },
  };
};
