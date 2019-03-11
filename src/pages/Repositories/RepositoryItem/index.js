import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Image, Text, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';

import styles from './styles';

const RepositoryItem = ({ repository: repo, navigation: { navigate } }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.touchable}
      onPress={() => navigate('Issues', { title: repo.name, full_name: repo.full_name })}
    >
      <Image style={styles.avatar} source={{ uri: repo.owner.avatar_url }} />
      <View style={styles.info}>
        <Text style={styles.infoTitle}>{repo.name}</Text>
        <Text style={styles.infoSubTitle}>{repo.owner.login}</Text>
      </View>
      <Icon name="chevron-right" size={20} style={styles.formIcon} />
    </TouchableOpacity>
  </View>
);

RepositoryItem.propTypes = {
  repository: PropTypes.shape({
    owner: PropTypes.shape({
      avatar_url: PropTypes.string,
      login: PropTypes.string,
    }),
    name: PropTypes.string,
    full_name: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default withNavigation(RepositoryItem);
