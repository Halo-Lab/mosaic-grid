import { grid } from './grid';
import { Range } from './range';
import { Shift } from './types';
import { getSizeFrom } from './sizes';
import { ANCHOR_CLASS } from './classes';
import { indexesToExclude } from './distribution';
import { getAnchorElement } from './anchor_element';
import { Figure, figure, Shape } from './figure';
import { addCSSProperties, generateHTML } from './html';

export interface MosaicOptions {
  /** Length of cell. By default, it is **20px**. */
  readonly cell?: number;
  /** Describes figure shift from grid center. */
  readonly shift: Shift;
  /** Defines size of figure relative to lowest side of a grid. */
  readonly range: Range;
  /** Width of grid. */
  readonly width?: number;
  /** Height of grid. */
  readonly height?: number;
  /** Function that is used to build figure. */
  readonly shape: Shape<Figure>;
  /**
   * Element in DOM from which _width_ and _height_
   * can be taken. If _width_, _height_ and _element_
   * are provided then first two arguments will take
   * precedence while calculating size.
   */
  readonly element?: string | HTMLElement;
  /**
   * Classes that will be added randomly to cells that
   * will be covered by figure.
   */
  readonly effects?: ReadonlyArray<string>;

  /**
   * Defines amount of cells that will be transformed with
   * effects. It should be a number from `0` to `1`.
   * By default, it is equal to `1`.
   */
  readonly density?: number;
}

/** Instantiate mosaic builder. */
export const mosaic = ({
  cell = 20,
  width,
  shift,
  shape,
  range,
  height,
  element,
  density = 1,
  effects = [],
}: MosaicOptions): void => {
  const anchorElement = getAnchorElement(element);

  const { width: w, height: h } = getSizeFrom({
    element: anchorElement,
    width,
    height,
  });

  const gridInstance = grid({
    cell,
    width: w,
    height: h,
  });

  const shapeInstance = figure(gridInstance)(shift, range)(shape);

  const isAnchorElementImage = anchorElement instanceof HTMLImageElement;

  const cells = gridInstance.cells().map((cell) => ({
    number: cell,
    inFigure: shapeInstance.include({
      row: gridInstance.rowOf(cell),
      column: gridInstance.columnOf(cell),
    }),
  }));

  const affectedCells = cells.filter(({ inFigure }) => inFigure);
  const excludedIndexes = indexesToExclude(affectedCells.length, density);

  const filteredCells = affectedCells
    .filter((_, index) => !excludedIndexes.includes(index))
    .map(({ number }) => number);

  const createdGridElement = generateHTML(
    cells.map((cell) =>
      cell.inFigure && !filteredCells.includes(cell.number)
        ? { ...cell, inFigure: false }
        : cell
    ),
    effects
  );

  anchorElement.after(
    addCSSProperties(gridInstance, createdGridElement, {
      isImage: isAnchorElementImage,
      imageSrc: isAnchorElementImage
        ? (anchorElement as HTMLImageElement).src
        : '',
    })
  );

  anchorElement.classList.add(ANCHOR_CLASS);
};
