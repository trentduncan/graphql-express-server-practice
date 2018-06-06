'use strict';
const Player = require('../models/player');


async function postPlayer({username, password, skillRating, roles, heroPool, email }, root) {
  console.log(root);
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
   


// async function getPlayerById({id}) {
//     const player = await Player.findById(id);
//     return player;
//   }

module.exports = {
  postPlayer
};