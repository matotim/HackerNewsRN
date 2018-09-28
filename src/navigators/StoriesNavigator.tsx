import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';

import { TopStoriesScreen, BestStoriesScreen, NewStoriesScreen } from '../screens';

export default createStackNavigator({
  Main: createMaterialTopTabNavigator({
    Top: TopStoriesScreen,
    New: BestStoriesScreen,
    Best: NewStoriesScreen,
  }),
  // Details: DetailsScreen,
});