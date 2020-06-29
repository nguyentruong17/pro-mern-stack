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
  const [filtersChanged, setFiltersChanged] = useState(false);
  const firstLoad = useRef(true);
  const justCancel = useRef(false);
  //console.log(`Just canceled? ${justCancel.current}`)

  useEffect(() => {
    console.log("Here SEARCH");

    setCurrentStatus(new URLSearchParams(search).get("status") || "");
    setCurrentMin(new URLSearchParams(search).get("minEffort") || "");
    setCurrentMax(new URLSearchParams(search).get("maxEffort") || "");

    setFiltersChanged(false);
  }, [search]);

  useEffect(() => {
    if (firstLoad.current === false) { //we dont want to run this effect on the first render, because the states are affected by side effects, not by the UI
      if (justCancel.current === true) { //we also dont want to setFiltesChanged to true if it's just right after the user presses cancel
        justCancel.current = false; //now, it's not justCancel anymore, so we switch this
      } else {
        setFiltersChanged(true); //otherwise, it must be the filters has been changed by the user
      }
      
    }
  }, [currentStatus, currentMin, currentMax]);

  useEffect(() => {
    firstLoad.current = false;
  }, []);

  const handleOnStatusChange = (e) => {
    const status = e.target.value;
    //const { history } = props; //got from the withRouter wrapper function
    setCurrentStatus(status);
  };

  const handleOnMinChange = (e) => {
    setCurrentMin(e.target.value || "");

  };

  const handleOnMaxChange = (e) => {
    setCurrentMax(e.target.value || "");
  };

  const handleSubmit = () => {
    const params = new URLSearchParams();
    if (currentStatus) params.set("status", currentStatus);
    if (currentMin && currentMin >= 0) params.set("minEffort", currentMin);
    if (currentMax && currentMax >= 0) params.set("maxEffort", currentMax);
    const search = params.toString() ? `?${params.toString()}` : "";

    history.push({ pathname: "/issues", search });
  };

  const handleCancel = () => {
    setCurrentStatus(new URLSearchParams(search).get("status") || "");
    setCurrentMin(new URLSearchParams(search).get("minEffort") || "");
    setCurrentMax(new URLSearchParams(search).get("maxEffort") || "");

    justCancel.current = true; //it is just cancel, set this to true
    setFiltersChanged(false); 

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
        disabled={!filtersChanged}
      >
        Cancel
      </button>
    </div>
  );
};

export default IssueFilter;
