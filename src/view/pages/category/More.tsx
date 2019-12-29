import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  View,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTapOutside } from 'helpers/TapOutside';

const More = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = useTapOutside(isOpen, () => {
    setIsOpen(false);
  });

  return isOpen ? (
    <View ref={ref} style={styles.moreMenu}>
      <TouchableOpacity>
        <Icon name="edit" style={styles.menuItem} size={23} color="grey"></Icon>
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon
          name="delete"
          style={styles.menuItem}
          size={23}
          color="grey"></Icon>
      </TouchableOpacity>
    </View>
  ) : (
    <TouchableOpacity
      hitSlop={{ top: 0, left: 15, bottom: 15, right: 5 }}
      onPress={() => setIsOpen(true)}>
      <Icon color="white" size={22} name="more-vert"></Icon>
    </TouchableOpacity>
  );
};

export default More;

const styles = StyleSheet.create<{ moreMenu: ViewStyle; menuItem: TextStyle }>({
  moreMenu: {
    backgroundColor: 'white',
    elevation: 2,
    margin: 10,
    borderRadius: 5,
  },
  menuItem: {
    padding: 5,
  },
});
