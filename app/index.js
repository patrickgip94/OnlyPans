// Utilities
import { StyleSheet, View, FlatList } from "react-native";

// Components
import UserCard from "../src/components/UserCard";

// DATA - TEMP
import users from "../assets/data/users";


export default function Page() {
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserCard user={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 75,
  },
});
