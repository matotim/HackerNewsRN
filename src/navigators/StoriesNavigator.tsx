import React from 'react';
import { Platform, View } from 'react-native';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';

import { TopStoriesScreen, BestStoriesScreen, NewStoriesScreen } from '../screens';

export default createStackNavigator({
  Main: {
    screen: createMaterialTopTabNavigator({
      Top: TopStoriesScreen,
      Best: BestStoriesScreen,
      New: NewStoriesScreen,
    }, {
      tabBarOptions: {
        style: {
          backgroundColor: 'white',
          borderTopColor: 'transparent',
          elevation: 0,
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
      title: 'CleanHN',
      headerStyle: {
        borderBottomColor: 'transparent',
        elevation: 0,
      },
      headerTitleStyle: {
        fontWeight: Platform.OS === 'ios' ? '500' : '400',
        textAlign: 'center',
        flex: 1,
      },
    },
  },
  // Details: DetailsScreen,
});