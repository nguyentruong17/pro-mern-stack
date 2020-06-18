const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express')
const { MongoClient } = require('mongodb')
const fs = require('fs')
const { GraphQLScalarType } = require('graphql');
//const { serialize } = require('v8');
const { Kind, parseValue } = require('graphql/language')
const app = express();
const DB_URL = 'mongodb://localhost/issuetracker';

app.use(express.static('public'));

let aboutMessage = 'Issue Tracker API 1.0'
// let issuesDB =  [
//   {
//     id: 1, status: 'New', owner: 'Ravan', effort: 5,
//     created_at: new Date('2018-08-15'), due_at: undefined,
//     title: 'Error in console when clicking Add',
//   },
//   {
//     id: 2, status: 'Assigned', owner: 'Eddie', effort: 14,
//     created_at: new Date('2018-08-16'), due_at: new Date('2018-08-30'),
//     title: 'Missing bottom border on panel',
//   },
// ];
let db

const connectDB = async () => {
  const client = new MongoClient(DB_URL, { useNewUrlParser: true })
  await client.connect()
  console.log('DB Connected!')
  db = client.db()
}

const connectExpress = async () => {
  try {
    await connectDB()
    app.listen(3000, function () {
      console.log('App started on port 3000');
    });
  } catch (e) {
    console.log('ERR', e1)
  }
  
}


//RESOLVERS
const setAboutMessage = (obj, args, context, info) => {
  const { message } = args
  return aboutMessage = message
}

const issues = (obj, args, context, info) => { //this resolver now becomes a async func, and is handled by graph-ql: a resolver can return a value or a Promise
  //return issuesDB
  if(!db) {
    console.log('DB is not connected')
    return []
  }
  return db.collection('issues').find().toArray() //async
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
const isCreatedLTEDue = (created_date, due_date) => {
  return created_date.getFullYear() <= due_date.getFullYear() &&
    created_date.getMonth() <= due_date.getMonth() &&
    created_date.getDate() <= due_date.getDate();
}
const validateAddingIssue = (issueToBeAdded) => {
  const errors = []
  //should i validate for the existence of title here or that'd be handled by graphql?
  if (issueToBeAdded.title && issueToBeAdded.title.length < 3) {
    errors.push('Title must be at least 3 characters long!')
  }

  if (issueToBeAdded.due_at && !isCreatedLTEDue(issueToBeAdded.created_at, issueToBeAdded.due_at)) {
    errors.push('Due date must be after created date!')
  }

  if (errors.length > 0 ) {
    throw new UserInputError('Invalid Input(s)', { errors })
  }
}

const getNextSequence = async (collectionName) => {
  const returnDoc = await db.collection('counters').findOneAndUpdate( //atomic manner
    { _id: collectionName }, //filter
    { $inc: {current: 1} }, //update query, increment the current counter by 1
    { returnOriginal: false } //mongodb in default will return an instance of the document before being modified
  ) 
  return returnDoc.value.current //check NodeJS MongoDB Driver API for returning object
}

const addIssue = async (obj, args, context, info) => {
  const { issue } = args
  
  issue.id = await getNextSequence('issues')
  if (!issue.status) issue.status = 'New'
  issue.created_at = new Date()
  //console.log(typeof issue.due_at)
  validateAddingIssue(issue)
  const returnDoc = await db.collection('issues').insertOne(issue) // ibsert to the server
  const createdIssue = await db.collection('issues').findOne( // find the one created on the server
    { _id: returnDoc.insertedId }
  )
  return createdIssue //anw, i dont see the point of finding the issue on the server, bc we can just append the insertedId to our object and return it
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

connectExpress()
