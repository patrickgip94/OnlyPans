// UTILITIES
import { StyleSheet, View, FlatList, Text } from "react-native";
import { Link } from "expo-router";
import { useAuthenticator } from "@aws-amplify/ui-react-native";

// Components
import UserCard from "../src/components/UserCard";

// DATA - TEMP
import users from "../assets/data/users";

// ICON
import { Entypo } from '@expo/vector-icons';


export default function Page() {
  const { signOut } = useAuthenticator()
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Link href={'/newPost'} style={styles.createNewPost}>
          <Entypo name="plus" size={15} color="white" />CREATE NEW POST
        </Link>
        <Text onPress={() => signOut()}>Sign out</Text>
        <FlatList
          data={users}
          renderItem={({ item }) => <UserCard user={item} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 60,
  },
  contentContainer: {
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
  }
});