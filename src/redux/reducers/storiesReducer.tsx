import { AnyAction } from 'redux';
import { IStoriesStateType } from '../../types/stores';
import { storiesActionTypes } from '../actions';

const initialState = {
  isFetching: false,
  error: null,
  stories: null,
};

export default function(
  state: IStoriesStateType = initialState,
  action: AnyAction,
): IStoriesStateType {
  switch (action.type) {
    case storiesActionTypes.FETCH_TOP_STORIES:
      return { ...state, isFetching: true };
    case storiesActionTypes.FETCH_TOP_STORIES_SUCCESS:
      return { ...state, isFetching: false, stories: action.data };
    case storiesActionTypes.FETCH_TOP_STORIES_FAILURE:
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
}
