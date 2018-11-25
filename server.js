const { ApolloServer, gql } = require("apollo-server");
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers');

const User = require('./models/User');
const Post = require('./models/Post');
/**
 * Connect to MongoDB
 * @type {string}
 */
const uri = process.env.MONGO_CONNECTION;
mongoose.connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to db');
  })
  .catch(() => {
    console.log('Error while connecting to DB');
  });

/**
 * Remove deprecation warning without indexes
 * https://github.com/Automattic/mongoose/issues/6890
 */
mongoose.set('useCreateIndex', true);


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post
  }
});


server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
