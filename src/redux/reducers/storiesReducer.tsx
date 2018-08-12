import { ActionPayload, StoriesState } from '../../interfaces/stores';
import { storiesActionTypes } from '../actions';

const initialState: StoriesState = {
  isFetching: false,
  error: null,
  stories: null,
};

export default function(
  state: StoriesState = initialState,
  action: ActionPayload,
): StoriesState {
  switch (action.type) {
    case storiesActionTypes.FETCH_TOP_STORIES:
      return { ...state, isFetching: true };
    case storiesActionTypes.FETCH_TOP_STORIES_SUCCESS:
      return { ...state, isFetching: false, stories: action.payload };
    case storiesActionTypes.FETCH_TOP_STORIES_FAILURE:
      return { ...state, isFetching: false, error: action.payload };
    default:
      return state;
  }
}
