import { random } from './randomize';

const uniqueList = (numbers: ReadonlyArray<number>) =>
  Array.from(new Set(numbers));

export const indexesToExclude = (
  cells: number,
  density: number
): ReadonlyArray<number> => {
  const excludeCount = Math.floor(cells * (1 - density));
  const indexes = uniqueList(
    new Array(excludeCount).fill(0).map(() => Math.floor(random(0, cells)))
  );

  return indexes.length >= excludeCount
    ? indexes.slice(0, excludeCount)
    : indexesToExclude(cells, density);
};
