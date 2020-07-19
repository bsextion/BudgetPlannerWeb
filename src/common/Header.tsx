import * as React from "react";
import {
  NavLink,
  Router,
  Route,
  Switch,
  BrowserRouter,
  Link,
} from "react-router-dom";
import { HomePage } from "../components/home/HomePage";
import { BillPage } from "../components/bills/BillPage";
import { UserPage } from "../components/users/UserPage";
import { Notification } from "../common/Notification";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Badge,
  Toast,
} from "react-bootstrap";
import axios from "axios";

export class Header extends React.Component {
  // @ts-ignore
  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Budget Planner</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/bill">Bill List</Nav.Link>
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  View Account
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Modify Account
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Notification />
      </div>
    );
  }
}
