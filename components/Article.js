import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Linking, Alert } from 'react-native';
import axios from 'axios';

const Article = ({ article }) => {
  const { title, description, url, urlToImage, publishedAt } = article;
  const { container, titleText } = styles;
  return (
    <View style={container}>
      <Image
        source={{uri: urlToImage}}
        style={{width: 80, height: 80, marginRight: 10}}
      />
      <TouchableOpacity
        onPress={async() => {
          const supported = await Linking.canOpenURL(url);
          if (supported) {
            await Linking.openURL(url);
          } else {
            Alert.alert('Url not recognized')
          }
        }}
      >
        <Text style={titleText}>{title}</Text>
        <Text>{publishedAt}</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    marginBottom: 30
  },
  titleText: {
    width: 270
  }
})

export default Article;