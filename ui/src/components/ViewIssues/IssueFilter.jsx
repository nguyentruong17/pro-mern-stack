import React from "react";
//import { NavLink, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const IssueFilter = (props) => {
  const history = useHistory();
  
  const handleOnChange = (e) => {
    const status = e.target.value;
    //const { history } = props; //got from the withRouter wrapper function
    history.push({
      pathname: "/issues",
      search: status ? `?status=${status}` : "",
    });
  };
  return (
    <div>
      Status:{" "}
      <select onChange={handleOnChange}>
        <option value="">(All)</option>
        <option value="New">New</option>
        <option value="Assigned">Assigned</option>
      </select>
    </div>
  );
};

export default IssueFilter;
