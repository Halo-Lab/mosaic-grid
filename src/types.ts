/**
 * Describes offset of figure depending on center of the grid.
 * _dx_ and _dy_ can be in range from **-1** to **1** including.
 */
export interface Shift {
  readonly dx: number;
  readonly dy: number;
}

/**
 * Describes exact position of some point in pixels,
 * from top left corner.
 */
export interface Position {
  readonly x: number;
  readonly y: number;
}

export interface CellInfo {
  readonly number: number;
  readonly inFigure: boolean;
}

/** Instance of cell of the grid. */
export type Cell<T extends Element> = T & { __number: number };
