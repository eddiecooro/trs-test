export default {
  get Text() {
    return require('./Text').default;
  },
  get FlatList() {
    return require('react-native').FlatList;
  },
  get Image() {
    return require('react-native').Image;
  },
  get Loading() {
    return require('./Loading').default;
  },
  get TouchableOpacity() {
    return require('react-native').TouchableOpacity;
  },
  get View() {
    return require('react-native').View;
  },
  get Alert() {
    return require('react-native').Alert;
  },
};
