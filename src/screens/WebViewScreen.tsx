import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';

interface State {
  url: string;
  title: string;
  loading: boolean;
  error: { message: string } | null;
}

export class WebViewScreen extends Component<NavigationScreenProps, State> {
  // @ts-ignore
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: state.params.title,
    };
  };

  constructor(props: any) {
    super(props);
    this.state = {
      url: '',
      title: '',
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    const url = this.props.navigation.getParam('url', '');
    const title = this.props.navigation.getParam('title', '');
    this.setState({
      url,
      title,
      loading: true,
      error: url ? null : { message: 'no url'},
    });
  }

  render() {
    return (
      <WebView style={{flex: 1}} source={{ uri: this.state.url }}/>
    );
  }
}

export default connect()(WebViewScreen);