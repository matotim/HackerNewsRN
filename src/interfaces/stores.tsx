export interface StoriesState {
  isFetching: boolean;
  error: object | null;
  stories: object | null;
}

export interface ActionPayload<T = any> {
  type: string;
  payload: T;
}
