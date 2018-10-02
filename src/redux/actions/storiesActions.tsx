import axios, { AxiosResponse } from 'axios';
import Config from 'react-native-config';
import { ActionStory, StoryCategory } from '../../utils/types';
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

export function fetchStoriesIdsSuccess(
  data: any,
  category: StoryCategory,
): ActionStory {
  return {
    type: storiesActionTypes.FETCH_STORIES_IDS_SUCCESS,
    payload: data,
    category,
  };
}

export function fetchStoriesIdsFailure(
  error: any,
  category: StoryCategory,
): ActionStory {
  return {
    type: storiesActionTypes.FETCH_STORIES_FAILURE,
    payload: error,
    category,
  };
}

export function fetchStoriesIds(
  category: StoryCategory,
): (dispatch: any) => void {
  return (dispatch) => {
    dispatch({ type: storiesActionTypes.FETCH_STORIES, category });
    return axios
      .get(Config.API_URL + category + '.json')
      .then(response => {
        dispatch(fetchStoriesIdsSuccess(response.data, category));
      })
      .catch(error => {
        dispatch(fetchStoriesIdsFailure(error, category));
      });
  };
}

export function fetchStories(
  ids: string[],
  category: StoryCategory,
): (dispatch: any) => void {
  return (dispatch) => {
    dispatch({ type: storiesActionTypes.FETCH_STORIES, category });
    return axios.all(ids.map((id: string) => {
      return axios.get(Config.API_URL + 'item/' + id + '.json');
    })).then((responses: AxiosResponse[]) => {
      const stories = responses.map(r => r.data);
      dispatch(fetchStoriesSuccess(stories, category));
    }).catch(error => {
      dispatch(fetchStoriesIdsFailure(error, category));
    });
  };
}
