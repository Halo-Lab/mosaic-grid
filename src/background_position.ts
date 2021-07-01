/** Calculates background position of image in every cell. */
export const backgroundPosition = (columns: number) => (cell: number) =>
  `${((cell - 1) % columns) * -100}% ${
    Math.floor((cell - 1) / columns) * -100
  }%`;
