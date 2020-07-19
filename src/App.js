import React from "react";
import logo from "./logo.svg";
import { Router, Route, Switch } from "react-router";
import "./App.css";
import { HomePage } from "./components/home/HomePage";
import { BillPage } from "./components/bills/BillPage";
import { UserPage } from "./components/users/UserPage";
import { Header } from "./common/Header";
import PageNotFound from "./components/PageNotFound";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/bill" component={BillPage} />
          <Route path="/user" component={UserPage} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
