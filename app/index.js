// Utilities
import { StyleSheet, View } from "react-native";

// Components
import UserCard from "../components/UserCard";


export default function Page() {
  return (
    <View style={styles.container}>
      <UserCard />
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
