import axios from 'axios';
import { AnyAction, Dispatch } from 'redux';
import * as storiesActionTypes from './storiesActions.types';

export function fetchTopStoriesSuccess(data: any): AnyAction {
  return {
    type: storiesActionTypes.FETCH_TOP_STORIES_SUCCESS,
    data,
  };
}

export function fetchTopStoriesFailure(error: any): AnyAction {
  return {
    type: storiesActionTypes.FETCH_TOP_STORIES_FAILURE,
    error,
  };
}

export function fetchTopStories(): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch) => {
    dispatch({ type: storiesActionTypes.FETCH_TOP_STORIES });
    return axios.get('http://www.google.fr')
      .then(response => {
        dispatch(fetchTopStoriesSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchTopStoriesFailure(error));
      });
  };
}
