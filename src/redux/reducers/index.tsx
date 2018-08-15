import { combineReducers } from 'redux';
import {
  TopStoriesReducer,
  BestStoriesReducer,
  NewStoriesReducer,
} from './storiesReducer';

const rootReducer = combineReducers({
  TopStoriesReducer,
  BestStoriesReducer,
  NewStoriesReducer,
});

export default rootReducer;
