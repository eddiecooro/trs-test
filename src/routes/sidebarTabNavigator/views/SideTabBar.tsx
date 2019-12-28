import React from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Keyboard,
  Platform,
  LayoutChangeEvent,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  ThemeColors,
  ThemeContext,
  NavigationRoute,
  ScrollView,
} from 'react-navigation';

import CrossFadeIcon from './CrossFadeIcon';
import withDimensions from '../utils/withDimensions';
import {
  BottomTabBarProps,
  ButtonComponentProps,
  KeyboardHidesTabBarAnimationConfig,
  KeyboardAnimationConfig,
} from '../types';

type State = {
  layout: { height: number; width: number };
  keyboard: boolean;
  visible: Animated.Value;
};

const majorVersion = parseInt(Platform.Version as string, 10);
const isIos = Platform.OS === 'ios';
const isIOS11 = majorVersion >= 11 && isIos;

const DEFAULT_MAX_TAB_ITEM_WIDTH = 125;
const DEFAULT_KEYBOARD_ANIMATION_CONFIG: KeyboardHidesTabBarAnimationConfig = {
  show: {
    animation: 'timing',
    config: {
      useNativeDriver: true,
      duration: 150,
    },
  },
  hide: {
    animation: 'timing',
    config: {
      useNativeDriver: true,
      duration: 100,
    },
  },
};

class TouchableWithoutFeedbackWrapper extends React.Component<
  ButtonComponentProps
> {
  render() {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      route,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      focused,
      onPress,
      onLongPress,
      testID,
      accessibilityLabel,
      accessibilityRole,
      accessibilityStates,
      ...rest
    } = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={onPress}
        onLongPress={onLongPress}
        testID={testID}
        hitSlop={{ left: 5, right: 0, top: 15, bottom: 15 }}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={accessibilityRole}
        accessibilityStates={accessibilityStates}>
        <View {...rest} />
      </TouchableWithoutFeedback>
    );
  }
}

class TabBarSide extends React.Component<BottomTabBarProps, State> {
  static defaultProps = {
    keyboardHidesTabBar: true,
    keyboardHidesTabBarAnimationConfig: DEFAULT_KEYBOARD_ANIMATION_CONFIG,
    activeTintColor: {
      light: '#007AFF',
      dark: '#fff',
    },
    inactiveTintColor: {
      light: '#8e8e93',
      dark: '#7f7f7f',
    },
    activeBackgroundColor: 'transparent',
    inactiveBackgroundColor: 'transparent',
    showLabel: true,
    showIcon: true,
    allowFontScaling: true,
    adaptive: isIOS11,
    safeAreaInset: { bottom: 'never', top: 'never' } as React.ComponentProps<
      typeof SafeAreaView
    >['forceInset'],
  };

  // eslint-disable-next-line react/sort-comp
  static contextType = ThemeContext;

  state = {
    layout: { height: 0, width: 0 },
    keyboard: false,
    visible: new Animated.Value(1),
  };

  componentDidMount() {
    if (Platform.OS === 'ios') {
      Keyboard.addListener('keyboardWillShow', this._handleKeyboardShow);
      Keyboard.addListener('keyboardWillHide', this._handleKeyboardHide);
    } else {
      Keyboard.addListener('keyboardDidShow', this._handleKeyboardShow);
      Keyboard.addListener('keyboardDidHide', this._handleKeyboardHide);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'ios') {
      Keyboard.removeListener('keyboardWillShow', this._handleKeyboardShow);
      Keyboard.removeListener('keyboardWillHide', this._handleKeyboardHide);
    } else {
      Keyboard.removeListener('keyboardDidShow', this._handleKeyboardShow);
      Keyboard.removeListener('keyboardDidHide', this._handleKeyboardHide);
    }
  }

  // @ts-ignore
  context: 'light' | 'dark';

  _getKeyboardAnimationConfigByType = (
    type: keyof KeyboardHidesTabBarAnimationConfig,
  ): KeyboardAnimationConfig => {
    const { keyboardHidesTabBarAnimationConfig } = this.props;
    const defaultKeyboardAnimationConfig =
      DEFAULT_KEYBOARD_ANIMATION_CONFIG[type];
    const keyboardAnimationConfig =
      (keyboardHidesTabBarAnimationConfig &&
        keyboardHidesTabBarAnimationConfig[type]) ||
      defaultKeyboardAnimationConfig;

    // merge config only `timing` animation
    if (
      keyboardAnimationConfig &&
      keyboardAnimationConfig.animation === 'timing'
    ) {
      return {
        ...defaultKeyboardAnimationConfig,
        ...keyboardAnimationConfig,
        config: {
          ...defaultKeyboardAnimationConfig.config,
          ...keyboardAnimationConfig.config,
        },
      };
    }

    return keyboardAnimationConfig as KeyboardAnimationConfig;
  };

  _handleKeyboardShow = () => {
    this.setState({ keyboard: true }, () => {
      const { animation, config } = this._getKeyboardAnimationConfigByType(
        'show',
      );
      Animated[animation](this.state.visible, {
        toValue: 0,
        ...config,
      }).start();
    });
  };

  _handleKeyboardHide = () => {
    const { animation, config } = this._getKeyboardAnimationConfigByType(
      'hide',
    );
    Animated[animation](this.state.visible, {
      toValue: 1,
      ...config,
    }).start(() => {
      this.setState({ keyboard: false });
    });
  };

  _handleLayout = (e: LayoutChangeEvent) => {
    const { layout } = this.state;
    const { height, width } = e.nativeEvent.layout;

    if (height === layout.height && width === layout.width) {
      return;
    }

    this.setState({
      layout: {
        height,
        width,
      },
    });
  };

  _getActiveTintColor = () => {
    let { activeTintColor } = this.props;
    if (!activeTintColor) {
      return;
    } else if (typeof activeTintColor === 'string') {
      return activeTintColor;
    }

    return activeTintColor[this.context];
  };

  _getInactiveTintColor = () => {
    let { inactiveTintColor } = this.props;
    if (!inactiveTintColor) {
      return;
    } else if (typeof inactiveTintColor === 'string') {
      return inactiveTintColor;
    }

    return inactiveTintColor[this.context];
  };

  _getActiveBackgroundColor = () => {
    let { activeBackgroundColor } = this.props;
    if (!activeBackgroundColor) {
      return;
    } else if (typeof activeBackgroundColor === 'string') {
      return activeBackgroundColor;
    }

    return activeBackgroundColor[this.context];
  };

  _getInactiveBackgroundColor = () => {
    let { inactiveBackgroundColor } = this.props;
    if (!inactiveBackgroundColor) {
      return;
    } else if (typeof inactiveBackgroundColor === 'string') {
      return inactiveBackgroundColor;
    }

    return inactiveBackgroundColor[this.context];
  };

  _renderLabel = ({
    route,
    focused,
  }: {
    route: NavigationRoute;
    focused: boolean;
  }) => {
    const { labelStyle, showLabel, showIcon, allowFontScaling } = this.props;

    if (showLabel === false) {
      return null;
    }

    const activeTintColor = this._getActiveTintColor();
    const inactiveTintColor = this._getInactiveTintColor();
    const label = this.props.getLabelText({ route });
    const tintColor = focused ? activeTintColor : inactiveTintColor;

    if (typeof label === 'string') {
      return (
        <Animated.Text
          numberOfLines={1}
          style={[
            styles.label,
            { color: tintColor },
            styles.labelBeside,
            labelStyle,
          ]}
          allowFontScaling={allowFontScaling}>
          {label}
        </Animated.Text>
      );
    }

    if (typeof label === 'function') {
      return label({
        focused,
        tintColor,
        orientation: 'vertical',
      });
    }

    return label;
  };

  _renderIcon = ({
    route,
    focused,
  }: {
    route: NavigationRoute;
    focused: boolean;
  }) => {
    const { renderIcon, showIcon, showLabel } = this.props;

    if (showIcon === false) {
      return null;
    }

    const activeTintColor = this._getActiveTintColor();
    const inactiveTintColor = this._getInactiveTintColor();
    const activeOpacity = focused ? 1 : 0;
    const inactiveOpacity = focused ? 0 : 1;

    return renderIcon({
      route,
      focused,
      tintColor: focused ? activeTintColor : inactiveTintColor,
      horizontal: false,
    });
    return (
      <CrossFadeIcon
        route={route}
        horizontal={false}
        activeOpacity={activeOpacity}
        inactiveOpacity={inactiveOpacity}
        activeTintColor={activeTintColor}
        inactiveTintColor={inactiveTintColor}
        renderIcon={renderIcon}
        style={[
          styles.iconWithExplicitWidth,
          { backgroundColor: 'yellow' },
          showLabel === false && styles.iconWithoutLabel,
          showLabel !== false && styles.iconWithLabel,
        ]}
      />
    );
  };

  renderRoute = (route: NavigationRoute, index: number) => {
    const { navigation, onTabPress, onTabLongPress, tabStyle } = this.props;
    const activeBackgroundColor = this._getActiveBackgroundColor();
    const inactiveBackgroundColor = this._getInactiveBackgroundColor();

    const focused =
      route.key === navigation.state.routes[navigation.state.index].key;
    const scene = { route, focused };

    const accessibilityLabel = this.props.getAccessibilityLabel({
      route,
    });
    const accessibilityRole = this.props.getAccessibilityRole({
      route,
    });

    const accessibilityStates = this.props.getAccessibilityStates(scene);

    const testID = this.props.getTestID({ route });

    const backgroundColor = focused
      ? activeBackgroundColor
      : inactiveBackgroundColor;
    const ButtonComponent =
      this.props.getButtonComponent({ route }) ||
      TouchableWithoutFeedbackWrapper;

    return (
      <ButtonComponent
        key={route.key}
        route={route}
        focused={focused}
        onPress={() => onTabPress({ route })}
        onLongPress={() => onTabLongPress({ route })}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={accessibilityRole}
        accessibilityStates={accessibilityStates}
        // @ts-ignore
        style={StyleSheet.flatten([
          styles.tab,
          { backgroundColor },
          styles.tabLandscape,
          tabStyle,
        ])}>
        {this._renderIcon(scene)}
        {this._renderLabel(scene)}
      </ButtonComponent>
    );
  };

  render() {
    const {
      keyboardHidesTabBar,
      safeAreaInset,
      style,
      nonFixedRoutes,
      firstFixedRoutes,
      lastFixedRoutes,
    } = this.props;

    const isDark = this.context === 'dark';

    const {
      position,
      left,
      top = 0,
      bottom = 0,
      right = 0,
      margin,
      marginTop,
      marginLeft,
      marginBottom,
      marginRight,
      marginHorizontal,
      marginVertical,
      ...innerStyle
    } = StyleSheet.flatten(style || {});

    const containerStyle = {
      position,
      top,
      left,
      bottom,
      right,
      margin,
      marginTop,
      marginLeft,
      marginBottom,
      marginRight,
      marginHorizontal,
      marginVertical,
    };

    const tabBarStyle = [
      styles.tabBar,
      isDark ? styles.tabBarDark : styles.tabBarLight,
      innerStyle,
    ];

    return (
      <Animated.View
        style={[
          styles.container,
          containerStyle,
          keyboardHidesTabBar
            ? {
                // When the keyboard is shown, slide down the tab bar
                transform: [
                  {
                    translateY: this.state.visible.interpolate({
                      inputRange: [0, 1],
                      outputRange: [this.state.layout.height, 0],
                    }),
                  },
                ],
                // Absolutely position the tab bar so that the content is below it
                // This is needed to avoid gap at bottom when the tab bar is hidden
                position: this.state.keyboard ? 'absolute' : position,
              }
            : null,
        ]}
        pointerEvents={
          keyboardHidesTabBar && this.state.keyboard ? 'none' : 'auto'
        }
        onLayout={this._handleLayout}>
        <SafeAreaView style={tabBarStyle} forceInset={safeAreaInset}>
          {firstFixedRoutes.map(this.renderRoute)}
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {nonFixedRoutes.map(this.renderRoute)}
          </ScrollView>
          {lastFixedRoutes.map(this.renderRoute)}
        </SafeAreaView>
      </Animated.View>
    );
  }
}

const DEFAULT_WIDTH = 49;

const styles = StyleSheet.create({
  tabBar: {
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    flexDirection: 'column',
  },
  tabBarLight: {
    backgroundColor: ThemeColors.light.header,
    borderTopColor: ThemeColors.light.headerBorder,
  },
  tabBarDark: {
    backgroundColor: ThemeColors.dark.header,
    borderTopColor: ThemeColors.dark.headerBorder,
  },
  container: {
    elevation: 8,
  },
  tabBarRegular: {
    width: DEFAULT_WIDTH,
  },
  tab: {
    alignItems: isIos ? 'center' : 'stretch',
  },
  tabPortrait: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  tabLandscape: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  iconWithoutLabel: {
    flex: 1,
  },
  iconWithLabel: {
    flex: 1,
  },
  iconWithExplicitWidth: {
    // @ts-ignore
    height: DEFAULT_WIDTH,
  },
  label: {
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  labelBeneath: {
    fontSize: 11,
    marginBottom: 1.5,
  },
  labelBeside: {
    fontSize: 12,
    marginLeft: 20,
  },
});

export default withDimensions(TabBarSide);
