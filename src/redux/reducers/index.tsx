import { combineReducers } from 'redux';
import myStories from './storiesReducer';

const rootReducer = combineReducers(myStories);

export default rootReducer;
