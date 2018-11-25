const { ApolloServer, gql } = require("apollo-server");
const mongoose = require('mongoose');

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
//mongoose.set('useCreateIndex', true);

const todos = [
  { task: "Wash car", completed: false },
  { task: "Clean room", completed: true }
];

const typeDefs = gql`
  type Todo {
    task: String
    completed: Boolean
  }

  type Query {
    getTodos: [Todo]
  }

`;

const server = new ApolloServer({
  typeDefs,
});


server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
