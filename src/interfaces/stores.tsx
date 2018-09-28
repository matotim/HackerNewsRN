import { Action } from 'redux';

export interface RootState {
  topstories: StoriesState;
  beststories: StoriesState;
  newstories: StoriesState;
}

export interface StoriesState {
  isFetching: boolean;
  error: object | null;
  stories: object | null;
}

export interface ActionPayload<T = any> extends Action {
  type: string;
  payload: T;
}

export interface ActionStory extends ActionPayload {
  category: StoryCategory;
}

export enum StoryCategory {
  TOP_STORIES = 'topstories',
  BEST_STORIES = 'beststories',
  NEW_STORIES = 'newstories',
}
