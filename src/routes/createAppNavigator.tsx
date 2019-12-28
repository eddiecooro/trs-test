import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import createSidebarTabNavigator from './sidebarTabNavigator/navigators/createSidebarTabNavigator';
import { StyleProp, TextStyle, StyleSheet, View, Text } from 'react-native';
import styles from './styles';
import RotatedTabButtonComponent from './RotatedTabButtonComponent';

interface IconComponentProps {
  name: string;
  tintColor?: string;
  style?: StyleProp<TextStyle>;
}
const IconComponent = ({ name, tintColor, style }: IconComponentProps) => (
  <Ionicons
    style={StyleSheet.flatten([styles.icon, style])}
    name={name}
    size={27}
    color={tintColor}
  />
);

export default (routes: Parameters<typeof createSidebarTabNavigator>[0]) =>
  createAppContainer(
    createSidebarTabNavigator(routes, {
      tabBarOptions: {
        labelStyle: {},
        activeTintColor: 'darkred',
      },
      initialRouteName: 'None2',
      lazy: true,
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
          const { routeName } = navigation.state;
          if (routeName === 'Settings')
            return <IconComponent name="ios-settings" tintColor={tintColor} />;
          else if (routeName === 'Search')
            return <IconComponent name="ios-search" tintColor={tintColor} />;
          else return null;
        },
        tabBarLabel: label => ({ tintColor }) => {
          const { routeName } = navigation.state;
          const focused = navigation.isFocused();
          if (routeName === 'Settings' || routeName === 'Search') {
            return null;
          } else {
            return (
              <View style={styles.labelWrapper}>
                <Text numberOfLines={1} style={styles.label}>
                  {label}
                </Text>
                {focused ? (
                  <Text
                    style={[styles.label, { color: tintColor, fontSize: 8 }]}>
                    ⬤
                  </Text>
                ) : null}
              </View>
            );
          }
        },
        tabBarButtonComponent: RotatedTabButtonComponent,
      }),
    }),
  );
