import { StyleSheet } from 'react-native';

import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  activeFilter: {
    color: colors.dark,
    fontSize: 15,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: colors.regular,
    fontSize: 14,
  },
  container: {
    backgroundColor: colors.light,
    borderRadius: metrics.borderRadius,
    flexDirection: 'row',
    marginBottom: metrics.padding / 2,
    marginHorizontal: metrics.padding,
    marginTop: metrics.margin * 2,
    padding: metrics.padding / 2,
  },
});

export default styles;
