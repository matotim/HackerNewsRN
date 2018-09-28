import React from 'react';
import { View, Text } from 'react-native';
import { StoryCategory } from '../interfaces/stores';

interface Props {
  storyCategory: StoryCategory,
}

export default class StoryList extends React.Component<Props> {
  render() {
    return (
      <View>
        <Text>{this.props.storyCategory}</Text>
      </View>
    );
  }
}