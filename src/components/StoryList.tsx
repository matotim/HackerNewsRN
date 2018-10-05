import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Share,
  Platform,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';

import { RootState, Story, StoryCategory } from '../utils/types';
import { fetchStories, fetchStoriesIds } from '../redux/actions/storiesActions';
import { timeSince } from '../utils/dateHelper';

interface OwnProps {
  storyCategory: StoryCategory;
  store?: any; // Necessary for test connected component
}

interface StateProps {
  isFetching: boolean;
  error: object | null;
  stories: Story[] | null;
  ids: string[] | null;
}

interface DispatchProps {
  fetchStoriesIds: () => void;
  fetchStories: (ids: string[]) => void;
}

export type Props = StateProps & DispatchProps & OwnProps;

interface State {
  index: number;
}

const PAGE_SIZE = 25;

export class StoryList extends React.Component<Props, State> {

  static goToUrl(itemUrl: string) {
    Linking.openURL(itemUrl);
  }

  static shareUrl(item: Story) {
    const itemUrl = item.url ? item.url : 'https://news.ycombinator.com/item?id=' + item.id;
    let message = item.title;
    message += Platform.OS === 'android' ? ` ${itemUrl}` : '';
    Share.share({
      message,
      url: itemUrl,
      title: 'Check out this link',
    }, {
      // Android only:
      dialogTitle: 'Check out this link',
    });
  }

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

  keyExtractor = (item: any) => `list-item-${item.id}`;

  renderItem = (data: any) => {
    const url = require('url');
    let urlHostname;
    if (data.item.url) {
      urlHostname = url.parse(data.item.url).hostname;
      urlHostname = urlHostname.startsWith('www.') ? urlHostname.substring(4) : urlHostname;
    }
    const date = new Date(data.item.time * 1000);
    return (
      <View style={styles.listItem}>
          <Text style={styles.date}>{`${timeSince(date)} ago by ${data.item.by}`}</Text>
        <TouchableOpacity onPress={() => StoryList.goToUrl(data.item.url)}>
          <Text style={styles.title} testID={'item-title'}>{data.item.title}</Text>
          {urlHostname && <Text style={styles.url}>{`(${urlHostname})`}</Text>}
        </TouchableOpacity>
        <View style={styles.bottomRow}>
          <TouchableOpacity style={styles.bottomItem}>
            <FontAwesome5 name={'arrow-alt-circle-up'} size={18} style={styles.bottomIcon} brand/>
            <Text style={styles.bottomText}>{data.item.score}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomItem}>
            <FontAwesome5 name={'comments'} size={16} style={styles.bottomIcon} brand/>
            <Text style={styles.bottomText}>{data.item.kids ? data.item.kids.length : '0'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomItem} onPress={() => StoryList.shareUrl(data.item)}>
            <FontAwesome5 name={'share-alt'} size={18} style={styles.bottomIcon} brand/>
            <Text style={styles.bottomText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

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
        onEndReachedThreshold={1}
        ListFooterComponent={this.renderFooterList}
      />
    );
  }

  renderContent() {
    if (this.props.isFetching && !this.props.stories) {
      return <ActivityIndicator size="large" style={styles.activityIndicator}/>;
    } else if (this.props.stories) {
      return this.renderList();
    } else  {
      return <Text>Error</Text>;
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

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => {
  const storyState = state[ownProps.storyCategory];
  return {
    ...storyState,
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: OwnProps): DispatchProps => ({
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
  date: {
    fontSize: 11,
  },
  title: {
    fontWeight: '500',
    fontSize: 15,
    marginTop: 6,
  },
  url: {
    fontWeight: '500',
    fontSize: 14,
    marginTop: 6,
    color: '#b0afb3',
  },
  bottomRow: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 14,
  },
  bottomItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomText: {
    color: '#b0afb3',
    fontWeight: '500',
    fontSize: 13,
  },
  bottomIcon: {
    marginRight: 6,
    color: '#b0afb3',
    fontWeight: '500',
  },
});
