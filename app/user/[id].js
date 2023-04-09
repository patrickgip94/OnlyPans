// UTILITIES
import { useSearchParams } from 'expo-router';
import { Text, StyleSheet, FlatList, View } from 'react-native'
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { User, Post as PostModel } from '../../src/models';

// COMPONENT
import UserProfileHeader from '../../src/components/UserProfileHeader';
import Post from '../../src/components/Post';

// ICON
import { FontAwesome5 } from '@expo/vector-icons';


const ProfilePage = () => {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false)

  const { id } = useSearchParams();

  useEffect(() => {
    DataStore.query(User, id).then(setUser);
    DataStore.query(PostModel, (post) => post.userID.eq(id)).then(setPosts);
  }, [id]);


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