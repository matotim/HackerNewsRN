import axios from 'axios';
import Config from 'react-native-config';
import { Dispatch } from 'redux';
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
): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch) => {
    dispatch({ type: storiesActionTypes.FETCH_STORIES });
    return axios
      .get(Config.API_URL)
      .then(response => {
        dispatch(fetchStoriesSuccess(response.data, category));
      })
      .catch(error => {
        dispatch(fetchStoriesFailure(error, category));
      });
  };
}
