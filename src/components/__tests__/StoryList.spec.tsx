import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ActivityIndicator, FlatList, Text, Linking, Share } from 'react-native';

import { StoryList } from '../StoryList';
import { Story, StoryCategory } from '../../utils/types';

const stories: Story[] = [
  {
    id: 42,
    by: 'tmato',
    kids: [1, 2],
    score: 42,
    time: Math.round((new Date()).getTime() / 1000),
    title: 'This is a random title',
    type: 'story',
    url: 'http://google.com',
  },
  {
    id: 84,
    by: 'matoti',
    kids: [1, 2],
    score: 84,
    time: Math.round((new Date()).getTime() / 1000),
    title: 'This is a new random title',
    type: 'story',
    url: 'http://google.com/search',
  },
];
const ids: string[] = ['42', '84'];
const defaultProps = {
  isFetching: false,
  error: null,
  stories,
  ids,
  fetchStoriesIds: jest.fn(),
  fetchStories: jest.fn(),
  storyCategory: StoryCategory.TOP_STORIES,
};
Linking.openURL = jest.fn();
Share.share = jest.fn();

describe('StoryList', () => {
  let wrapper: ShallowWrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    wrapper = shallow(
      <StoryList {...defaultProps} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('displays an error', () => {
    wrapper = shallow(
      <StoryList
        isFetching={false}
        error={{ message: 'error'}}
        stories={null}
        ids={null}
        fetchStoriesIds={jest.fn()}
        fetchStories={jest.fn()}
        storyCategory={StoryCategory.TOP_STORIES}
      />,
    );
    expect(wrapper.contains(<Text>Error</Text>)).toEqual(true);
  });
  it('loads stories', () => {
    wrapper = shallow(
      <StoryList
        isFetching={true}
        error={null}
        stories={null}
        ids={null}
        fetchStoriesIds={defaultProps.fetchStoriesIds}
        fetchStories={defaultProps.fetchStories}
        storyCategory={StoryCategory.TOP_STORIES}
      />,
    );
    expect(defaultProps.fetchStoriesIds).toHaveBeenCalled();
    wrapper.setProps({ ids });
    wrapper.update();
    expect(defaultProps.fetchStories).toHaveBeenCalled();
    expect(wrapper.find(ActivityIndicator)).toHaveLength(1);
    expect(wrapper.find(FlatList)).toHaveLength(0);
    wrapper.setProps({ stories });
    wrapper.update();
    expect(wrapper.find(FlatList)).toHaveLength(1);
  });
  it('loads more stories', () => {
    wrapper = shallow(
      <StoryList
        isFetching={true}
        error={null}
        stories={null}
        ids={null}
        fetchStoriesIds={defaultProps.fetchStoriesIds}
        fetchStories={defaultProps.fetchStories}
        storyCategory={StoryCategory.TOP_STORIES}
      />,
    );
    expect(defaultProps.fetchStoriesIds).toHaveBeenCalled();
    wrapper.setProps({ ids });
    wrapper.update();
    expect(defaultProps.fetchStories).toHaveBeenCalled();
    expect(wrapper.find(FlatList)).toHaveLength(0);
    wrapper.setProps({ stories });
    wrapper.update();
    expect(wrapper.find(FlatList)).toHaveLength(1);
  });
  it('renderItem', () => {
    wrapper = shallow(
      <StoryList {...defaultProps} />,
    );
    const component = wrapper.instance() as StoryList;
    expect(component.renderItem({ item: stories[0] })).toBeDefined();
  });
  it('loadsMoreStories', () => {
    wrapper = shallow(
      <StoryList {...defaultProps} />,
    );
    const component = wrapper.instance() as StoryList;
    component.loadMoreStories();
    expect(defaultProps.fetchStories).toHaveBeenCalled();
  });
  it('openUrl', () => {
    StoryList.goToUrl('google.com');
    expect(Linking.openURL).toHaveBeenCalled();
  });
  it('shareUrl', () => {
    StoryList.shareUrl(stories[0]);
    expect(Share.share).toHaveBeenCalled();
  });
});
