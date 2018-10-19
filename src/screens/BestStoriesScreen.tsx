import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';

import { StoryCategory } from '../utils/types';
import StoryList from '../components/StoryList';

const BestStoriesScreen = (props: NavigationScreenProps) => (
  <View>
    <StoryList storyCategory={StoryCategory.BEST_STORIES} navigation={props.navigation}/>
  </View>
);

export default connect()(BestStoriesScreen);
