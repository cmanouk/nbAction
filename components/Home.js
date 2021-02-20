import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Button, ImageBackground } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import updateUser from '../redux/actions/user';

const HomeScreen = ({ navigation, updateUser }) => {
  const { container, image, login,loginHeader, loginTxt } = styles;
  const [username, setUsername] = useState('');

  const loginUser = (username) => {
    axios.get(`http://192.168.1.7:3000/login/${username.toLowerCase()}`)
      .then((res) => {
        updateUser(res.data[0]);
        navigation.navigate('AccountHomePage');
      })
      .catch((err) => console.error(err))
  };

  return (
    <View style={container}>
      <ImageBackground style={image} source={require('../assets/mvp.jpeg')}>
        <View style={login}>
          <Text style={loginHeader}>Username</Text>
          <TextInput
            style={loginTxt}
            placeholder='Enter username...'
            placeholderTextColor='#000'
            onChangeText={(username) => setUsername(username)}
            defaultValue={username}
          />
          <Button title="Login" onPress={() => loginUser(username)} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center'
  },
  login: {
    width: '75%',
    height: '30%',
    backgroundColor: '#FFFFFF',
    opacity: .5,
    borderRadius: 50,
    marginTop: -100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10
  },
  loginTxt: {
    fontSize: 25,
    marginBottom: 10
  }
});

const mapDispatchToProps = (dispatch) => ({
  updateUser: (user) => dispatch(updateUser(user))
});

export default connect(null, mapDispatchToProps)(HomeScreen);