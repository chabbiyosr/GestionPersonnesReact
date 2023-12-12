import { View, Text } from 'react-native'
import React from 'react'

export default function Chat(props) {
  const currentid= props.route.params.currentid;
  const friendsid= props.route.params.friendsid;
  return (
    <View>
      <Text>current {currentid}</Text>
      <Text>friend {friendsid}</Text>
    </View>
  )
}