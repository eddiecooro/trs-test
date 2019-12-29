import React from 'react';
import { View, Text } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';

interface Props extends NavigationInjectedProps {}

const SearchScreen = (props: Props) => {
  return (
    <View>
      <Text style={{ fontSize: 32, textAlign: 'center' }}>Search</Text>
    </View>
  );
};

export default SearchScreen;
