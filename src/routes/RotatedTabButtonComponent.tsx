import React from 'react';
import { ButtonComponentProps } from './sidebarTabNavigator/types';
import {
  LayoutChangeEvent,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import { marginSize } from './styles';

const RotatedTabButtonComponent = (props: ButtonComponentProps) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    route,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    focused,
    onPress,
    onLongPress,
    testID,
    style,
    accessibilityLabel,
    accessibilityRole,
    accessibilityStates,
    children,
    ...rest
  } = props;

  interface LayoutState {
    width?: number;
    height?: number;
  }
  const [layout, setLayout] = React.useState<LayoutState>({});
  const layoutDetermined = React.useRef(false);
  const onLayout = React.useCallback<(e: LayoutChangeEvent) => void>(
    ({
      nativeEvent: {
        layout: { width, height },
      },
    }) => {
      if (!layoutDetermined.current) {
        setLayout({
          width: height,
          height: width,
        });
        layoutDetermined.current = true;
      }
    },
    [layout],
  );

  const mappedChildren = React.useMemo(() => {
    if (layout.width && layout.height) {
      const { width: height, height: width } = layout;
      return React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          const offset = width / 2 - height / 2 - marginSize;
          return React.cloneElement(child, {
            style: [
              child.props.style,
              {
                width: width,
                height: height,
                transform: [{ rotate: '90deg' }, { translateX: offset }],
              },
            ],
          });
        }
      });
    } else {
      return children;
    }
  }, [children, layout]);

  const isReady = layout.width && layout.height;
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onLongPress={onLongPress}
      testID={testID}
      hitSlop={{ left: 5, right: 0, top: 15, bottom: 15 }}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityStates={accessibilityStates}>
      <View
        onLayout={onLayout}
        style={StyleSheet.flatten([
          style,
          {
            width: layout.width ? layout.width : undefined,
            height: layout.height ? layout.height : undefined,
            opacity: isReady ? 1 : 0,
            position: isReady ? 'relative' : 'absolute',
          },
        ])}
        children={mappedChildren}
        {...rest}></View>
    </TouchableWithoutFeedback>
  );
};

export default RotatedTabButtonComponent;
