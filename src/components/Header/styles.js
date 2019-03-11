import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flexDirection: 'row',
    height: 54 + getStatusBarHeight(),
    justifyContent: 'space-between',
    paddingHorizontal: metrics.padding,
    paddingTop: getStatusBarHeight(),
  },

  title: {
    color: colors.darker,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
