import React from 'react';
import { View } from 'react-native';
import createAppNavigator from './createAppNavigator';

const Navigator = () => {
  const [routes, setRoutes] = React.useState({
    Settings: {
      screen: () => (
        <View
          style={{
            flex: 1,
            height: 50,
          }}></View>
      ),
      navigationOptions: { fixed: 'first' },
    },
    None2: {
      navigationOptions: {
        title: 'همه',
      },
      screen: () => (
        <View
          style={{
            flex: 1,
            height: 50,
          }}></View>
      ),
    },
    None3: {
      navigationOptions: {
        title: 'تاریخ',
      },
      screen: () => (
        <View
          style={{
            flex: 1,
            height: 50,
          }}></View>
      ),
    },
    None4: {
      navigationOptions: {
        title: 'قرآن',
      },
      screen: () => (
        <View
          style={{
            flex: 1,
            height: 50,
          }}></View>
      ),
    },
    None5: {
      navigationOptions: {
        title: 'نقدهای کتب',
      },
      screen: () => (
        <View
          style={{
            flex: 1,
            height: 50,
          }}></View>
      ),
    },
    None6: {
      navigationOptions: {
        title: 'علوم حدیث',
      },
      screen: () => (
        <View
          style={{
            flex: 1,
            height: 50,
          }}></View>
      ),
    },
    None7: {
      navigationOptions: {
        title: 'قوانین اسلامی',
      },
      screen: () => (
        <View
          style={{
            flex: 1,
            height: 50,
          }}></View>
      ),
    },
    None8: {
      navigationOptions: {
        title: 'مدارس اسلامی',
      },
      screen: () => (
        <View
          style={{
            flex: 1,
            height: 50,
          }}></View>
      ),
    },
    Search: {
      navigationOptions: {
        fixed: 'last',
      },
      screen: () => (
        <View
          style={{
            flex: 1,
            height: 50,
          }}></View>
      ),
    },
  });

  const AppNavigator = React.useMemo(() => createAppNavigator(routes), [
    routes,
  ]);

  return <AppNavigator />;
};

export default Navigator;
