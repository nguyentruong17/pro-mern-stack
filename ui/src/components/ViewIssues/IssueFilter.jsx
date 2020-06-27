import React, { useState, useEffect, useRef } from "react";
//import { NavLink, Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";

const IssueFilter = (props) => {
  const history = useHistory();
  const { search } = useLocation();
  const [ currentStatus, setCurrentStatus] = useState(new URLSearchParams(search).get('status') || '');
  const filtersChanged = useRef(false)
  
  useEffect(() => {    
    setCurrentStatus(new URLSearchParams(search).get('status') || '')
  }, [search]);

  const handleOnChange = (e) => {
    const status = e.target.value;
    //const { history } = props; //got from the withRouter wrapper function
    setCurrentStatus(status)
    filtersChanged.current = true
  };

  const handleSubmit = () => {
    //const { history } = props; //got from the withRouter wrapper function
    history.push({
      pathname: "/issues",
      search: currentStatus ? `?status=${currentStatus}` : "",
    });
    filtersChanged.current = false
  }

  const handleCancel = () => {
    setCurrentStatus(new URLSearchParams(search).get('status') || '')
    filtersChanged.current = false
  }

  
  return (
    <div>
      Status:{" "}
      <select value={currentStatus} onChange={handleOnChange}>
        <option value="">(All)</option>
        <option value="New">New</option>
        <option value="Assigned">Assigned</option>
      </select>
      {' | '}
      <button type='submit' onClick={handleSubmit}>Filter</button>
      <button type='submit' onClick={handleCancel} disabled={!filtersChanged.current}>Cancel</button>
    </div>
  );
};

export default IssueFilter;
