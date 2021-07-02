/** Calculates background position of image in every cell. */
export const backgroundPosition = (columns: number) => (
  cell: number
): [x: string, y: string] => [
  `${((cell - 1) % columns) * -100}%`,
  `${Math.floor((cell - 1) / columns) * -100}%`,
];
