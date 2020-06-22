/* eslint "react/react-in-jsx-scope": "off" */
/* globals React ReactDOM */
/* eslint "react/jsx-no-undef": "off" */
/* eslint "no-alert": "off" */

import IssueList from './components/ViewIssues'

const element = <IssueList />;

ReactDOM.render(element, document.getElementById("contents"));
