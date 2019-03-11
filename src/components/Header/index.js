import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { withNavigation } from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

class Header extends Component {
  static defaultProps = {
    goBackButton: false,
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    goBackButton: PropTypes.bool,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  goBack = async () => {
    const { navigation } = this.props;
    navigation.navigate('Repositories');
  };

  render() {
    const { title, goBackButton } = this.props;

    return (
      <View style={styles.container}>
        {goBackButton ? (
          <TouchableOpacity onPress={this.goBack}>
            <Icon name="chevron-left" size={16} style={styles.icon} />
          </TouchableOpacity>
        ) : (
          <View style={styles.left} />
        )}

        <Text style={styles.title}>{title}</Text>
        <View style={styles.right} />
      </View>
    );
  }
}

export default withNavigation(Header);
