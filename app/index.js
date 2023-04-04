import { Image, StyleSheet, Text, View } from "react-native";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.userCard}>
        {/* IMAGE */}
        <Image
          src="https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png"
          style={styles.userImage}
        />
        {/* NAME & HANDLE */}
        <Text>Elon Musk</Text>
        <Text>@elonmusk</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 75,
  },
  userCard: {
    
  },
  userImage: {
    width: 100,
    height: 100,
  },
});
