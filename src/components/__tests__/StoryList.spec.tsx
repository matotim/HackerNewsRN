import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import Connected, { StoryList } from '../StoryList';
import { StoryCategory } from '../../utils/types';

describe('StoryList', () => {
  let wrapper;

  it('mapStateToProps', () => {
    const mockStore = configureStore();
    const store = mockStore({
      topstories: {
        isFetching: false,
        error: null,
        stories: null,
        ids: null,
      },
    });
    wrapper = shallow(<Connected store={store} storyCategory={StoryCategory.TOP_STORIES} />);
    expect(wrapper.prop('isFetching')).toEqual(false);
    expect(wrapper.prop('error')).toEqual(null);
    expect(wrapper.prop('stories')).toEqual(null);
    expect(wrapper.prop('ids')).toEqual(null);
  });
  it('renders correctly', () => {
    wrapper = shallow(
      <StoryList
        isFetching={false}
        error={null}
        stories={null}
        ids={null}
        fetchStoriesIds={jest.fn()}
        fetchStories={jest.fn()}
        storyCategory={StoryCategory.TOP_STORIES}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
