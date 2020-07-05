import * as React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Icon, Avatar, Input} from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Label from './Label';

export default class CustomImage extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    let label = this.props.label
    if (this.props.required) label += ' *';

    return (
      <>
        <Label>{label}</Label>
        <TouchableOpacity
            onPress={this._pickImage} 
            style={{
                justifyContent: 'center', alignItems: 'center'
            }}
        >
            <View size='giant' style={{backgroundColor: '#ccc', width: 70, height: 70, borderRadius: '50%', justifyContent: 'center', alignItems: 'center'}}>
                {image && <Avatar size='giant' source={{uri: image}} style={{position: 'absolute', backgroundColor: '#ccc', width: 70, height: 70}}/>}
                <Icon name='plus' style={{zIndex: 9999, width: 40, height: 40, color: '#777'}}/>
            </View>
        </TouchableOpacity>
      </>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      let uriParts = []
      let fileType = '';
      try {
        uriParts = result.uri.split('/')[1].split(';');
        fileType = uriParts[0]

      } catch {
        uriParts = result.uri.split('.');
        fileType = uriParts[uriParts.length - 1]
      }

      const file = {
        uri: result.uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      }

      this.props.onChange(file)
      console.log(file);
    } catch (E) {
      console.log(E);
    }
  };

  _takePhoto = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
}