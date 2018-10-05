import React from 'react';
import { View } from 'react-native';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.fetch = require('jest-fetch-mock');
Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-native-vector-icons/FontAwesome5', () => {
  class FontAwesome5 extends React.Component {
    render() {
      return <View />
    }
  }
  return FontAwesome5;
});