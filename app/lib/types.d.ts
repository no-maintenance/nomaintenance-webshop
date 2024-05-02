type RequiredBy<T, K extends keyof T> = Omit<T, K> &
  Omit<T, K> &
  Pick<Required<T>, K>;

export function hasProperty<T extends object, K extends keyof T>(
  obj: T | RequiredBy<T, K>,
  ...keys: K[]
): obj is RequiredBy<T, K> {
  return !keys.some((x) => !obj[x]);
}

export function notEmpty<TValue>(
  value: TValue | null | undefined,
): value is TValue {
  return value !== null && value !== undefined;
}

export type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};
