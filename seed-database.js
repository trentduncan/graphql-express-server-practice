'use strict';

const mongoose = require('mongoose');

const Player = require('./models/player');

const seedPlayers = require('./db/seed/players');

mongoose.connect('mongodb://localhost/graphql-teambuilder')
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    return Promise.all([
      Player.insertMany(seedPlayers),
      Player.createIndexes()
    ]);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });