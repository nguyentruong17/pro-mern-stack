import React, { useState, useEffect } from "react";
import { useLocation, Route } from "react-router-dom";

import graphQLFetch from "../../graphQLFetch.js";

import IssueFilter from "./IssueFilter.jsx";
import IssueTable from "./IssueTable.jsx";
import IssueAdd from "./IssueAdd.jsx";
import IssueDetail from "./IssueDetail.jsx";

const ViewIssues = (props) => {
  const [issues, setIssues] = useState([]);
  const [prevCreatedIssueId, setPrevCreatedIssueId] = useState(null);

  const { search } = useLocation();
  // const [params, setParams] = useState(new URLSearchParams(search));

  // //effect hook for when the location changes --> separate concerns
  // useEffect(() => {
  //   //console.log(search);
  //   setParams(new URLSearchParams(search));
  // }, [search]);

  useEffect(() => {
    //vars for querying
    const vars = {};
    //console.log(params.get("status"));
    const params = new URLSearchParams(search);
    const status = params.get("status");
    const maxEffort = Number.parseInt(params.get("maxEffort"));
    const minEffort = Number.parseInt(params.get("minEffort"));
    if (status) vars.status = status;
    if (maxEffort) vars.maxEffort = maxEffort;
    if (minEffort) vars.minEffort = minEffort;

    const getIssues = async () => {
      const query = `query filteredIssues (
        $status: StatusType
        $minEffort: Int
        $maxEffort: Int)
          {issues (
            status: $status
            minEffort: $minEffort
            maxEffort: $maxEffort)
              {
              id title status owner 
              created_at efforts due_at
              }
          }`;

      const data = await graphQLFetch(query, vars);
      const fetchedIssues = data ? data.issues : [];
      setIssues(fetchedIssues);
    };
    getIssues();
  }, [prevCreatedIssueId, search]);

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
      <hr />
      <Route path="/issues/:id">
        <IssueDetail />
      </Route>
    </>
  );
};

export default ViewIssues;
