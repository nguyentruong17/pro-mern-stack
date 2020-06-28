import React, { useState, useEffect, useRef } from "react";
//import { NavLink, Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";

const IssueFilter = (props) => {
  const history = useHistory();
  const { search } = useLocation();
  const [currentStatus, setCurrentStatus] = useState(
    new URLSearchParams(search).get("status") || ""
  );
  const [currentMin, setCurrentMin] = useState(
    new URLSearchParams(search).get("minEffort") || ""
  );
  const [currentMax, setCurrentMax] = useState(
    new URLSearchParams(search).get("maxEffort") || ""
  );
  const filtersChanged = useRef(false);
  const firstLoad = useRef(true);

  useEffect(() => {
    setCurrentStatus(new URLSearchParams(search).get("status") || "");
    setCurrentMin(new URLSearchParams(search).get("minEffort") || "");
    setCurrentMax(new URLSearchParams(search).get("maxEffort") || "");
  }, [search]);

  useEffect(() => {
    if(firstLoad.current === false) {
      filtersChanged.current = true;
    }
  }, [currentStatus, currentMin, currentMax]);

  useEffect(() => {
    firstLoad.current = false;
  }, [])

  const handleOnStatusChange = (e) => {
    const status = e.target.value;
    //const { history } = props; //got from the withRouter wrapper function
    setCurrentStatus(status);
  };

  const handleOnMinChange = (e) => {
    const min = Number.parseInt(e.target.value);
    setCurrentMin(min || "");
  };

  const handleOnMaxChange = (e) => {
    const max = Number.parseInt(e.target.value);
    setCurrentMax(max || "");
  };

  const handleSubmit = () => {
    //const { history } = props; //got from the withRouter wrapper function
    // history.push({
    //   pathname: "/issues",
    //   search: currentStatus ? `?status=${currentStatus}` : "",
    // });
    // filtersChanged.current = false
    const params = new URLSearchParams();
    if (currentStatus) params.set("status", currentStatus);
    if (currentMin && currentMin >= 0) params.set("minEffort", currentMin);
    if (currentMax && currentMax >= 0) params.set("maxEffort", currentMax);
    const search = params.toString() ? `?${params.toString()}` : "";

    history.push({ pathname: "/issues", search });
    filtersChanged.current = false;
  };

  const handleCancel = () => {
    setCurrentStatus(new URLSearchParams(search).get("status") || "");
    setCurrentMin(new URLSearchParams(search).get("minEffort") || "");
    setCurrentMax(new URLSearchParams(search).get("maxEffort") || "");

    filtersChanged.current = false;
  };

  return (
    <div>
      Status:{" "}
      <select value={currentStatus} onChange={handleOnStatusChange}>
        <option value="">(All)</option>
        <option value="New">New</option>
        <option value="Assigned">Assigned</option>
      </select>
      {"   "}Efforts between:{" "}
      <input
        type="number"
        min={"0"}
        value={currentMin}
        onChange={handleOnMinChange}
      />
      {" - "}
      <input
        type="number"
        min={"0"}
        value={currentMax}
        onChange={handleOnMaxChange}
      />
      {" | "}
      <button type="submit" onClick={handleSubmit}>
        Filter
      </button>
      <button
        type="submit"
        onClick={handleCancel}
        disabled={!filtersChanged.current}
      >
        Cancel
      </button>
    </div>
  );
};

export default IssueFilter;
