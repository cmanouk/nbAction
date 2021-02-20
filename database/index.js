const mongoose = require('mongoose');
const mongoUri = require('../configDb')

const db = mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

db
  .then(() => console.log(`Connected to: ${mongoUri}`))
  .catch((err) => console.error(err));

module.exports = db;