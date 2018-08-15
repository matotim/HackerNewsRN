import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import store from '../redux/store';
import TopStoriesScreen from './StoriesScreen';
import { StoryCategory } from '../interfaces/stores';

export const STORIES_SCREEN = 'hackernewsRN.storiesScreen';

export function registerScreens() {
  Navigation.registerComponentWithRedux(STORIES_SCREEN, () => TopStoriesScreen, Provider, store);
}

export function startApp() {
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: [
            storiesScreen('Stories', StoryCategory.TOP_STORES),
          ],
        },
      },
    });
  });
}

const storiesScreen = (id: string, category: StoryCategory) => {
  return {
    component: {
      name: STORIES_SCREEN,
      passProps: {
        category,
      },
      options: {
        bottomTab: {
          text: id,
        },
      },
    },
  };
};

export const storieopTabs = [
  storiesScreen('TOP', StoryCategory.TOP_STORES),
  storiesScreen('BEST', StoryCategory.BEST_STORIES),
  storiesScreen('NEW', StoryCategory.NEW_STORIES),
];