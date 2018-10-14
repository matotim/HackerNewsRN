import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';

interface State {
  url: string | null;
  loading: boolean;
  error: { message: string } | null;
}

export class WebViewScreen extends Component<NavigationScreenProps, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      url: null,
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    const url = this.props.navigation.getParam('url');
    this.setState({
      url,
      loading: true,
      error: url ? null : { message: 'no url'},
    });
  }

  render() {
    return (
      <View/>
    );
  }
}

export default connect()(WebViewScreen);