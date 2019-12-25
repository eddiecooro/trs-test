import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from 'view/pages/home';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
  },
);

export default createAppContainer(AppNavigator);
