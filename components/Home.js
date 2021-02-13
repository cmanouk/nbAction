import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  return (
    <View>
      <Text>
        Username
      </Text>
      <TextInput
        placeholder='Enter username...'
        onChangeText={(username) => setUsername(username)}
        defaultValue={username}
      />
      <Button
        title="Login"
        onPress={() =>
          navigation.navigate('AccountHomePage', { name: username })
        }
      />
    </View>
  );
};

export default HomeScreen;