import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import NavBar from "./Common/NavBar.jsx";
import IssueList from "./ViewIssues";
import ReportIssue from "./ReportIssue";
import NotFound from "./Common/NotFound.jsx";

const routes = [
  {
    component: IssueList,
    path: "/issues",
  },

  {
    component: ReportIssue,
    path: "/report",
  },
];

const MainView = (props) => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Redirect exact from="/" to="/issues" />
        {routes.map((route) => (
          <Route key={route.path} path={route.path}>
            <route.component />
          </Route>
        ))}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default MainView;
