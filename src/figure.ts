import { Grid } from './grid';
import { Shift } from './types';

/**
 * Describes generic shape of figure that will be
 * created under a grid and defines area that will be
 * transformed with some effect.
 */
export interface Figure {
  /** Value from `0` to `1` including, that affects a size of the figure. */
  readonly range: number;
  readonly shift: Shift;

  /** Checks if _cell_ is inside figure's area. */
  include(cell: number): boolean;
}

export interface FigureCreator<S extends Figure> {
  (grid: Grid): (shift: Shift, range: number) => S;
}
