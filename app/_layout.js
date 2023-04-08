import { Stack } from "expo-router";
import { Amplify } from "aws-amplify";
import awsconfig from '../src/aws-exports';
import { Authenticator } from '@aws-amplify/ui-react-native';
import { KeyboardAvoidingView, Platform } from "react-native";


Amplify.configure(awsconfig);


export default function RootLayout() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios'
        ? 'padding'
        : 'height'
      }
      style={{ flex: 1 }}
    >
      <Authenticator.Provider>
        <Authenticator>
          <Stack screenOptions={{ headerShown: false }} />
        </Authenticator>
      </Authenticator.Provider>
    </KeyboardAvoidingView>
  )
}