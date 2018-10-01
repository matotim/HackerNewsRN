import React from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { RootState, StoryCategory } from '../interfaces/stores';
import { fetchStories, fetchStoriesIds } from '../redux/actions/storiesActions';
import { connect } from 'react-redux';

interface Props {
  storyCategory: StoryCategory;
  isFetching: boolean;
  error: any;
  stories: any;
  ids: string[];
  fetchStoriesIds: () => void;
  fetchStories: (ids: string[]) => void;
}

export class StoryList extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchStoriesIds();
  }

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.ids && this.props.ids) {
      const ids = this.props.ids.slice(0, 20);
      this.props.fetchStories(ids);
    }
  }

  renderItem = (data: any) => {
    return (
      <Text>{data.item.title}</Text>
    );
  };

  renderList() {
    return <FlatList data={this.props.stories} renderItem={this.renderItem} />;
  }

  renderContent() {
    if (this.props.isFetching) {
      return <ActivityIndicator size="large" />;
    } else if (this.props.stories) {
      return this.renderList();
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
  fetchStoriesIds: () => dispatch(fetchStoriesIds(ownProps.storyCategory)),
  fetchStories: (ids: string[]) => dispatch(fetchStories(ids, ownProps.storyCategory)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryList);
