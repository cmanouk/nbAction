import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Linking, Alert, Button } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import updateUser from '../redux/actions/user';

const Friend = ({ user, pendingUsername, index }) => {
  const { username, pendingRequests, friends } = user
  const { users } = styles;
  const [res, toggleShow] = useState(false);

  const updateUserAsync = (friendReqRes, username) => {
    let updates = {};
    const newPending = [...pendingRequests]
    const pendingFriend = pendingRequests.find((f) => f.username === pendingUsername);
    newPending.splice(index, 1);
    if (friendReqRes) updates['friends'] = [...friends, pendingFriend];
    updates['pendingRequests'] = newPending;
    axios.patch(`http://192.168.1.7:3000/update/${username}`, { updates})
      .then((res) => updateUser(updates))
      .catch((err) => console.error(err));
  };

  return (
    <TouchableOpacity onPress={() => toggleShow(true)}>
      <Text style={users}>{pendingUsername}</Text>
      {res ?
      <View style={{ flexDirection: 'row'}}>
        <Button
          onPress={() => updateUserAsync(true, username)}
          title='Accept'
        />
        <Button
          onPress={() => updateUserAsync(false, username)}
          title='Reject'
        />
      </View> :
      null}
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  users: {
    fontSize: 20,
    marginBottom: 5
  }
});

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
}

const mapDispatchToProps = (dispatch) => ({
  updateUser: (updates) => dispatch(updateUser(updates))
});

export default connect(mapStateToProps, mapDispatchToProps)(Friend);