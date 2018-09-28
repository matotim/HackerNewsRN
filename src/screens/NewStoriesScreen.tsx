import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { StoryCategory } from '../interfaces/stores';
import StoryList from '../components/StoryList';

class NewStoriesScreen extends Component {
  render() {
    return (
      <View>
        <StoryList storyCategory={StoryCategory.NEW_STORIES} />
      </View>
    );
  }
}

export default connect()(NewStoriesScreen);
