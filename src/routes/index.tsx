import React from 'react';
import { createAppContainer } from 'react-navigation';

import HomeScreen from 'view/pages/home';
import { View, TouchableWithoutFeedback } from 'react-native';
import { createSidebarTabNavigator } from './sidebarTabNavigator';
import { ButtonComponentProps } from 'react-navigation-tabs/lib/typescript/src/types';

class TabButtonComponent extends React.Component<ButtonComponentProps> {
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
        <View {...rest}></View>
      </TouchableWithoutFeedback>
    );
  }
}

const Navigator = () => {
  const [routes, setRoutes] = React.useState({
    None: () => (
      <View
        style={{
          flex: 1,
          height: 50,
        }}></View>
    ),
  });
  const AppNavigator = React.useMemo(
    () =>
      createAppContainer(
        createSidebarTabNavigator(routes, {
          defaultNavigationOptions: {
            tabBarButtonComponent: TabButtonComponent,
          },
        }),
      ),
    [routes],
  );
  return <AppNavigator />;
};

export default Navigator;
