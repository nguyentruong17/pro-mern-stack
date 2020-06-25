import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import NavBar from "./Common/NavBar.jsx";
import ViewIssues from "./ViewIssues";
import EditIssue from './EditIssue';
import ReportIssue from "./ReportIssue";
import NotFound from "./Common/NotFound.jsx";

const routes = [
  {
    component: ViewIssues,
    path: "/issues",
  },
  {
    component: EditIssue,
    path: "/edit/:id", 
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
            <route.component/>
          </Route>
        ))}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default MainView;
