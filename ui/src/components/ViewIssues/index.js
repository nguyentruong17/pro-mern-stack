import React, { useState, useEffect } from 'react';

import graphQLFetch from "../../graphQLFetch.js";

import IssueFilter from './IssueFilter.jsx';
import IssueTable from './IssueTable.jsx';
import IssueAdd from './IssueAdd.jsx';

const IssueList =  (props) => {
  const [issues, setIssues] = useState([]);
  const [prevCreatedIssueId, setPrevCreatedIssueId] = useState(null);

  useEffect(() => {
    const getIssues = async () => {
      const query = `query {
            issues {
              id title status owner created_at
              efforts due_at
            }
          }`;

      const data = await graphQLFetch(query);
      const fetchedIssues = data ? data.issues : [];
      setIssues(fetchedIssues);
    };
    getIssues();
  }, [prevCreatedIssueId]);

  const onAddIssue = async (issue) => {
    // const query = `mutation {
    //   addIssue(
    //     issue: {
    //       title: "${issue.title}",
    //       owner: "${issue.owner}",
    //       due_at: "${issue.due_at}"
    //     }
    //   ) {
    //     id
    //   }
    // }`

    const query = `mutation addIssue($issue: InputIssue!){
        addIssue(issue: $issue){
          id
        }
      }
      `;

    const data = await graphQLFetch(query, { issue });
    const id = data ? data.id : null;
    setPrevCreatedIssueId(id);
  };

  return (
    <>
      <h1>Issue Tracker</h1>
      <IssueFilter />
      <hr />
      <IssueTable issues={issues} />
      <hr />
      <IssueAdd onAddIssue={onAddIssue} />
    </>
  );
};

export default IssueList;