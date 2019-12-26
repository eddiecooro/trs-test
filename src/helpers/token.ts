import AsyncStorage from '@react-native-community/async-storage';

let _accessToken: string | undefined = undefined;

async function get() {
  if (_accessToken) {
    return _accessToken;
  }

  const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');

  return accessToken;
}

function set(accessToken: string) {
  _accessToken = accessToken;
  return AsyncStorage.setItem('ACCESS_TOKEN', accessToken);
}

function clear() {
  _accessToken = undefined;
  return AsyncStorage.removeItem('ACCESS_TOKEN');
}

export default {
  get,
  set,
  clear,
};
