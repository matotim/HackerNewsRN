import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';

import { StoryCategory } from '../utils/types';
import StoryList from '../components/StoryList';

class NewStoriesScreen extends Component<NavigationScreenProps> {
  render() {
    return (
      <View>
        <StoryList storyCategory={StoryCategory.NEW_STORIES} navigation={this.props.navigation} />
      </View>
    );
  }
}

export default connect()(NewStoriesScreen);
