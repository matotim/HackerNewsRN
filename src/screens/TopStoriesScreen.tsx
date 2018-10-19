import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';

import StoryList from '../components/StoryList';
import { StoryCategory } from '../utils/types';

const TopStoriesScreen = (props: NavigationScreenProps) => (
  <View>
    <StoryList storyCategory={StoryCategory.TOP_STORIES} navigation={props.navigation}/>
  </View>
);

export default connect()(TopStoriesScreen);
