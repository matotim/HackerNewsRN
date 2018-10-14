import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';

import { StoryCategory } from '../utils/types';
import StoryList from '../components/StoryList';

class BestStoriesScreen extends Component<NavigationScreenProps> {
  render() {
    return (
      <View>
        <StoryList storyCategory={StoryCategory.BEST_STORIES} navigation={this.props.navigation} />
      </View>
    );
  }
}

export default connect()(BestStoriesScreen);
