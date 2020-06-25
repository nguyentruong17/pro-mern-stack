import React from "react";

const IssueFilter = (props) => {
  return (
    <div>
      <a href="/#/issues">All Issues</a>
      {" | "}
      <a href="/#/issues?status=New">New Issues</a>
      {" | "}
      <a href="/#/issues?status=Assigned">Assigned Issues</a>
    </div>
  );
};

export default IssueFilter;
