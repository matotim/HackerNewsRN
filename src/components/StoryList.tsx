import React from 'react';
import { View, Text } from 'react-native';
import { RootState, StoryCategory } from '../interfaces/stores';
import { fetchStories } from '../redux/actions/storiesActions';
import { connect } from 'react-redux';

interface Props {
  storyCategory: StoryCategory;
  isFetching: boolean;
  error: any;
  stories: any;
  fetchStories: () => void;
}

export class StoryList extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchStories();
  }

  renderContent() {
    if (this.props.isFetching) {
      return <Text>IsLoading</Text>;
    } else if (this.props.stories) {
      return <Text>StoriesIds !</Text>;
    } else if (this.props.error) {
      return <Text>Error</Text>;
    } else {
      return <Text>Default</Text>;
    }
  }

  render() {
    return (
      <View>
        {this.renderContent()}
      </View>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: Props) => {
  return state[ownProps.storyCategory];
};

const mapDispatchToProps = (dispatch: any, ownProps: Props) => ({
  fetchStories: () => dispatch(fetchStories(ownProps.storyCategory)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryList);
