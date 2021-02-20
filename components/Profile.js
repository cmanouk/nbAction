import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import config from '../config';
import Article from './Article';
import Favorites from './Favorites';
import Pending from './Pending';
import Friends from './Friends';

const Profile = ({ navigation, user }) => {
  const { username, pendingRequests } = user;
  const { filters, main, media, btnText, modalView, centeredView, header } = styles;
  const [feedAll, updateFeedAll] = useState([]);
  const [feedFavorites, updateFeedFavorites] = useState([]);
  const [modalDisplay, toggleModal] = useState(false);

  useEffect(() => {
    if (!feedAll.length) {
      axios.get(`https://newsapi.org/v2/everything?q=nba&sortBy=publishedAt&pageSize=10&apiKey=${config.news}`)
      .then((res) => updateFeedAll(res.data.articles))
      .catch((err) => console.error(err))
    }
  });

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={!!modalDisplay}>
        <View style={centeredView}>
          <View style={modalView}>
            {
              modalDisplay === 'favorites' ?
              <Favorites toggleModal={toggleModal} updateFeedFavorites={updateFeedFavorites}/> :
              modalDisplay === 'pending' ?
              <Pending username={username} toggleModal={toggleModal} /> :
              modalDisplay === 'friends' ?
              <Friends toggleModal={toggleModal} /> :
              null
            }
          </View>
        </View>
      </Modal>
      <View style={filters}>
        <TouchableOpacity onPress={() => updateFeedFavorites([])}>
          <Text style={btnText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleModal('favorites')}>
          <Text style={btnText}>Favorites</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={main}>
        <Text style={header}>Articles</Text>
        {feedFavorites.length ?
        feedFavorites.map((article, i) => <Article key={i} article={article} />) :
        feedAll.map((article, i) => <Article key={i} article={article} />)}
      </ScrollView>
      <View style={media}>
        <TouchableOpacity onPress={() => toggleModal('friends')}>
          <Text style={btnText}>{username}'s Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleModal('pending')}>
          <Text style={btnText}>{pendingRequests.length ? pendingRequests.length : 0} Pending Reqs</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  filters: {
    flexDirection: 'row',
    height: '7.5%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'grey'
  },
  main: {
    height: '81%',
    width: '100%',
    padding: 10,
    flexWrap: 'wrap'
  },
  media: {
    height: '12.5%',
    backgroundColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 20
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    height: '75%',
    width: '75%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  header: {
    fontSize: 25,
    marginBottom: 10
  }
});

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, null)(Profile);