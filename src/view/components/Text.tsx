import React, { Component, PropsWithChildren } from 'react';
import { Text as ReactNativeText, StyleSheet, TextStyle } from 'react-native';
import { TextProps } from 'react-native';

interface Props extends PropsWithChildren<TextProps> {}

const Text = ({ style, ...props }: Props) => {
  return (
    <ReactNativeText
      style={StyleSheet.flatten([styles.text, style])}
      {...props}></ReactNativeText>
  );
};

export default Text;

const styles = StyleSheet.create<{ text: TextStyle }>({
  text: {
    fontSize: 22,
  },
});
