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

const calculateCellsCount = (cell: number) => (distance: number) =>
  Math.ceil(distance / cell);

/** Creates grid instance. */
export const grid = ({ width, height, cell }: GridOptions): Grid => {
  const rows = Math.ceil(height / cell);
  const columns = Math.ceil(width / cell);
  const centerX = width / 2;
  const centerY = height / 2;

  const cellsIn = calculateCellsCount(cell);

  return {
    cell,
    rows,
    width,
    height,
    columns,

    rowOf: (cellNumber) => Math.ceil(cellNumber / columns),
    cellsIn,
    columnOf: (cellNumber) =>
      cellNumber % columns === 0 ? columns : cellNumber % columns,
    cells: () => new Array(columns * rows).fill(0).map((_, index) => index + 1),
    cellNumber: ({ x, y }: Position): number =>
      // Cells, rows and columns are started from 1, so when
      // we get 0, then we should return 1 so cell number is
      // calculated correctly.
      (cellsIn(x) || 1) + ((cellsIn(y) || 1) - 1) * columns,
    actualPosition: ({ dx, dy }: Shift): Position => ({
      x: centerX * (1 + dx),
      y: centerY * (1 - dy),
    }),
  };
};
