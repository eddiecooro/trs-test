import App from './src/App';
import appDetails from './app.json';
import { AppRegistry } from 'react-native';

AppRegistry.registerComponent(appDetails.name, () => App);
