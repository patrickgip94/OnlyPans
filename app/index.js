import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { User } from '../src/models';

// Components
import UserCard from "../src/components/UserCard";

// ICON
import { Entypo } from '@expo/vector-icons';

export default function Page() {
  const [users, setUsers] = useState([]);
  const [isPressed, setIsPressed] = useState(false); // track if the signOut text is pressed or not
  const { signOut } = useAuthenticator();

  useEffect(() => {
    // fetch users
    DataStore.query(User).then(setUsers);
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={[
            styles.signOut,
            isPressed && { opacity: 0.5 } // set opacity to 0.5 when the signOut text is pressed
          ]}
          onPress={() => signOut()}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
        >
          <Text style={{ color: 'white', fontWeight: '700' }}>Sign out</Text>
        </TouchableOpacity>
        <FlatList
          data={users}
          renderItem={({ item }) => <UserCard user={item} />}
          showsHorizontalScrollIndicator={false}
        />
        <Link href={'/newPost'} style={styles.createNewPost}>
          <Entypo name="plus" size={15} color="white" />CREATE NEW POST
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 60,
    backgroundColor: '#ffffff'
  },
  contentContainer: {
    flex: 1,
    marginBottom: 10,
  },
  createNewPost: {
    backgroundColor: '#00AFF0',
    width: '40%',
    color: 'white',
    fontWeight: '700',
    padding: 5,
    alignItems: 'center',
    borderRadius: 100,
    marginHorizontal: 120,
    marginBottom: 5,
  },
  signOut: {
    backgroundColor: '#00AFF0',
    width: '20%',
    alignItems: 'center',
    borderRadius: 100,
    marginBottom: 5,
  },
});