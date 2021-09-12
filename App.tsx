import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';

import * as ImagePicker from 'expo-image-picker'
import * as Sharing from 'expo-sharing'

export default function App() {
  const [image, setImage] = React.useState('https://picsum.photos/200/300')

  const handleShowImagePicker = async(): Promise<void> => {

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if(status != 'granted') {

      alert('Precisamos da permissão para continuar')

    } else {

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        base64: false,
        quality: 1
      })

      if(result.cancelled) return;
      setImage(result.uri)

      let sharing = await Sharing.isAvailableAsync()
      if(!sharing) return alert('Seu celular não suporta o recurso de compartilhamento.')

      await Sharing.shareAsync(result.uri)

    }

  }


  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: image }} />
      <TouchableOpacity onPress={() => handleShowImagePicker()}><Text>Clique em mim</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 200,
    height: 300
  }
});
