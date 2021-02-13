const express = require('express');
const bp = require('body-parser');
const db = require('../database/index');
const User = require('../database/models/User');

const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get('/login/:username', async(req, res) => {
  const { username } = req.params;
  try {
    const user = await User.find({ username });
    res.send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.post('/create/user', async(req, res) => {
  const { username, phoneNumber } = req.body;
  try {
    const user = await new User({ username, phoneNumber });
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.delete('/delete/user', async(req, res) => {
  const { username } = req.body;
  try {
    const user = await User.deleteOne({ username });
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.delete('/delete/all', (req, res) => {
  User.deleteMany({}, (err) => err ? res.send(err) : res.send('Success!'));
});

app.listen(3000, () => {
  console.log('App is up on 3000...');
});