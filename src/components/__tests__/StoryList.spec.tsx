import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import StoryList from '../StoryList';
import { StoryCategory } from '../../utils/types';
import { Provider } from 'react-redux';

describe('StoryList Component', () => {
  const mockStore = configureStore([]);

  it('renders correctly', () => {
    const store = mockStore({});
    const wrapper = shallow(
      <Provider store={store}>
        <StoryList storyCategory={StoryCategory.TOP_STORIES}/>
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
