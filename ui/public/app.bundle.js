/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/App.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/App.jsx":
/*!*********************!*\
  !*** ./src/App.jsx ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_ViewIssues__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/ViewIssues */ \"./src/components/ViewIssues/index.js\");\n/* eslint \"react/react-in-jsx-scope\": \"off\" */\n\n/* globals React ReactDOM */\n\n/* eslint \"react/jsx-no-undef\": \"off\" */\n\n/* eslint \"no-alert\": \"off\" */\n\nvar element = /*#__PURE__*/React.createElement(_components_ViewIssues__WEBPACK_IMPORTED_MODULE_0__[\"default\"], null);\nReactDOM.render(element, document.getElementById(\"contents\"));\n\n//# sourceURL=webpack:///./src/App.jsx?");

/***/ }),

/***/ "./src/components/ViewIssues/IssueAdd.jsx":
/*!************************************************!*\
  !*** ./src/components/ViewIssues/IssueAdd.jsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* globals React */\nvar IssueAdd = function IssueAdd(_ref) {\n  var onAddIssue = _ref.onAddIssue;\n\n  var handleSubmit = function handleSubmit(e) {\n    e.preventDefault();\n    var form = document.forms.issueAdd;\n    var issue = {\n      owner: form.owner.value,\n      title: form.title.value,\n      due_at: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10)\n    };\n    onAddIssue(issue);\n    form.owner.value = \"\";\n    form.title.value = \"\";\n  };\n\n  return /*#__PURE__*/React.createElement(\"form\", {\n    name: \"issueAdd\",\n    onSubmit: handleSubmit\n  }, /*#__PURE__*/React.createElement(\"input\", {\n    type: \"text\",\n    name: \"owner\",\n    placeholder: \"Owner\"\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    type: \"text\",\n    name: \"title\",\n    placeholder: \"Title\"\n  }), /*#__PURE__*/React.createElement(\"button\", null, \"Add\"));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (IssueAdd);\n\n//# sourceURL=webpack:///./src/components/ViewIssues/IssueAdd.jsx?");

/***/ }),

/***/ "./src/components/ViewIssues/IssueFilter.jsx":
/*!***************************************************!*\
  !*** ./src/components/ViewIssues/IssueFilter.jsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* globals React */\nvar IssueFilter = function IssueFilter(props) {\n  return /*#__PURE__*/React.createElement(\"div\", null, \"This is a placeholder for the issue filter.\");\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (IssueFilter);\n\n//# sourceURL=webpack:///./src/components/ViewIssues/IssueFilter.jsx?");

/***/ }),

/***/ "./src/components/ViewIssues/IssueRow.jsx":
/*!************************************************!*\
  !*** ./src/components/ViewIssues/IssueRow.jsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar IssueRow = function IssueRow(_ref) {\n  var issue = _ref.issue;\n  return /*#__PURE__*/React.createElement(\"tr\", null, /*#__PURE__*/React.createElement(\"td\", null, issue.id), /*#__PURE__*/React.createElement(\"td\", null, issue.status), /*#__PURE__*/React.createElement(\"td\", null, issue.owner), /*#__PURE__*/React.createElement(\"td\", null, issue.created_at), /*#__PURE__*/React.createElement(\"td\", null, issue.efforts), /*#__PURE__*/React.createElement(\"td\", null, issue.due_at), /*#__PURE__*/React.createElement(\"td\", null, issue.title));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (IssueRow);\n\n//# sourceURL=webpack:///./src/components/ViewIssues/IssueRow.jsx?");

/***/ }),

/***/ "./src/components/ViewIssues/IssueTable.jsx":
/*!**************************************************!*\
  !*** ./src/components/ViewIssues/IssueTable.jsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _IssueRow_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IssueRow.jsx */ \"./src/components/ViewIssues/IssueRow.jsx\");\n/* globals React */\n\n\nvar IssueTable = function IssueTable(_ref) {\n  var issues = _ref.issues;\n  var issueRows = issues.map(function (issue) {\n    return /*#__PURE__*/React.createElement(_IssueRow_jsx__WEBPACK_IMPORTED_MODULE_0__[\"default\"], {\n      key: issue.id,\n      issue: issue\n    });\n  });\n  return /*#__PURE__*/React.createElement(\"table\", {\n    className: \"bordered-table\"\n  }, /*#__PURE__*/React.createElement(\"thead\", null, /*#__PURE__*/React.createElement(\"tr\", null, /*#__PURE__*/React.createElement(\"th\", null, \"ID\"), /*#__PURE__*/React.createElement(\"th\", null, \"Status\"), /*#__PURE__*/React.createElement(\"th\", null, \"Owner\"), /*#__PURE__*/React.createElement(\"th\", null, \"Created\"), /*#__PURE__*/React.createElement(\"th\", null, \"Effort\"), /*#__PURE__*/React.createElement(\"th\", null, \"Due Date\"), /*#__PURE__*/React.createElement(\"th\", null, \"Title\"))), /*#__PURE__*/React.createElement(\"tbody\", null, issueRows));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (IssueTable);\n\n//# sourceURL=webpack:///./src/components/ViewIssues/IssueTable.jsx?");

/***/ }),

/***/ "./src/components/ViewIssues/index.js":
/*!********************************************!*\
  !*** ./src/components/ViewIssues/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../graphQLFetch.js */ \"./src/graphQLFetch.js\");\n/* harmony import */ var _IssueFilter_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IssueFilter.jsx */ \"./src/components/ViewIssues/IssueFilter.jsx\");\n/* harmony import */ var _IssueTable_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IssueTable.jsx */ \"./src/components/ViewIssues/IssueTable.jsx\");\n/* harmony import */ var _IssueAdd_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./IssueAdd.jsx */ \"./src/components/ViewIssues/IssueAdd.jsx\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n/* globals React */\n\n\n\n\n\nvar IssueList = function IssueList(props) {\n  var _React$useState = React.useState([]),\n      _React$useState2 = _slicedToArray(_React$useState, 2),\n      issues = _React$useState2[0],\n      setIssues = _React$useState2[1];\n\n  var _React$useState3 = React.useState(null),\n      _React$useState4 = _slicedToArray(_React$useState3, 2),\n      prevCreatedIssueId = _React$useState4[0],\n      setPrevCreatedIssueId = _React$useState4[1];\n\n  React.useEffect(function () {\n    var getIssues = /*#__PURE__*/function () {\n      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n        var query, data, fetchedIssues;\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                query = \"query {\\n            issues {\\n              id title status owner created_at\\n              efforts due_at\\n            }\\n          }\";\n                _context.next = 3;\n                return Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(query);\n\n              case 3:\n                data = _context.sent;\n                fetchedIssues = data ? data.issues : [];\n                setIssues(fetchedIssues);\n\n              case 6:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee);\n      }));\n\n      return function getIssues() {\n        return _ref.apply(this, arguments);\n      };\n    }();\n\n    getIssues();\n  }, [prevCreatedIssueId]);\n\n  var onAddIssue = /*#__PURE__*/function () {\n    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(issue) {\n      var query, data, id;\n      return regeneratorRuntime.wrap(function _callee2$(_context2) {\n        while (1) {\n          switch (_context2.prev = _context2.next) {\n            case 0:\n              // const query = `mutation {\n              //   addIssue(\n              //     issue: {\n              //       title: \"${issue.title}\",\n              //       owner: \"${issue.owner}\",\n              //       due_at: \"${issue.due_at}\"\n              //     }\n              //   ) {\n              //     id\n              //   }\n              // }`\n              query = \"mutation addIssue($issue: InputIssue!){\\n        addIssue(issue: $issue){\\n          id\\n        }\\n      }\\n      \";\n              _context2.next = 3;\n              return Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(query, {\n                issue: issue\n              });\n\n            case 3:\n              data = _context2.sent;\n              id = data ? data.id : null;\n              setPrevCreatedIssueId(id);\n\n            case 6:\n            case \"end\":\n              return _context2.stop();\n          }\n        }\n      }, _callee2);\n    }));\n\n    return function onAddIssue(_x) {\n      return _ref2.apply(this, arguments);\n    };\n  }();\n\n  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(\"h1\", null, \"Issue Tracker\"), /*#__PURE__*/React.createElement(_IssueFilter_jsx__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null), /*#__PURE__*/React.createElement(\"hr\", null), /*#__PURE__*/React.createElement(_IssueTable_jsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    issues: issues\n  }), /*#__PURE__*/React.createElement(\"hr\", null), /*#__PURE__*/React.createElement(_IssueAdd_jsx__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    onAddIssue: onAddIssue\n  }));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (IssueList);\n\n//# sourceURL=webpack:///./src/components/ViewIssues/index.js?");

/***/ }),

/***/ "./src/graphQLFetch.js":
/*!*****************************!*\
  !*** ./src/graphQLFetch.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar graphQLFetch = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(query) {\n    var variables,\n        res,\n        result,\n        error,\n        details,\n        _args = arguments;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            variables = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};\n            _context.prev = 1;\n            _context.next = 4;\n            return fetch(window.ENV.API_ENDPOINT, {\n              //we ini this global variable in index.html\n              method: \"POST\",\n              headers: {\n                \"Content-Type\": \"application/json\"\n              },\n              body: JSON.stringify({\n                query: query,\n                variables: variables\n              })\n            });\n\n          case 4:\n            res = _context.sent;\n            _context.next = 7;\n            return res.json();\n\n          case 7:\n            result = _context.sent;\n            console.log(result);\n\n            if (result.errors) {\n              error = result.errors[0];\n\n              if (error.extensions.code == \"BAD_USER_INPUT\") {\n                details = error.extensions.exception.errors.join(\"\\n \");\n                alert(\"\".concat(error.message, \":\\n \").concat(details));\n              } else {\n                alert(\"\".concat(error.extensions.code, \": \").concat(error.message));\n              }\n            }\n\n            return _context.abrupt(\"return\", result.data);\n\n          case 13:\n            _context.prev = 13;\n            _context.t0 = _context[\"catch\"](1);\n            alert(\"Error in sending data to server: \".concat(_context.t0.message));\n\n          case 16:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[1, 13]]);\n  }));\n\n  return function graphQLFetch(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (graphQLFetch);\n\n//# sourceURL=webpack:///./src/graphQLFetch.js?");

/***/ })

/******/ });