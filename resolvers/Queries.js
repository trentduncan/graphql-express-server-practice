'use strict';
const Player = require('../models/player');


async function getPlayers() {
  const players = await Player.find();
  return players;
}

async function getPlayerById({id}) {
    const player = await Player.findById(id);
    return player;
  }

module.exports = {
  getPlayers,
  getPlayerById
};