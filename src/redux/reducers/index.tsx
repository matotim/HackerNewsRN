import { combineReducers } from 'redux';
import {
  TopStoriesReducer,
  BestStoriesReducer,
  NewStoriesReducer,
} from './storiesReducer';

const rootReducer = combineReducers({
  topstories: TopStoriesReducer,
  beststories: BestStoriesReducer,
  newstories: NewStoriesReducer,
});

export default rootReducer;
