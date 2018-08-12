import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionPayload } from '../../interfaces/stores';
import * as storiesActionTypes from './storiesActions.types';

export function fetchTopStoriesSuccess(data: any): ActionPayload {
  return {
    type: storiesActionTypes.FETCH_TOP_STORIES_SUCCESS,
    payload: data,
  };
}

export function fetchTopStoriesFailure(error: any): ActionPayload {
  return {
    type: storiesActionTypes.FETCH_TOP_STORIES_FAILURE,
    payload: error,
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
