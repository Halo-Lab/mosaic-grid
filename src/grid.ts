import { Position, Shift } from './types';

/** Describes grid instance. */
export interface Grid {
  /** Holds cell's size, that was provided to `mosaic` function. */
  readonly cell: number;
  /** Number of rows in grid. */
  readonly rows: number;
  /** Width of the grid in pixels. */
  readonly width: number;
  /** Height of the grid in pixels. */
  readonly height: number;
  /** Number of columns in grid. */
  readonly columns: number;

  /** Gets row number which the cell belongs to. */
  rowOf(cellNumber: number): number;
  /** Gets amount of all cells. */
  cells(): ReadonlyArray<number>;
  /** Calculates how many cells can fit some distance. */
  cellsIn(distance: number): number;
  /** Gets column number which the cell belongs to. */
  columnOf(cellNumber: number): number;
  /** Finds cell number that is in the provided position. */
  cellNumber(position: Position): number;
  /** Get actual position of shift from central grid point. */
  actualPosition(shift: Shift): Position;
}

export interface GridOptions {
  readonly cell: number;
  readonly width: number;
  readonly height: number;
}

/** Creates grid instance. */
export const grid = ({ width, height, cell }: GridOptions): Grid => {
  const rows = Math.ceil(height / cell);
  const columns = Math.ceil(width / cell);
  const centerX = width / 2;
  const centerY = height / 2;

  return {
    cell,
    rows,
    width,
    height,
    columns,

    rowOf: (cellNumber) => Math.ceil(cellNumber / columns),
    cellsIn: (distance: number) => Math.ceil(distance / cell),
    columnOf: (cellNumber) => cellNumber % columns,
    cells: () => new Array(columns * rows).fill(0).map((_, index) => index + 1),
    cellNumber: ({ x, y }: Position): number =>
      Math.ceil(x / cell) + (Math.ceil(y / cell) - 1) * columns,
    actualPosition: ({ dx, dy }: Shift): Position => {
      const shiftX = centerX * dx;
      const shiftY = centerY * dy;

      return {
        x: centerX + shiftX,
        y: centerY - shiftY,
      };
    },
  };
};
