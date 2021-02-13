import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Button } from 'react-native';

const Profile = ({ navigation, route }) => {
  return <Text>{route.params.name}</Text>;
};

export default Profile;