import { Platform } from 'react-native';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';

import { TopStoriesScreen, BestStoriesScreen, NewStoriesScreen } from '../screens';

export default createStackNavigator({
  Main: {
    screen: createMaterialTopTabNavigator({
      Top: TopStoriesScreen,
      New: BestStoriesScreen,
      Best: NewStoriesScreen,
    }, {
      tabBarOptions: {
        style: {
          backgroundColor: 'white',
          borderTopColor: 'transparent',
        },
        labelStyle: {
          color: 'black',
          fontWeight: Platform.OS === 'ios' ? '600' : '500',
        },
        indicatorStyle: {
          backgroundColor: '#5FAAF4',
        },
      },
    }),
    navigationOptions: {
      title: 'Stories',
      headerStyle: {
        borderBottomColor: 'transparent',
      },
    },
  },
  // Details: DetailsScreen,
});