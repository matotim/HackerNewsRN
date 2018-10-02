import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import StoryList from '../components/StoryList';
import { StoryCategory } from '../utils/types';

class TopStoriesScreen extends Component {
  render() {
    return (
      <View>
        <StoryList storyCategory={StoryCategory.TOP_STORIES} />
      </View>
    );
  }
}

export default connect()(TopStoriesScreen);
