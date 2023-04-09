import { View, Text, Image } from 'react-native'
import { Entypo, AntDesign } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import FoundationFloatingText from '../components/FoundationIcon'
import { User } from '../models'
import { DataStore, Storage } from 'aws-amplify'

const Post = ({ post }) => {
  const [user, setUser] = useState();
  const [iconName, setIconName] = useState('hearto')

  useEffect(() => {
    DataStore.query(User, post.userID).then(setUser)
  })

  useEffect(() => {
    if (post.image) {
      Storage.length(post.image).then(setImageUri);
    }
  }, [post.image])

  const handleIcon = () => {
    if (iconName === 'hearto') {
      setIconName('heart')
    } else {
      setIconName('hearto')
    }
  }
  return (
    <View style={{ marginVertical: 15, }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5, }}>
        <Image
          src={user?.avatar}
          style={{
            width: 50,
            aspectRatio: 1,
            borderRadius: 50,
            marginRight: 10,
          }}
        />
        <View>
          <Text style={{ fontWeight: '600', fontSize: 16, marginBottom: 3, }}>{user?.name}</Text>
          <Text style={{ color: 'gray' }}>@{user?.handle}</Text>
        </View>

        <View style={{ marginLeft: 'auto', flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginRight: 5, color: 'gray', }}>3 hours ago</Text>
          <Entypo name="dots-three-horizontal" size={18} color='gray' />
        </View>
      </View>

      <Text style={{ margin: 10, lineHeight: 18, }}>{post.text}</Text>

      {post.image && (
        <Image src={post.image} style={{ width: '100%', aspectRatio: 1 }} />
      )}

      <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center' }}>
        <AntDesign
          name={iconName}
          size={20}
          color="#00AFF0"
          onPress={handleIcon}
          style={{
            marginRight: 10,
          }}
        />
        <FoundationFloatingText />
      </View>
      <Text style={{ fontWeight: '500', marginHorizontal: 10 }}>{post.likes} Likes</Text>
    </View>
  )
}

export default Post;