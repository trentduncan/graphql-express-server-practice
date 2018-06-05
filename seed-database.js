'use strict';

const mongoose = require('mongoose');

const Player = require('./models/player');

const seedPlayers = require('./db/seed/players');

// seed production db 'mongodb://tdunk:dev@ds255889.mlab.com:55889/ow-teamfinder-db-trent'
mongoose.connect('mongodb://localhost/ow-teamfinder-backend')
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