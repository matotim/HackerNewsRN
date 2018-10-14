import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';

import StoryList from '../components/StoryList';
import { StoryCategory } from '../utils/types';

class TopStoriesScreen extends Component<NavigationScreenProps> {
  render() {
    return (
      <View>
        <StoryList storyCategory={StoryCategory.TOP_STORIES} navigation={this.props.navigation} />
      </View>
    );
  }
}

export default connect()(TopStoriesScreen);
