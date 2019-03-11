import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import arraySort from 'array-sort';
import {
  View,
  FlatList,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';

import api from '~/services/api';

import Header from '~/components/Header';
import RepositoryItem from './RepositoryItem';

import styles from './styles';

export default class Repositories extends Component {
  state = {
    error: '',
    loadingList: true,
    loadingButton: false,
    refreshing: false,
    repositoryInput: '',
    repositories: [],
  };

  async componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    this.setState({ refreshing: true });

    const repositories = JSON.parse(await AsyncStorage.getItem('@GitIssues:repositories')) || [];

    this.setState({ repositories, refreshing: false, loadingList: false });
  };

  renderRepositories = () => {
    const { repositories, refreshing } = this.state;
    return (
      <FlatList
        data={repositories}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderRepositoryItem}
        onRefresh={this.loadRepositories}
        refreshing={refreshing}
      />
    );
  };

  renderRepositoryItem = ({ item }) => (<RepositoryItem repository={item} />);

  addRepository = async () => {
    const { repositories, repositoryInput, loadingList } = this.state;

    if (loadingList) return;

    this.setState({ loadingButton: true });

    if (!repositoryInput) {
      this.setState({ error: 'Enter with an repository name', loadingButton: false });
      return;
    }

    if (repositories.find(repo => repo.full_name === repositoryInput)) {
      this.setState({ error: 'This repository already exists', loadingButton: false });
      return;
    }

    try {
      const { data } = await api.get(`/repos/${repositoryInput}`);

      const repositoriesUpdated = arraySort([...repositories, data], 'name');

      await AsyncStorage.setItem('@GitIssues:repositories', JSON.stringify(repositoriesUpdated));

      this.setState({ error: '', repositories: repositoriesUpdated, repositoryInput: '' });
    } catch (error) {
      this.setState({ error: 'Repository not found' });
    } finally {
      this.setState({ loadingButton: false });
    }
  };

  render() {
    const {
      loadingList, loadingButton, repositoryInput, error,
    } = this.state;

    return (
      <View style={styles.container}>
        <Header title="GitIssues" />
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              value={repositoryInput}
              onChangeText={text => this.setState({ repositoryInput: text })}
              placeholder="Add a new repository"
            />
            <TouchableOpacity style={styles.button} onPress={this.addRepository}>
              {loadingButton ? (
                <ActivityIndicator style={styles.loading} />
              ) : (
                <Icon name="plus" size={20} style={styles.formIcon} />
              )}
            </TouchableOpacity>
          </View>
          {!!error && <Text style={styles.error}>{error}</Text>}
        </View>
        {loadingList ? <ActivityIndicator style={styles.loading} /> : this.renderRepositories()}
      </View>
    );
  }
}
