/** @format */

import App from './src/App';
import { Navigation } from 'react-native-navigation';

Navigation.registerComponent('navigation.playground.App', () => App);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            component: {
              name: 'navigation.playground.App',
              options: {
                bottomTab: {
                  text: 'Stories',
                }
              }
            },
          }
        ],
      },
    }
  });
});
