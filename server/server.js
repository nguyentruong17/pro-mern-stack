const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express')
const fs = require('fs')
const { GraphQLScalarType } = require('graphql');
//const { serialize } = require('v8');
const { Kind, parseValue } = require('graphql/language')
const app = express();

app.use(express.static('public'));

let aboutMessage = 'Issue Tracker API 1.0'
let issuesDB =  [
  {
    id: 1, status: 'New', owner: 'Ravan', effort: 5,
    created_at: new Date('2018-08-15'), due_at: undefined,
    title: 'Error in console when clicking Add',
  },
  {
    id: 2, status: 'Assigned', owner: 'Eddie', effort: 14,
    created_at: new Date('2018-08-16'), due_at: new Date('2018-08-30'),
    title: 'Missing bottom border on panel',
  },
];


//RESOLVERS
const setAboutMessage = (obj, args, context, info) => {
  const { message } = args
  return aboutMessage = message
}

const issues = (obj, args, context, info) => {
  return issuesDB
}

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'JS Date type for GraphQL',
  //serialize data way out
  serialize(value) {
    return value.toISOString()
  },

  //parse data way in
  parseLiteral(ast) { //when date is passed directly as string (if not string then return undefined)
    //return (ast.kind === Kind.STRING) ? new Date(ast.value) : undefined 
    //returning an undefined type indicating GraphQL that this type cannot be converted into Date --> will be treated as error
    if (ast.kind === Kind.STRING) {
      const date = new Date(ast.value)
      return isNaN(date) ? undefined : date
    }
    //return nothing will be treated the same as return undefined
  },
  parseValue(value) { //when date is passed as variable
    //return new Date(value) // do we need to return undefined if new Date(value) returns an Invalid Date?
    const date = new Date(value)
    return isNaN(date) ? undefined : date
  }
})

//https://stackoverflow.com/questions/43855166/how-to-tell-if-two-dates-are-in-the-same-day
const isSameDay = (d1, d2) => {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}
const validateAddingIssue = (issueToBeAdded) => {
  const errors = []
  //should i validate for the existence of title here or that'd be handled by graphql?
  if (issueToBeAdded.title && issueToBeAdded.title.length < 3) {
    errors.push('Title must be at least 3 characters long!')
  }

  if (issueToBeAdded.due_at && !isSameDay(issueToBeAdded.created_at,issueToBeAdded.due_at)) {
    errors.push('Due date must be after created date!')
  }

  if (errors.length > 0 ) {
    throw new UserInputError('Invalid Input(s)', { errors })
  }
}

const addIssue = (obj, args, context, info) => {
  const { issue } = args
  
  issue.id = issuesDB.length + 1 //will be replaced with id system like uuid4
  if (!issue.status) issue.status = 'New'
  issue.created_at = new Date()
  //console.log(typeof issue.due_at)
  validateAddingIssue(issue)
  issuesDB = [...issuesDB, issue]
  return issue
}



//resolvers are specified as nested objects that follow the structure of the schema
const resolvers = {
  //all resolvers functions are supplied 4 args like this:
  
  //fieldName(obj, args, context, info)

  //obj: an obj containing the result return from the resolver on the parent field
  //args: an obj containing args passed into the fieldName in the query/typeDefs
  //context: an obj shared by all resolvers in a particular query, such as auth info
  //info: an obj containing info about the execution state of the query

  Query: {
    about: (obj, args, context, info) => aboutMessage, //simply return the about message
    issues
  },
  Mutation: {
    setAboutMessage,
    addIssue
  },
  GraphQLDate
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', {encoding: 'utf-8'}),
  resolvers,
  formatError: err => {
    console.log(err) //log to the server console
    return err
  }

})

//install the ApolloServer as a middleware in Express
//mounting the middleware to /graphql path
server.applyMiddleware({ app, path: '/graphql' })

app.listen(3000, function () {
  console.log('App started on port 3000');
});
