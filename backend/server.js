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

const app = express();

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
      resolve: () => losts,
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(5003, () => console.log("Server is running"));
