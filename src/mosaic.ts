import { grid } from './grid';
import { Shift } from './types';
import { getSizeFrom } from './sizes';
import { ANCHOR_CLASS } from './classes';
import { getAnchorElement } from './anchor_element';
import { Figure, FigureCreator } from './figure';
import { addCSSProperties, generateHTML } from './html';

export interface MosaicOptions {
  /** Length of cell. By default, it is **20px**. */
  readonly cell?: number;
  /** Describes figure shift from grid center. */
  readonly shift: Shift;
  /** Defines size of fugure relative to lowest side of a grid. */
  readonly range: number;
  /** Width of grid. */
  readonly width?: number;
  /** Height of grid. */
  readonly height?: number;
  /** Function that is used to build figure. */
  readonly figure: FigureCreator<Figure>;
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
}

/** Instantiate mosaic builder. */
export const mosaic = ({
  cell = 20,
  width,
  shift,
  range,
  height,
  element,
  effects = [],
  figure,
}: MosaicOptions): void => {
  const anchorElement = getAnchorElement(element);

  const { width: w, height: h } = getSizeFrom({
    element: anchorElement,
    width,
    height,
  });

  const gridInstance = grid({
    width: w,
    height: h,
    cell,
  });

  const figureBoundWithGrid = figure(gridInstance);

  const isAnchorElementImage = anchorElement instanceof HTMLImageElement;

  const cells = gridInstance.cells().map((cell) => ({
    number: cell,
    inFigure: figureBoundWithGrid(shift, range).include(cell),
  }));

  const createdGridElement = generateHTML(cells, effects);

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
