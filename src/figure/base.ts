import { Grid } from '../grid';
import { Shift } from '../types';
import { convertRange, Range } from '../range';

export interface FigureInfo {
  readonly row: number;
  readonly column: number;
}

/**
 * Describes generic shape of figure that will be
 * created under a grid and defines area that will be
 * transformed with some effect.
 */
export interface Figure {
  /** Checks if _cell_ is inside figure's area. */
  include(info: FigureInfo): boolean;
}

export interface ShapeInfo {
  readonly centerCellRow: number;
  readonly centerCellColumn: number;
  readonly cellsInHalfWidth: number;
  readonly cellsInHalfHeight: number;
}

export interface Shape<F extends Figure> {
  (info: ShapeInfo): F;
}

/** Builds figure. */
export const figure =
  <F extends Figure>(grid: Grid) =>
  (shift: Shift, range: Range) =>
  (shape: Shape<F>) => {
    const { x, y } = convertRange(range);

    const halfWidth = (grid.width / 2) * x;
    const halfHeight = (grid.height / 2) * y;

    const cellsInHalfWidth = grid.cellsIn(halfWidth);
    const cellsInHalfHeight = grid.cellsIn(halfHeight);

    const centerCellNumber = grid.cellNumber(grid.actualPosition(shift));
    const centerCellRow = grid.rowOf(centerCellNumber);
    const centerCellColumn = grid.columnOf(centerCellNumber);

    return shape({
      centerCellRow,
      cellsInHalfWidth,
      centerCellColumn,
      cellsInHalfHeight,
    });
  };
