import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Button, ImageBackground, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import config from '../config.js';

const Favorites = ({ user, toggleModal, updateFeedFavorites }) => {
  const { header, teamList, playerList, txt, subHead } = styles;
  const { favorites: { teams, players }} = user;

  const fetchArticles = (name) => {
    axios.get(`https://newsapi.org/v2/everything?q=${name}&sortBy=publishedAt&pageSize=10&apiKey=${config.news}`)
    .then((res) => {
      updateFeedFavorites(res.data.articles);
      toggleModal(false);
    })
    .catch((err) => console.error(err));
  }

  return (
    <View>
      <Text style={header}>Favorites</Text>
      <View style={teamList}>
        <Text style={subHead}>Teams</Text>
        {teams.map((team, i) => {
          return (
            <TouchableOpacity key={i} onPress={() => fetchArticles(team.teamName)}>
              <Text style={txt}>{team.teamName}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
      <View style={playerList}>
        <Text style={subHead}>Players</Text>
        {players.map((player, i) => {
          return (
            <TouchableOpacity key={i} onPress={() => fetchArticles(player.playerName)}>
              <Text style={txt}>{player.playerName}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
      <Button title='close' onPress={() => toggleModal(false)} />
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20
  },
  teamList: {
    height: '30%'
  },
  playerList: {
    height: '50%'
  },
  txt: {
    fontSize: 20,
    marginBottom: 3
  },
  subHead: {
    fontSize: 25,
    fontWeight: 'bold'
  }
});

const mapStateToProps = (state) => {
  const { user } = state
  return { user }
};

export default connect(mapStateToProps, null)(Favorites);