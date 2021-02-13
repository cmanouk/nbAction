const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [ true, 'Please enter a valid username' ]
  },
  phoneNumber: String,
  pendingRequests: [{ username: String }],
  friends: [{ username: String, phoneNumber: String }],
  favorites: {
    teams: [{ teamName: String }],
    players: [{ playerName: String }]
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;