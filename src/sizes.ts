import { getAnchorElement } from './anchor_element';

export interface SizeOptions {
  readonly width?: number;
  readonly height?: number;
  readonly element?: string | HTMLElement;
}

export interface Size {
  readonly width: number;
  readonly height: number;
}

export const getSizeFrom = ({ width, height, element }: SizeOptions): Size => {
  const linkToElement = getAnchorElement(element);

  return linkToElement instanceof HTMLImageElement
    ? {
        width: width ?? linkToElement.naturalWidth,
        height: height ?? linkToElement.naturalHeight,
      }
    : {
        width: width ?? linkToElement.offsetWidth,
        height: height ?? linkToElement.offsetHeight,
      };
};
