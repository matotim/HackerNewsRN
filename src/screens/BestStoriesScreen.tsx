import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { StoryCategory } from '../utils/types';
import StoryList from '../components/StoryList';

class BestStoriesScreen extends Component {
  render() {
    return (
      <View>
        <StoryList storyCategory={StoryCategory.BEST_STORIES} />
      </View>
    );
  }
}

export default connect()(BestStoriesScreen);
