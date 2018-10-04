import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.fetch = require('jest-fetch-mock');
Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-native-vector-icons/FontAwesome5', () => {
  const React = require('React');
  class FontAwesome5 extends React.Component {
    render() {
      return React.createElement('View');
    }
  }
  return FontAwesome5;
});