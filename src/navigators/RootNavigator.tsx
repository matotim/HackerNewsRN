import { createBottomTabNavigator } from 'react-navigation';

import StoriesScreen from '../screens/StoriesScreen';

export default createBottomTabNavigator({
  Stories: StoriesScreen,
});