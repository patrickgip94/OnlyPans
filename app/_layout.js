import { Stack } from 'expo-router';
import { API, Amplify, Hub } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
import { Authenticator } from '@aws-amplify/ui-react-native';
import { useEffect } from 'react';
import { KeyboardAvoidingView, Image, StyleSheet, View } from 'react-native';

Amplify.configure(awsconfig);

const CreateUserMutation = `
mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    handle
    bio
    subscriptionPrice
  }
}
`;

export default function RootLayout() {
  useEffect(() => {
    const removeListener = Hub.listen('auth', async (data) => {
      if (data.payload.event === 'signIn') {
        const userInfo = data.payload.data.attributes;
        console.log(JSON.stringify(userInfo, null, 2));

        // DataStore.save(new User({ id: userInfo.sub, name: userInfo.name }));

        // save user to database
        const newUser = {
          id: userInfo.sub,
          name: userInfo.name,
          handle: userInfo.nickname,
          subscriptionPrice: 0,
        };
        await API.graphql({
          query: CreateUserMutation,
          variables: { input: newUser },
        });
      }
    });

    return () => {
      // cleanup function
      removeListener();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios'
        ? 'padding'
        : 'height'
      }
      style={{ flex: 1 }}
    >
      <Authenticator.Provider>
        <View style={styles.container}>
          <Image src="https://i.imgur.com/ZYitfgM.png" resizeMode='contain' style={styles.logoImage} />
        </View>
        <Authenticator>
          <Stack screenOptions={{ headerShown: false }} />
        </Authenticator>
      </Authenticator.Provider>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -150,
    marginTop: -100,
  },
  logoImage: {
    flex: 1,
    width: '100%',
    aspectRatio: 0.9,
    marginTop: 150
  }
})