import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Linking, Alert, Button } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

const Friends = ({ toggleModal, user }) => {
  const { friends } = user;
  const { header } = styles;

  return (
    <View>
      <ScrollView>
        <Text style={header}>Friends</Text>
        {friends.map((friend, i) => <Text key={i}>{friend.username}</Text>)}
      </ScrollView>
      <Button title='close' onPress={() => toggleModal(false)} />
    </View>


  )
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold'
  }
})

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
}

export default connect(mapStateToProps)(Friends);