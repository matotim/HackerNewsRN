import { Action } from 'redux';

export interface RootState {
  topstories: StoriesState;
  beststories: StoriesState;
  newstories: StoriesState;
}

export interface StoriesState {
  isFetching: boolean;
  error: object | null;
  stories: Story[] | null;
  ids: string[] | null;
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

export interface Story {
  id: number;
  by: string;
  kids: number[] | null;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}