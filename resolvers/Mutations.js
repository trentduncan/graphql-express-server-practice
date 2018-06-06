'use strict';
const Player = require('../models/player');


async function postPlayer({username, password, skillRating, roles, heroPool, email }) {
  try {
    const hashedPassword = await Player.hashPassword(password);
    const newPlayer = await Player.create({
      username,
      password: hashedPassword,
      skillRating, 
      roles, 
      heroPool, 
      email
    });
    return newPlayer;
  }
  catch (err) {
    if (err.code === 11000) {
      err.message = 'username already exists, no duplicates'
    }
  }
}

async function updatePlayer({id,username, skillRating, roles, heroPool, email }) {
    const updatedPlayer = await Player.findByIdAndUpdate(id, {
    username,
    skillRating, 
    roles, 
    heroPool, 
    email
    }, 
    { new: true});
    return updatedPlayer;
}

async function deletePlayer({id}) {
  return Player.findByIdAndRemove(id);
}


// async function getPlayerById({id}) {
//     const player = await Player.findById(id);
//     return player;
//   }

module.exports = {
  postPlayer,
  updatePlayer,
  deletePlayer
};