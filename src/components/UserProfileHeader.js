// UTILITIES
import { useRouter } from 'expo-router';
import { View, Text, ImageBackground, StyleSheet, SafeAreaView, Image, Pressable } from 'react-native'
import { useState } from 'react';

// ICONS
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const UserProfileHeader = ({ user, isSubscribed, setIsSubscribed }) => {
  const [iconName, setIconName] = useState('star-o')
  const router = useRouter();

  // Favorite Icon
  const favoriteHandle = () => {
    if (iconName === 'star-o') {
      setIconName('star')
    } else {
      setIconName('star-o')
    }
  }

  return (
    <View>
      <ImageBackground source={{ uri: user.coverImage }} style={styles.cover}>
        <View style={styles.overlay} />

        <SafeAreaView style={styles.bannerView}>
          <Ionicons
            onPress={() => router.back()}
            name="arrow-back"
            size={28}
            color='white'
            style={{ marginRight: 10, }}
          />

          <View style={{ marginTop: 10 }}>
            <Text style={styles.userName}>
              {user.name}
            </Text>
            <Text style={{ color: 'white' }}>1.4K Posts · 64.3K Likes · 15.3K Pans</Text>
          </View>
        </SafeAreaView>

      </ImageBackground>

      <View style={{ padding: 10, }}>
        <View style={styles.userImageSection}>
          <Image src={user.avatar} style={styles.avatar} />
          <Ionicons
            name="chatbox-ellipses-outline"
            size={24}
            color='#00AFF0'
            style={styles.iconImage}
          />
          <FontAwesome
            name={iconName}
            size={24}
            color='#00AFF0'
            style={styles.iconImage}
            onPress={favoriteHandle}
          />
          <FontAwesome
            name="share-square-o"
            size={24}
            color='#00AFF0'
            style={styles.iconImage}
          />
        </View>
        <Text style={{ fontSize: 20, fontWeight: '600', marginVertical: 5, }}>{user.name}</Text>
        <Text style={{ color: 'gray', marginBottom: 10, }}>@{user.handle}</Text>
        <Text style={{ lineHeight: 20 }} numberOfLines={6}>{user.bio}</Text>

        <Text style={{ color: 'gray', marginTop: 20, fontWeight: 'bold' }}>SUBSCRIPTION</Text>

        <Pressable
          onPress={() => setIsSubscribed(!isSubscribed)}
          style={[
            styles.button,
            { backgroundColor: isSubscribed ? 'white' : '#00AFF0' }]}
        >
          <Text style={[styles.buttonText, { color: isSubscribed ? '#00AFF0' : 'white' }]}>
            {isSubscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}
          </Text>
          <Text style={[styles.buttonText, { color: isSubscribed ? '#00AFF0' : 'white' }]}>
            {user.subscriptionPrice === 0
              ? "FOR FREE"
              : `$${user.subscriptionPrice.toFixed(2)} / month`}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default UserProfileHeader;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginVertical: 10,
  },
  buttonText: {
    color: "#00AFF0",
    fontWeight: '600',
  },
  cover: {
    height: 200,
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0,0.6)',
  },
  userName: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 5,
  },
  bannerView: {
    marginHorizontal: 20,
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 3,
    marginRight: 20,
  },
  userImageSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: -60,
    paddingRight: 20,
  },
  iconImage: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    paddingTop: 10,
  }
})