import React from 'react';

const IssueRow = ({ issue }) => {
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.created_at}</td>
      <td>{issue.efforts}</td>
      <td>{issue.due_at}</td>
      <td>{issue.title}</td>
      <td><a href={`/#/edit/${issue.id}`}>Edit</a></td>
    </tr>
  );
};

export default IssueRow;
