import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import graphQLFetch from "../../graphQLFetch";

const IssueDetail = (props) => {
  const { id } = useParams();
  const [curIssue, setCurIssue] = useState({ id: "", description: "" });

  useEffect(() => {
    const fetchIssue = async (id) => {
      const query = `query getIssueById($id: Int!){
                issueById(id: $id) {
                    id description
                }
            }
            `;
      const data = await graphQLFetch(query, { id });
      setCurIssue(data.issueById);
    };
    fetchIssue((Number.parseInt(id)));
  }, [id]);

  return (
    <div>
      <h3>{`Description Issue ${curIssue.id}`}</h3>
      <pre>{curIssue.description}</pre>
    </div>
  );
};

export default IssueDetail;
