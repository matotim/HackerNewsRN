import Axios from 'axios';
import { AnyAction, Dispatch } from 'redux';
import * as storiesActionTypes from './storiesActions.types';

export function fetchTopStoriesSuccess(data: object): AnyAction {
  return {
    type: storiesActionTypes.FETCH_TOP_STORIES_SUCCESS,
    data,
  };
}

export function fetchTopStoriesFailure(error: object): AnyAction {
  return {
    type: storiesActionTypes.FETCH_TOP_STORIES_FAILURE,
    error,
  };
}

export function fetchTopStories(): object {
  return (dispatch: Dispatch) => {
    return Axios.get('http://www.google.fr')
      .then(response => {
        dispatch(fetchTopStoriesSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchTopStoriesFailure(error));
      });
  };
}
