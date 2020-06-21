/* global db print */
/* eslint no-restricted-globals: "off" */
const issuesDB = [
  {
    id: 1,
    status: "New",
    owner: "Ravan",
    efforts: 100,
    created_at: new Date("2018-08-15"),
    due_at: undefined,
    title: "Error in console when clicking Add",
  },
  {
    id: 2,
    status: "Assigned",
    owner: "Eddie",
    efforts: 100,
    created_at: new Date("2018-08-16"),
    due_at: new Date("2018-08-30"),
    title: "Missing bottom border on panel",
  },
];

//inserting

//first to the issues collections
db.issues.remove({}); //ensure that the db is empty before initializing data
db.issues.insertMany(issuesDB);
const numIssues = db.issues.count();
//print is a restricted global var
print(`Inserted ${numIssues} issues`); //should be 2

//second to the counters collections
db.counters.remove({}); //same reason as above
db.counters.insertOne({ _id: "issues", current: numIssues });

//create indexes
//1 is for asc order, -1 is for desc order
db.issues.createIndex({ id: 1 }, { unique: true });
db.issues.createIndex({ status: 1 });
db.issues.createIndex({ owner: 1 });
db.issues.createIndex({ created_at: 1 });

//text index for searching the title
db.issues.createIndex({ title: "text" });
