import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import ReactDOM from "react-dom/client";
import './index.css';
import Layout from "./Layout";
import Home from "./pages/home";
import Agenda from "./pages/agenda";
import SenateDecisions from "./pages/senateDecisions";
import UpdateHandbook from "./pages/updateHandbook";

import 'bootstrap/dist/css/bootstrap.css';

import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Router>
      <App />
    </Router>
);
