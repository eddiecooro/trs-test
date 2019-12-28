import { StyleSheet, StyleProp } from 'react-native';

export const styleJoiner = <T>(...args: StyleProp<T>[]) =>
  StyleSheet.flatten(...args);

export const fromEntries = <K extends string | number = string, T = any>(
  entries: Array<readonly [K, T]>,
): { [k in K]: T } => {
  return entries.reduce(
    (prev, current) => ({ ...prev, [current[0]]: current[1] }),
    {},
  ) as any;
};

export const unique = <T>(
  arr: Array<T>,
  uniqueFieldExtractor: (item: T) => any = i => i,
): Array<T> => {
  const result: Array<T> = [];
  const map = new Map();
  for (const item of arr) {
    const uniqueField = uniqueFieldExtractor(item);
    if (!map.has(uniqueField)) {
      map.set(uniqueField, true);
      result.push(item);
    }
  }
  return result;
};
