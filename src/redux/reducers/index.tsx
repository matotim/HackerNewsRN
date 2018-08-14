import { combineReducers } from 'redux';
import { TopStoriesReducer } from './storiesReducer';

const rootReducer = combineReducers(TopStoriesReducer);

export default rootReducer;
