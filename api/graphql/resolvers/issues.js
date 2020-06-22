const { UserInputError } = require("apollo-server-express");
const { getDB } = require("../../mongodb");
//const DB = getDB() //doesnt work
const getBiggerDate = (date1, date2) => {
  return date1 >= date2 ? date1 : date2;
};

const validateAddingIssue = (issueToBeAdded) => {
  const errors = [];
  //should i validate for the existence of title here or that'd be handled by graphql?
  if (issueToBeAdded.title.length < 3) {
    errors.push("Title must be at least 3 characters long!");
  }

  if (issueToBeAdded.owner.length === 0) {
    errors.push("Owner name cannot be empty!");
  }

  if (
    issueToBeAdded.due_at &&
    getBiggerDate(issueToBeAdded.created_at, issueToBeAdded.due_at) ===
      issueToBeAdded.created_at
  ) {
    errors.push("Due date must be after created date!");
  }

  if (errors.length > 0) {
    throw new UserInputError("Invalid Input(s)", { errors });
  }
};

//////// EXPORTS //////////
 
const getNextSequence = async (collectionName) => {
  const DB = getDB();
  const returnDoc = await DB.collection("counters").findOneAndUpdate(
    //atomic manner
    { _id: collectionName }, //filter
    { $inc: { current: 1 } }, //update query, increment the current counter by 1
    { returnOriginal: false } //mongodb in default will return an instance of the document before being modified
  );
  return returnDoc.value.current; //check NodeJS MongoDB Driver API for returning object
};

const getIssues = (obj, args, context, info) => {
  //this resolver now becomes a async func, and is handled by graph-ql: a resolver can return a value or a Promise
  //return issuesDB
  const DB = getDB();
  return DB.collection("issues").find().toArray(); //async
};
const addIssue = async (obj, args, context, info) => {
  const { issue } = args;

  issue.id = await getNextSequence("issues");
  if (!issue.status) issue.status = "New";
  issue.created_at = new Date();
  //console.log(typeof issue.due_at)
  validateAddingIssue(issue);
  const DB = getDB();
  const returnDoc = await DB.collection("issues").insertOne(issue); // ibsert to the server
  const createdIssue = await DB.collection("issues").findOne(
    // find the one created on the server
    { _id: returnDoc.insertedId }
  );
  return createdIssue; //anw, i dont see the point of finding the issue on the server, bc we can just append the insertedId to our object and return it
};

module.exports = { getIssues, addIssue };
