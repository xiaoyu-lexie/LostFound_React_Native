const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} = require("graphql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/userModel");
const cors = require("cors");

const { addNewUser } = require("./controllers/userController");
const { loginUser } = require("./controllers/userController");
const { addNewLost, fetchAllLosts } = require("./controllers/lostController");

const app = express();

app.use(cors());

const founds = [
  {
    id: "f1",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbGV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    title: "I found a wallet",
    location: "4th floor lobby",
    date: "2022-12-27",
    question: "What in the wallet",
  },
  {
    id: "f2",
    image:
      "https://images.unsplash.com/photo-1491013516836-7db643ee125a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNoaWxkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    title: "I found a baby",
    location: "park playground",
    date: "2022-12-28",
    question: "What's name of baby",
  },
];

const losts = [
  {
    id: "l1",
    title: "wallet",
    location: "cafe",
    description: "a red wallet",
    date: "2022-12-10",
    contact: "709-898-5400",
  },
  {
    id: "l2",
    title: "book",
    location: "classroom",
    description:
      "an English booksdfsdfdfsdfdjfkjdfhgjkfhdjghjdakjlhgjldkshjkdfbgkfdbngkljdbfkndklfngkldshgjkldhfgjlkhdflkghjjkdfhgkjlfdngjklkfgjhjflkhgkjldfhgjkfbdnkvjnbfkjlnvbjlkchvkjlhsdjkgbjkdflbvkljfnvkljxhclvkjhslkdjnfkjgbfjkllkjhvjkzxnjkvcnkdsfbjlkfdbgjkhgkjrhtirhtkrhkjvgnjdksnvkjbndsfkjvbgdlfskjghkjlsdhfgjkdshgkjhfdbjkbvkncbvnkdbavkljdhklgjhjldkfhgfkdjhgklds",
    date: "2022-12-15",
    contact: "606-233-3977",
  },
];

const LostType = new GraphQLObjectType({
  name: "Lost",
  description: "This represents a lost",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLString),
    },
    title: {
      type: GraphQLNonNull(GraphQLString),
    },
    location: {
      type: GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLNonNull(GraphQLString),
    },
    date: {
      type: GraphQLNonNull(GraphQLString),
    },
    contact: {
      type: GraphQLNonNull(GraphQLString),
    },
  }),
});

const FoundType = new GraphQLObjectType({
  name: "Found",
  description: "this represents a book",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLString),
    },
    image: {
      type: GraphQLNonNull(GraphQLString),
    },
    title: {
      type: GraphQLNonNull(GraphQLString),
    },
    location: {
      type: GraphQLNonNull(GraphQLString),
    },
    date: {
      type: GraphQLNonNull(GraphQLString),
    },
    question: {
      type: GraphQLNonNull(GraphQLString),
    },
  }),
});

const loginUserType = new GraphQLObjectType({
  name: "LoginUser",
  description: "This represents a user login",
  fields: () => ({
    token: {
      type: GraphQLNonNull(GraphQLString),
    },
    email: {
      type: GraphQLNonNull(GraphQLString),
    },
    expiresIn: {
      type: GraphQLNonNull(GraphQLInt),
    },
  }),
});

const AddUserType = new GraphQLObjectType({
  name: "AddUser",
  description: "This represents a user create new account",
  fields: () => ({
    token: {
      type: GraphQLNonNull(GraphQLString),
    },
    email: {
      type: GraphQLNonNull(GraphQLString),
    },
    expiresIn: {
      type: GraphQLNonNull(GraphQLInt),
    },
  }),
});

const AddLostType = new GraphQLObjectType({
  name: "AddLost",
  description: "This represents a user create new lost",
  fields: () => ({
    title: {
      type: GraphQLNonNull(GraphQLString),
    },
    location: {
      type: GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLNonNull(GraphQLString),
    },
    date: {
      type: GraphQLNonNull(GraphQLString),
    },
    contact: {
      type: GraphQLNonNull(GraphQLString),
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "root query",
  fields: () => ({
    foundList: {
      type: new GraphQLList(FoundType),
      description: "A list of founds",
      resolve: () => founds,
    },
    lostList: {
      type: new GraphQLList(LostType),
      description: "A list of losts",
      resolve: () => fetchAllLosts(),
    },
    loginUser: {
      type: loginUserType,
      description: "login a user",
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => loginUser(parent, args),
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addUser: {
      type: AddUserType,
      description: "add a user",
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => addNewUser(parent, args),
    },
    addLost: {
      type: AddLostType,
      description: "add a lost",
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        location: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString) },
        contact: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => addNewLost(parent, args),
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

module.exports = app;
