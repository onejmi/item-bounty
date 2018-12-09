import React, { Component } from 'react';
import { Alert, Linking, Dimensions, LayoutAnimation, Text, View, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import Database from '../data/database';

let dialogueOpen =  false;
const database = new Database();

export default class CameraScreen extends Component {
  state = {
    hasCameraPermission: null,
    lastScannedId: null,
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
    LayoutAnimation.spring();
    this.setState({ lastScannedId: result.data });
  };

  render() {
    return (
      <View style={styles.container}>

        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                  }}
                />}

        {this._maybeRenderUrl()}
      </View>
    );
  }

  _handlePressCancel = () => {
    this.setState({ lastScannedId: null });
  };

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedId) {
      return;
    }
    else if(!dialogueOpen) {
      database.connect();
      database.getName(this.state.lastScannedId).then(name => {
        if(name.length > 0) {
          dialogueOpen = true;
          Alert.alert(
            'Scanned Item',
            `Found ID: ${this.state.lastScannedId}`,
            [
              {text: 'OK', onPress: () => {
                dialogueOpen = false;
                }
              }
            ],
            { cancelable: false }
          )
        }
      });
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },

});