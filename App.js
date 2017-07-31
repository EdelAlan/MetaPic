import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import ImagePicker from 'react-native-image-picker';

export default class App extends React.Component {

  state = {
    picture: null,
    pictureSource: null,
    videoSource: null,
    widthSource: null,
    heightSource: null,
    fileSizeSource: null,
    latitudeSource: null,
    longitudeSource: null,
    timestampSource: null
  };

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 10000,
      maxHeight: 10000,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        waitUntilSaved: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // let source = { uri: 'data:image/jpeg;base64,' + response.data };


        this.setState({
          picture: source,
          pictureSource: response.uri,
          widthSource: response.width,
          heightSource: response.height,
          fileSizeSource: response.fileSize,
          latitudeSource: response.latitude,
          longitudeSource: response.longitude,
          timestampSource: response.timestamp

        });
      }
    });
  }

  render() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title="Home"
          onPress={() => this.setState({ selectedTab: 'home' })}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} style={styles.contentContainer} >
              <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}, {marginTop: 20}]}>
              { this.state.pictureSource === null ? <Text>Select a Photo</Text> :
                <Image style={styles.avatar} source={this.state.picture} />
              }
              </View>
            </TouchableOpacity>

            { this.state.picture &&
              <Text style={{margin: 8, textAlign: 'center'}} selectable={true}>
                URI – {this.state.pictureSource}{'\n'}
                {'\n'}
                WIDTH – {this.state.widthSource}p{'\n'}
                {'\n'}
                HEIGHT – {this.state.heightSource}p{'\n'}
                {'\n'}
                FILE SIZE – {this.state.fileSizeSource} bytes{'\n'}
                {'\n'}
                LATITUDE – {this.state.latitudeSource}{'\n'}
                {'\n'}
                LONGITUDE – {this.state.longitudeSource}{'\n'}
                {'\n'}
                TIMESTAMP – {this.state.timestampSource}
              </Text>
            }
          </ScrollView>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'profile'}
          title="Profile"
          onPress={() => this.setState({ selectedTab: 'profile' })}>

          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          </ScrollView>

        </TabNavigator.Item>
      </TabNavigator>

    );
  }

}

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 25,
    width: 300,
    height: 300
  }
});
