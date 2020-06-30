import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";

import graphQLFetch from "../../utils/graphQLFetch";
import { replaceNullByEmptyString } from "../../utils/object";

import EditIssueRow from "./EditIssueRow.jsx";

const EditIssue = (props) => {
  const { id } = useParams();
  const defaultIssue = {
      createdAt: "",
      status: "",
      owner: "",
      efforts: "",
      dueAt: "",
      title: "",
      description: ""
  }
  const [curIssue, setCurIssue] = useState(defaultIssue);
  const {
    createdAt,
    status,
    owner,
    efforts,
    dueAt,
    title,
    description
  } = curIssue;

  useEffect(() => {
    const fetchIssue = async (id) => {
      const query = `query getIssueById($id: Int!){
                issueById(id: $id) {
                    id created_at status owner efforts due_at title description
                }
            }
            `;
      const data = await graphQLFetch(query, { id });
      const { created_at, due_at, ...rest} = data.issueById;
      const toBeCurIssue = { createdAt: created_at, dueAt: due_at, ...rest};
      replaceNullByEmptyString(toBeCurIssue);
      setCurIssue(toBeCurIssue);
    };
    fetchIssue((Number.parseInt(id)));
  }, [id]);

  const handleChange = (key) => (value) => {
      setCurIssue({ ...curIssue, [key]: value || ""});
  }

  const handleSubmit = async () => {
    // const query = `mutation updateIssue($id: Int!, $changes: UpdateIssue!){
    //     updateIssue(id: $id, changes: $changes) {
    //         id created_at status owner efforts due_at title description
    //     }
    // }
    // `;
    // const data = await graphQLFetch(query, {  });
    console.log('Submitted!')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{`Editing issue: ${id}`}</h3>
      <table>
        <tbody>
          
          <EditIssueRow
            labelString='Created At'
            value={createdAt}
            disabled={true}
          />
        
          <EditIssueRow
            labelString='Status'
            value={status}
            options={['New', 'Assigned', 'Fixed', 'Closed']}
            handleChange={handleChange('status')}
          />
          
          <EditIssueRow
            labelString='Owner'
            value={owner}
            disabled={true}
          />
         
          <EditIssueRow
            labelString='Effort'
            value={efforts}
            type='number'
            handleChange={handleChange('efforts')}
          />
         
          <EditIssueRow
            labelString='Due At'
            value={dueAt}
            handleChange={handleChange('dueAt')}
          />
         
          <EditIssueRow
            labelString='Title'
            value={title}
            handleChange={handleChange('title')}
            size={50}
          />
          
          <EditIssueRow
            labelString='Description'
            value={description}
            handleChange={handleChange('description')}
            textarea={true}
            rows={8}
            cols={50}
          />
          
          <tr>
            <td />
            <td>
              <button type="submit">Submit</button>
            </td>
          </tr>
        </tbody>
      </table>
      <Link to={`/edit/${id - 1}`}>Prev</Link>
      {" | "}
      <Link to={`/edit/${id + 1}`}>Next</Link>
    </form>
  );
};

export default EditIssue;
