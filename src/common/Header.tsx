import * as React from 'react'
import { NavLink, Router, Route, Switch, BrowserRouter, Link} from 'react-router-dom'
import { HomePage } from '../components/home/HomePage';
import { BillPage } from '../components/bills/BillPage';
import { UserPage } from '../components/users/UserPage';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
const Header = () => {

    const activeStyle = { color: "#F15B2A" };
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
        <NavDropdown.Item href="#action/3.1">View Account</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Modify Account</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    </div>
    );
  };
  
  export default Header;