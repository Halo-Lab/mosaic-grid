export const randomize = (effects: ReadonlyArray<string>): string =>
  effects.length === 1
    ? effects[0]
    : effects[Math.floor(Math.random() * effects.length)];
