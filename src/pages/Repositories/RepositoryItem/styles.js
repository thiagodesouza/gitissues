import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  avatar: {
    height: 50,
    width: 50,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: metrics.borderRadius,
    height: 80,
    marginBottom: metrics.margin,
    marginHorizontal: metrics.margin * 2,
    padding: metrics.padding,
  },
  formIcon: {
    color: colors.light,
  },
  info: {
    width: metrics.screenWidth - metrics.margin * 2 - metrics.padding - 150,
  },
  infoSubTitle: {
    fontSize: 12,
    marginTop: metrics.margin / 5,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  touchable: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
