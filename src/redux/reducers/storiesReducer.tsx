import {
  ActionStory,
  StoriesState,
  StoryCategory,
} from '../../interfaces/stores';
import { storiesActionTypes } from '../actions';

const initialState: StoriesState = {
  isFetching: false,
  error: null,
  stories: null,
};

function categoryReducer(category: StoryCategory) {
  return (
    state: StoriesState = initialState,
    action: ActionStory,
  ): StoriesState => {
    switch (action.type) {
      case storiesActionTypes.FETCH_STORIES:
        return { ...state, isFetching: true };
      case storiesActionTypes.FETCH_STORIES_SUCCESS:
        return { ...state, isFetching: false, stories: action.payload };
      case storiesActionTypes.FETCH_STORIES_FAILURE:
        return { ...state, isFetching: false, error: action.payload };
      default:
        return state;
    }
  };
}

export const TopStoriesReducer = categoryReducer(StoryCategory.TOP_STORIES);
export const BestStoriesReducer = categoryReducer(StoryCategory.BEST_STORIES);
export const NewStoriesReducer = categoryReducer(StoryCategory.NEW_STORIES);
