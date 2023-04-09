import { View, Text, SafeAreaView, TextInput, StyleSheet, Button, Image } from 'react-native'
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { DataStore, Storage } from 'aws-amplify';
import { Post } from '../src/models';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import * as Crypto from 'expo-crypto';

// ICON
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const NewPost = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');

  const { user } = useAuthenticator()

  const router = useRouter();

  const onPost = async () => {
    console.warn("Post:", text)
    const imageKey = await uploadImage();

    await DataStore.save(
      new Post({
        text,
        likes: 0,
        userID: user.attributes.sub,
        image: imageKey,
      })
    );

    setText('');
    setImage('');
  }

  async function uploadImage() {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const fileKey = `${Crypto.randomUUID()}.png`;
      await Storage.put('fileKey', blob, {
        contentType: 'image/jpeg' // contentType is optional 
      });
      return fileKey;
    } catch (err) {
      console.log('Error uploading file:', err)
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  };

  return (
    <SafeAreaView style={styles.newPostComponent}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Ionicons
          onPress={() => router.back()}
          name="arrow-back"
          size={26}
          color='black'
          style={{ marginRight: 10 }}
        />
        <Text style={{ fontWeight: '500', fontSize: 20, marginLeft: 10 }}>New Post</Text>
      </View>
      <TextInput
        placeholder='Compose new post...'
        value={text}
        onChangeText={setText}
        multiline
        numberOfLines={3}
        style={{ borderBottomWidth: 1, borderColor: 'lightgray' }}
      />
      <View style={{ marginVertical: 15, }}>
        <Feather onPress={pickImage} name="image" size={24} color="gray" />
      </View>

      {image && <Image src={image} style={{ width: '60%', aspectRatio: 1, marginBottom: 10, }} />}
      <Button title='Post' onPress={onPost} />
    </SafeAreaView>
  )
}

export default NewPost;

const styles = StyleSheet.create({
  newPostComponent: {
    marginTop: 70,
    margin: 10,
  },
})