import { StyleSheet } from 'react-native';

export const marginSize = 9;
export const styles = StyleSheet.create({
  labelWrapper: {
    height: 49,
    marginLeft: marginSize * 1.5,
    marginRight: marginSize * 1.5,
    margin: marginSize,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    fontSize: 22,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'transparent',
    color: 'grey',
  },
  icon: {
    margin: marginSize,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 49,
    height: 49,
  },
});

export default styles;
