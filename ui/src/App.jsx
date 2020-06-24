import React from "react";
import ReactDOM from "react-dom";
import "babel-polyfill";
import IssueList from "./components/ViewIssues";

const element = <IssueList />;

ReactDOM.render(element, document.getElementById("contents"));

//Recently, although the module was rebuilt and received in the browser, it couldn’tbe accepted. 
//In order to accept the changes to a module, its parent needs to accept it. Now, any changes in the code will be receive and the browser AUTO re-renders
if (module.hot) {
  module.hot.accept();
}
