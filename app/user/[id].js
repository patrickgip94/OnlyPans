// UTILITIES
import { useSearchParams } from 'expo-router';
import { Text, StyleSheet, FlatList, View } from 'react-native'
import { useState } from 'react';

// COMPONENT
import UserProfileHeader from '../../src/components/UserProfileHeader';
import Post from '../../src/components/Post';

// DUMMY DATA
import users from '../../assets/data/users';
import posts from '../../assets/data/posts';

// ICON
import { FontAwesome5 } from '@expo/vector-icons';


const ProfilePage = () => {
  const [isSubscribed, setIsSubscribed] = useState(false)

  const { id } = useSearchParams();

  const user = users.find(u => u.id === id)

  if (!user) {
    return <Text>User was not found!</Text>
  }

  if (!isSubscribed) {
    return (
      <View>
        <UserProfileHeader
          user={user}
          isSubscribed={isSubscribed}
          setIsSubscribed={setIsSubscribed}
        />
        <View style={{ backgroundColor: 'gainsboro', alignItems: 'center', padding: 20, }}>
          <FontAwesome5 name="lock" size={50} color="gray" />
          <Text style={styles.subPost}>Subscribe to see user's posts</Text>
        </View>
      </View>
    )
  }

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <Post post={item} />}
      ListHeaderComponent={() =>
        <UserProfileHeader
          user={user}
          isSubscribed={isSubscribed}
          setIsSubscribed={setIsSubscribed}
        />}
    />
  )
}

export default ProfilePage;

const styles = StyleSheet.create({
  subPost: {
    backgroundColor: '#00AFF0',
    padding: 15,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    color: 'white',
    margin: 20,
  },
})