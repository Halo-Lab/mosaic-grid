import { iterate } from '@fluss/core';

import { Grid } from './grid';
import { random } from './randomize';
import { Figure } from './figure';
import { CellInfo } from './types';

const indexesToExclude = (
  cells: number,
  density: number
): ReadonlyArray<number> =>
  iterate(function* () {
    while (true) {
      yield Math.floor(random(0, cells));
    }
  })
    .uniqueBy((n) => n)
    .take(Math.floor(cells * (1 - density)))
    .asArray();

export const finalCells = (
  grid: Grid,
  figure: Figure,
  density: number
): ReadonlyArray<CellInfo> => {
  const cells = grid.cells().map((cell) => ({
    number: cell,
    inFigure: figure.include({
      row: grid.rowOf(cell),
      column: grid.columnOf(cell),
    }),
  }));

  const affectedCells = cells.filter(({ inFigure }) => inFigure);
  const excludedIndexes = indexesToExclude(affectedCells.length, density);

  const filteredCells = affectedCells
    .filter((_, index) => !excludedIndexes.includes(index))
    .map(({ number }) => number);

  return cells.map((cell) =>
    cell.inFigure && !filteredCells.includes(cell.number)
      ? { ...cell, inFigure: false }
      : cell
  );
};
