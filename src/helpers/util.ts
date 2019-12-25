import { StyleSheet, StyleProp } from 'react-native';

export const styleJoiner = <T>(...args: StyleProp<T>[]) =>
  StyleSheet.flatten(...args);

export default {};
