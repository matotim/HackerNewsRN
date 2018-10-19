import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';

import StoryList from '../components/StoryList';
import { StoryCategory } from '../utils/types';

const NewStoriesScreen = (props: NavigationScreenProps) => (
  <View>
    <StoryList storyCategory={StoryCategory.NEW_STORIES} navigation={props.navigation}/>
  </View>
);

export default connect()(NewStoriesScreen);
