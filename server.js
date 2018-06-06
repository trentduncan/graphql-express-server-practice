'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');


const {getPlayers, getPlayerById} = require('./resolvers/Queries');
const {postPlayer} = require('./resolvers/Mutations');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
type Query {
  getPlayers: [Player!]!
  getPlayerById(id: ID): Player!
  hello: String
}

type Mutation {
  postPlayer(
    username: String!,
    password: String!,
    skillRating: Int,
    roles: [String],
    heroPool: [String],
    email: String): Player
}

type Player {
  id: ID
  username: String!,
  skillRating: Int,
  roles: [String],
  heroPool: [String],
  email: String
}
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
  getPlayers,
  getPlayerById,
  postPlayer
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));


mongoose.connect('mongodb://localhost/graphql-teambuilder');
const db = mongoose.connection;
db.on('error', ()=> {console.log( '---FAILED to connect to mongoose');});
db.once('open', () => {
  console.log( '+++Connected to mongoose');
});
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');