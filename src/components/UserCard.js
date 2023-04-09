// Utilities
import { Image, ImageBackground, StyleSheet, Text, View, Pressable } from "react-native";
import { Link } from "expo-router";

function UserCard({ user }) {

  return (
    <View>
      <Link href={`/user/${user.id}`} asChild>
        <Pressable>
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
              <Text style={{ color: 'white', fontWeight: '600' }}>@{user.handle}</Text>

            </View>
          </ImageBackground>
        </Pressable>
      </Link>
    </View>
  )
}

export default UserCard;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    ...StyleSheet.absoluteFillObject,
  },
  userCard: {
    backgroundColor: 'gray',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 5,
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