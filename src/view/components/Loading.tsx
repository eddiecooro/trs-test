import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ActivityIndicatorProps,
  ViewStyle,
} from 'react-native';

import { colors } from 'view/style/theme';

type Props = ActivityIndicatorProps & {};

const Loading = ({ size = 'small', color = colors.primary }: Props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create<{ container: ViewStyle }>({
  container: {
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default Loading;
