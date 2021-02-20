import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Linking, Alert, Button } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import Friend from './Friend.js';

const Pending = ({ user, toggleModal }) => {
  const { pendingRequests } = user;
  const { header } = styles;

  return (
    <View>
      <Text style={header}>Pending Requests</Text>
      {pendingRequests.map((req, i) => <Friend key={i} index={i} pendingUsername={req.username} />)}
      <Button title='close' onPress={() => toggleModal(false)} />
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30
  }
})

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(Pending);