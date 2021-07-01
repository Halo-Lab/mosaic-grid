import { Grid } from './grid';
import { randomize } from './randomize';
import { Cell, CellInfo } from './types';
import { backgroundPosition } from './background_position';
import { CELL_CLASS, CONTAINER_CLASS, IMAGE_CELL_CLASS } from './classes';

/**
 * Generates HTML that will replace <img> or other block element
 * on the page. Already generates changed zone.
 */
export const generateHTML = (
  cells: ReadonlyArray<CellInfo>,
  effects: ((cell: number) => string) | ReadonlyArray<string>
): HTMLDivElement => {
  const container = document.createElement('div');
  container.classList.add(CONTAINER_CLASS);

  cells.forEach(({ number, inFigure }) => {
    const cell = document.createElement('span') as Cell<HTMLSpanElement>;
    cell.classList.add(CELL_CLASS);
    if (inFigure) {
      const className =
        typeof effects === 'function' ? effects(number) : randomize(effects);
      // Also should discard an empty string in
      // order to avoid DOMException.
      if (className !== '') {
        // Users may not provide there string value,
        // so we should transform value into string.
        cell.classList.add(String(className));
      }
    }
    cell.__number = number;

    container.append(cell);
  });

  return container;
};

export interface AddCSSPropertiesOptions {
  readonly isImage: boolean;
  readonly imageSrc: string;
}

export const addCSSProperties = (
  grid: Grid,
  to: HTMLDivElement,
  options: AddCSSPropertiesOptions
): HTMLDivElement => {
  to.style.setProperty('--rows', String(grid.rows));
  to.style.setProperty('--columns', String(grid.columns));
  to.style.setProperty('--cellDimension', `${grid.cell}px`);

  if (options.isImage) {
    const positionOf = backgroundPosition(grid.columns);

    Array.from(to.children).forEach((cell) => {
      (cell as Cell<HTMLSpanElement>).classList.add(IMAGE_CELL_CLASS);
      (cell as Cell<HTMLSpanElement>).style.setProperty(
        '--img',
        `url(${options.imageSrc})`
      );
      (cell as Cell<HTMLSpanElement>).style.setProperty(
        '--backgroundPosition',
        positionOf((cell as Cell<HTMLSpanElement>).__number)
      );
    });
  }

  return to;
};
