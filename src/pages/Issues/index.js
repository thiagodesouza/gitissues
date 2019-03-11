import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View, FlatList, ActivityIndicator, Text,
} from 'react-native';

import Header from '~/components/Header';

import api from '~/services/api';

import IssueItem from './IssueItem';
import Filter from './Filter';

import styles from './styles';

export default class Issues extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    activeFilter: 'all',
    issues: [],
    loading: true,
    error: '',
    refreshing: false,
  };

  componentDidMount() {
    this.loadIssues();
  }

  loadIssues = async () => {
    this.setState({ refreshing: true });

    const { navigation } = this.props;
    const { activeFilter } = this.state;

    try {
      const { data } = await api.get(
        `/repos/${navigation.getParam('full_name')}/issues?state=${activeFilter}`,
      );

      this.setState({ issues: data });
    } catch (_err) {
      this.setState({ error: 'Load issues error' });
    } finally {
      this.setState({ loading: false, refreshing: false });
    }
  };

  renderListItem = ({ item }) => <IssueItem issue={item} />;

  renderList = () => {
    const { issues, refreshing } = this.state;

    return !issues.length ? (
      <Text style={styles.empty}>Issues not found</Text>
    ) : (
      <FlatList
        data={issues}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadIssues}
        refreshing={refreshing}
      />
    );
  };

  changeFilter = async (value) => {
    this.setState({ activeFilter: value });

    const { navigation } = this.props;

    try {
      const { data } = await api.get(
        `/repos/${navigation.getParam('full_name')}/issues?state=${value}`,
      );

      this.setState({ issues: data });
    } catch (_err) {
      this.setState({ error: 'Load issues error' });
    }
  };

  render() {
    const { navigation } = this.props;
    const { loading, error, activeFilter } = this.state;
    return (
      <View style={styles.container}>
        <Header title={navigation.getParam('title')} goBackButton />
        {!!error && <Text style={styles.error}>{error}</Text>}
        <Filter activeFilter={activeFilter} changeFilter={this.changeFilter} />
        {loading ? <ActivityIndicator size="large" style={styles.loading} /> : this.renderList()}
      </View>
    );
  }
}
