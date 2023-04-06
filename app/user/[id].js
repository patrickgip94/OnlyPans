// UTILITIES
import { useSearchParams } from 'expo-router';
import { Text, StyleSheet } from 'react-native'
import { useState } from 'react';

// COMPONENT
import UserProfileHeader from '../../src/components/UserProfileHeader';

// DUMMY DATA
import users from '../../assets/data/users';


const ProfilePage = () => {
  const [isSubscribed, setIsSubscribed] = useState(false)

  const { id } = useSearchParams();

  const user = users.find(u => u.id === id)

  if (!user) {
    return <Text>User was not found!</Text>
  }

  return (
    <UserProfileHeader
      user={user}
      isSubscribed={isSubscribed}
      setIsSubscribed={setIsSubscribed}
    />
  )
}

export default ProfilePage;

const styles = StyleSheet.create({})