'use strict';
const Player = require('../models/player');


async function getPlayers() {
  const players = await Player.find();
  return players;
}

module.exports = {
  getPlayers
};