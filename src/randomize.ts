interface RandomOptions {
  readonly include?: boolean;
}

export const random = (
  min: number,
  max: number,
  { include = false }: RandomOptions = {}
): number => Math.random() * (max - min + (include ? 1 : 0)) + min;

export const randomize = (effects: ReadonlyArray<string>): string =>
  effects.length === 1
    ? effects[0]
    : effects[Math.floor(random(0, effects.length))];
