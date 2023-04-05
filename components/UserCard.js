import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import users from "../assets/data/users";

const user = users[0];

function UserCard() {
  return (
    <ImageBackground source={{ uri: user.coverImage }} style={styles.userCard}>
      {/* OVERLAY FOR IMAGE BACKGROUND */}
      <View style={styles.overlay} />
      {/* IMAGE */}
      <Image
        src={user.avatar}
        style={styles.userImage}
      />
      {/* NAME & HANDLE */}
      <View>
        <Text
          style={{
            color: 'white',
            fontSize: 22,
            fontWeight: '500',
            marginBottom: 5,
          }}
        >
          {user.name}
        </Text>
        <Text style={{ color: 'white' }}>@{user.handle}</Text>
      </View>
    </ImageBackground>
  )
}

export default UserCard;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    ...StyleSheet.absoluteFillObject,
  },
  userCard: {
    backgroundColor: 'gray',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 10,
    overflow: 'hidden',
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 3.5,
    marginRight: 20,
  },
})