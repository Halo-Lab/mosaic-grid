/**
 * Describes growth of irregular structure with
 * only two unequal sides.
 */
interface Range2 {
  readonly x: number;
  readonly y: number;
}

/**
 * Describes growth of figure in two-dimensional place.
 * For simple figures with equal sides such as circle, square
 * it should be simple `number`, but for rectangle it is
 * `object`.
 */
export type Range = number | Range2;

/** Returns correct range for given dimension. */
export const convertRange = (value: Range): Range2 =>
  typeof value === 'object' ? value : { x: value, y: value };
