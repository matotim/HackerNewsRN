import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { StoryCategory } from '../interfaces/stores';

interface Props {
  category: StoryCategory;
}

class StoriesScreen extends Component<Props> {
  render() {
    return (
      <View>
        <Text>{this.props.category}</Text>
      </View>
    );
  }
}

export default connect()(StoriesScreen);
