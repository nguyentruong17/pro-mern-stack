import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router} from 'react-router-dom'
import "babel-polyfill";
import MainView from "./components/MainView.jsx";

const element = (
  <Router>
    <MainView/>
  </Router>
)

ReactDOM.render(element, document.getElementById("contents"));

//Recently, although the module was rebuilt and received in the browser, it couldn’tbe accepted. 
//In order to accept the changes to a module, its parent needs to accept it. Now, any changes in the code will be receive and the browser AUTO re-renders
if (module.hot) {
  module.hot.accept();
}
