import React from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import url from 'url';

import { RootState, StoryCategory } from '../interfaces/stores';
import { fetchStories, fetchStoriesIds } from '../redux/actions/storiesActions';
import { connect } from 'react-redux';

interface StateProps {
  storyCategory: StoryCategory;
  isFetching: boolean;
  error: object | null;
  stories: object[] | null;
  ids: string[] | null;
}

interface DispatchProps {
  fetchStoriesIds: () => void;
  fetchStories: (ids: string[]) => void;
}

interface Props extends StateProps, DispatchProps {
}

interface State {
  index: number;
}

const PAGE_SIZE = 25;

export class StoryList extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  componentDidMount() {
    this.props.fetchStoriesIds();
  }

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.ids && this.props.ids) {
      const ids = this.props.ids.slice(0, PAGE_SIZE);
      this.props.fetchStories(ids);
    }
    if (this.props.stories && prevProps.stories !== this.props.stories) {
      this.setState({ index: this.props.stories.length });
    }
  }

  loadMoreStories = () => {
    if (this.props.ids) {
      const ids = this.props.ids.slice(this.state.index, this.state.index + PAGE_SIZE);
      this.props.fetchStories(ids);
    }
  };

  renderItem = (data: any) => {
    let urlHostname;
    if (data.item.url) {
      urlHostname = url.parse(data.item.url).hostname;
      urlHostname = urlHostname.startsWith('www.') ? urlHostname.substring(4) : urlHostname;
    }
    return (
      <View style={styles.listItem}>
        <Text style={styles.title}>{data.item.title}</Text>
        {urlHostname && <Text style={styles.url}>{`(${urlHostname})`}</Text>}
        <View style={styles.bottomRow}>
          <View style={styles.bottomItem}>
            <FontAwesome5 name={'arrow-alt-circle-up'} size={18} style={styles.bottomIcon} brand />
            <Text style={styles.bottomText}>{data.item.score}</Text>
          </View>
          <View style={styles.bottomItem}>
            <FontAwesome5 name={'comments'} size={16} style={styles.bottomIcon} brand />
            <Text style={styles.bottomText}>{data.item.kids ? data.item.kids.length : '0'}</Text>
          </View>
          <View style={styles.bottomItem}>
            <FontAwesome5 name={'share-alt'} size={18} style={styles.bottomIcon} brand />
            <Text style={styles.bottomText}>Share</Text>
          </View>
        </View>
      </View>
    );
  };

  keyExtractor = (item: any) => `list-item-${item.id}`;

  renderFooterList = () => {
    return (
      <View>
        <ActivityIndicator style={styles.activityIndicator} size="large"/>
      </View>
    );
  };

  renderList() {
    return (
      <FlatList
        data={this.props.stories}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        refreshing={this.props.isFetching}
        onEndReached={this.loadMoreStories}
        onEndReachedThreshold={0.25}
        ListFooterComponent={this.renderFooterList}
      />
    );
  }

  renderContent() {
    if (this.props.isFetching && !this.props.stories) {
      return <ActivityIndicator size="large" style={styles.activityIndicator}/>;
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

const mapStateToProps = (state: RootState, ownProps: StateProps): StateProps => {
  const storyState = state[ownProps.storyCategory];
  return {
    ...ownProps,
    ...storyState,
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: StateProps): DispatchProps => ({
  fetchStoriesIds: () => dispatch(fetchStoriesIds(ownProps.storyCategory)),
  fetchStories: (ids: string[]) => dispatch(fetchStories(ids, ownProps.storyCategory)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryList);

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: 'white',
    marginTop: 10,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#E2E2E7',
  },
  activityIndicator: {
    padding: 10,
  },
  title: {
    fontWeight: '500',
    fontSize: 15,
  },
  url: {
    fontWeight: '500',
    fontSize: 14,
    marginTop: 5,
    color : '#b0afb3',
  },
  bottomRow: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
  },
  bottomItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomText: {
    color : '#b0afb3',
    fontWeight: '500',
    fontSize: 13,
  },
  bottomIcon: {
    marginRight: 6,
    color : '#b0afb3',
    fontWeight: '500',
  },
});
