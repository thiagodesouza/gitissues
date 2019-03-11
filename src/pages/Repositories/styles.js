import { StyleSheet } from 'react-native';

import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: metrics.margin,
  },
  container: {
    backgroundColor: colors.lighter,
    flex: 1,
  },
  error: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: metrics.margin * 2,
    textAlign: 'center',
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  formContainer: {
    borderBottomColor: colors.light,
    borderBottomWidth: 0.8,
    margin: metrics.margin * 2,
    paddingBottom: metrics.padding,
  },
  formIcon: {
    color: colors.darker,
  },
  input: {
    backgroundColor: colors.white,
    borderColor: colors.light,
    borderRadius: metrics.borderRadius,
    borderWidth: 0.5,
    paddingHorizontal: metrics.padding / 2,
    width: metrics.screenWidth - metrics.padding * 2 - 30,
  },
});

export default styles;
