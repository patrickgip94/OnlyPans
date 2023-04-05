// UTILITIES
import { useRouter, useSearchParams } from 'expo-router';
import { View, Text } from 'react-native'

// DUMMY DATA
import users from '../../assets/data/users';

const ProfilePage = () => {
  const router = useRouter();
  const { id } = useSearchParams();

  const user = users.find(u => u.id === id)

  if (!user) {
    return <Text>User was not found!</Text>
  }


  return (
    <View style={{ marginTop: 100 }}>
      <Text>Profile page: {user.name} </Text>
      <Text onPress={() => router.back()}>Go back</Text>
    </View>
  )
}

export default ProfilePage;