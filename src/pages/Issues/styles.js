import { StyleSheet } from 'react-native';

import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lighter,
    flex: 1,
  },
  empty: {
    color: colors.dark,
    marginTop: metrics.margin * 2,
    textAlign: 'center',
  },
  error: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loading: {
    marginTop: metrics.margin * 2,
  },
});

export default styles;
