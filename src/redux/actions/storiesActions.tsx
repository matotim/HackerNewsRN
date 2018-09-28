import axios from 'axios';
import Config from 'react-native-config';
import { ActionStory, StoryCategory } from '../../interfaces/stores';
import * as storiesActionTypes from './storiesActions.types';

export function fetchStoriesSuccess(
  data: any,
  category: StoryCategory,
): ActionStory {
  return {
    type: storiesActionTypes.FETCH_STORIES_SUCCESS,
    payload: data,
    category,
  };
}

export function fetchStoriesFailure(
  error: any,
  category: StoryCategory,
): ActionStory {
  return {
    type: storiesActionTypes.FETCH_STORIES_FAILURE,
    payload: error,
    category,
  };
}

export function fetchStories(
  category: StoryCategory,
): (dispatch: any) => void {
  return (dispatch) => {
    dispatch({ type: storiesActionTypes.FETCH_STORIES, category });
    return axios
      .get(Config.API_URL + category + '.json')
      .then(response => {
        dispatch(fetchStoriesSuccess(response.data, category));
      })
      .catch(error => {
        dispatch(fetchStoriesFailure(error, category));
      });
  };
}
