import React, { Component, RefObject } from 'react';
import { ActivityIndicator, Linking, StyleSheet, Text, TouchableOpacity, View, WebView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Story } from '../utils/types';
import { StoryList } from '../components/StoryList';


interface State {
  story: Story | null;
  loading: boolean;
  error: { message: string } | null;
  modalVisible: boolean;
}

export class WebViewScreen extends Component<NavigationScreenProps, State> {
  // @ts-ignore
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: state.params.story && state.params.story.title,
      headerRight: navigation.state.params && navigation.state.params.headerRight,
    };
  };

  webViewRef: WebView | null = null;

  constructor(props: any) {
    super(props);
    this.state = {
      story: null,
      loading: false,
      error: null,
      modalVisible: false,
    };
  }

  refreshWebView = () => {
    this.toggleModal();
    if (this.webViewRef) {
      this.webViewRef.reload();
    }
  };

  shareStory = () => {
    this.toggleModal();
    setTimeout(() => {
      if (this.state.story) {
        StoryList.shareUrl(this.state.story);
      }
    }, 400);
  };

  openInBrowser = () => {
    this.toggleModal();
    if (this.state.story) {
      Linking.openURL(this.state.story.url);
    }
  };

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  componentDidMount() {
    const story = this.props.navigation.getParam('story', '');
    this.setState({
      story,
      loading: true,
      error: story ? null : { message: 'no url' },
    });
    this.props.navigation.setParams({
      headerRight: (
        <TouchableOpacity onPress={this.toggleModal}>
          <Icon name={'more-vert'} size={26} style={{ paddingRight: 8 }}/>
        </TouchableOpacity>
      ),
    });
  }

  render() {
    if (!this.state.story) {
      return (
        <View>
          <ActivityIndicator style={styles.activityIndicator} size="large"/>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <WebView ref={ref => this.webViewRef = ref} style={styles.webView} source={{ uri: this.state.story.url }}/>
        <Modal isVisible={this.state.modalVisible} style={styles.modal} onBackdropPress={this.toggleModal}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={this.refreshWebView}>
              <Text style={styles.modalText}>Refresh</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.shareStory}>
              <Text style={styles.modalText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.openInBrowser}>
              <Text style={styles.modalText}>Open in browser</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 3,
  },
  modalText: {
    padding: 16,
  },
  activityIndicator: {
    padding: 10,
  },
});

export default connect()(WebViewScreen);