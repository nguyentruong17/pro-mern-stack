const { ApolloServer } = require("apollo-server-express");
const { about, issue } = require("../resolvers");
const { GraphQLDate } = require("../custom_types");
const path = require('path')
const fs = require("fs");

require("dotenv").config();

const ENABLE_CORS = process.env.ENABLE_CORS;

//resolvers are specified as nested objects that follow the structure of the schema
const resolvers = {
  //all resolvers functions are supplied 4 args like this:

  //fieldName(obj, args, context, info)

  //obj: an obj containing the result return from the resolver on the parent field
  //args: an obj containing args passed into the fieldName in the query/typeDefs
  //context: an obj shared by all resolvers in a particular query, such as auth info
  //info: an obj containing info about the execution state of the query

  Query: {
    about: about.getAboutMessage,
    issues: issue.getIssues,
    issueById: issue.getIssueById,
  },
  Mutation: {
    setAboutMessage: about.setAboutMessage,
    addIssue: issue.addIssue,
  },
  GraphQLDate,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.resolve(__dirname, '../schema.graphql'), { encoding: "utf-8" }),
  resolvers,
  formatError: (err) => {
    console.log(err); //log to the server console
    return err;
  },
});

const installMiddlewareToServer = (expressApp) => {
  //install the ApolloServer as a middleware in Express
  //mounting the middleware to /graphql path
  server.applyMiddleware({ app: expressApp, path: "/graphql", cors: !!ENABLE_CORS }); //cors default to true in apollo-server
};

module.exports = installMiddlewareToServer