import { createBottomTabNavigator } from 'react-navigation';

import StoriesNavigator from './StoriesNavigator';

export default createBottomTabNavigator({
  Stories: StoriesNavigator,
});