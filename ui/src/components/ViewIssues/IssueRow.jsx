import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

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
      <td>
        <Link to={`/edit/${issue.id}`}>Edit</Link>         
        {' | '}
        <NavLink to= { {pathname: `/issues/${issue.id}`, search: useLocation().search } }>Details</NavLink>
      </td>
    </tr>
  );
};

export default IssueRow;
