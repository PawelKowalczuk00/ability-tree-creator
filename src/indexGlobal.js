import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import Counters from "./components/Counters";
import SearchForm from "./components/SearchForm";
import Repos from "./components/Repos";

function App() {
  return (
    <div className="App">
      <h1>Search GitHub Repos</h1>
      <SearchForm />
      <Counters />
      <Repos />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
