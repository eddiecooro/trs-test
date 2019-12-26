import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import Components from 'view/components';

import style from 'view/style';
import { styleJoiner } from 'helpers/util';
import { ViewStyle } from 'react-native';

const { Appbar, Button, Image, View } = Components;

const Home = () => {
  const { appStyle, homeStyle } = style;
  const { navigate } = useNavigation();

  return (
    <View style={appStyle.container}>
      <Appbar.Header style={appStyle.header}>
        <Appbar.Content title={'Title'} />
      </Appbar.Header>
      <View style={appStyle.content}>
        <View style={homeStyle.HomeView}>
          <View style={homeStyle.logoView}>
            <Image
              style={homeStyle.logo}
              source={require('assets/images/logo.png')}
            />
          </View>

          <View style={homeStyle.buttonArea}>
            <View style={homeStyle.buttonAreaChild}>
              <Button
                mode="outlined"
                color="#13a77f"
                disabled={true}
                style={appStyle.button}></Button>
            </View>
            <Button
              mode="outlined"
              color="#13a77f"
              disabled={true}
              style={appStyle.button}>
              Change Language
            </Button>
            <View
              style={styleJoiner<ViewStyle>(
                homeStyle.buttonAreaChild,
                homeStyle.buttonAreaChildColumn,
              )}>
              <Button
                mode="outlined"
                color="#13a77f"
                onPress={() => navigate('Todos')}
                style={appStyle.button}>
                Todos
              </Button>
              <Button
                mode="outlined"
                color="#13a77f"
                onPress={() => navigate('Github')}
                style={appStyle.button}>
                Async Redux
              </Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Home;
