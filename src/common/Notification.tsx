import * as React from "react";
import {
  NavLink,
  Router,
  Route,
  Switch,
  BrowserRouter,
  Link,
} from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Badge,
  Toast,
  Spinner,
  Table,
} from "react-bootstrap";
import axios from "axios";
import { Bill } from "../constants/bill";

interface IState {
  showToday: boolean;
  showUpcoming: boolean;
  showPaid: boolean;
  loadingToday: boolean;
  loadingUpcoming: boolean;
  loadingPaid: boolean;
  billsToday: Bill[];
  billsUpcoming: Bill[];
  billsPaid: Bill[];
}

interface IProps {
  billsToday: Bill[];
  billsUpcoming: Bill[];
  billsPaid: Bill[];
}

export class Notification extends React.Component {
  componentDidMount() {
    this.getBillsToday();
    this.getBillsUpcoming();
  }

  // @ts-ignore
  state = {
    showToday: false,
    showUpcoming: false,
    showPaid: false,
    loadingToday: true,
    loadingUpcoming: true,
    loadingPaid: true,
    billsToday: [
      { id: "", name: "", dueTime: new Date(), amount: 0, category: "" },
    ],
    billsUpcoming: [
      { id: "", name: "", dueTime: new Date(), amount: 0, category: "" },
    ],
    billsPaid: [
      { id: "", name: "", dueTime: new Date(), amount: 0, category: "" },
    ],
  };

  getBillsToday() {
    axios.get(`/bill/today`).then((res) => {
      const billData = res.data;
      this.setState({
        billsToday: billData,
        showToday: !this.state.showToday,
        loadingToday: false,
      });
    });
  }

  getBillsUpcoming() {
    axios.get(`/bill/upcoming`).then((res) => {
      const billData = res.data;
      this.setState({
        billsUpcoming: billData,
        showUpcoming: !this.state.billsUpcoming,
        loadingUpcoming: false,
      });
    });
  }
  toggleToday = () => {
    this.getBillsToday();
    console.log("data ", this.state.billsToday);
  };

  toggleUpcoming = () => {
    this.setState({ showUpcoming: !this.state.showUpcoming });
  };

  togglePaid = () => {
    this.setState({ showPaid: !this.state.showPaid });
  };

  render() {
    const buttonStyle = { margin: "5px" };

    const TodayToast = this.state.loadingToday ? (
      <div style={{ position: "relative", left: "10px" }}>
        <Toast show={this.state.showToday} onClose={this.toggleToday}>
          <Toast.Header>
            <strong className="mr-auto">Due Today</strong>
            {/* <small>11 mins ago</small> */}
          </Toast.Header>
          <Toast.Body>
            <Spinner size="sm" animation="border" role="status" />
          </Toast.Body>
        </Toast>
      </div>
    ) : (
      <div>
        <Toast show={this.state.showToday} onClose={this.toggleToday}>
          <Toast.Header>
            <strong className="mr-auto">Due Today</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>
            <Table size="sm">
              <tr>
                <th>Name</th>
                <th>Amount</th>
              </tr>
              {this.state.billsToday.map((bill, key) => {
                return (
                  <tr key={key}>
                    <td>{bill.name}</td>
                    <td>${bill.amount}</td>
                  </tr>
                );
              })}
            </Table>
          </Toast.Body>
        </Toast>
      </div>
    );

    const UpcomingToast = this.state.loadingUpcoming ? (
      <div>
        <Toast show={this.state.showUpcoming} onClose={this.toggleUpcoming}>
          <Toast.Header>
            <strong className="mr-auto">Due This Week</strong>
            {/* <small>11 mins ago</small> */}
          </Toast.Header>
          <Toast.Body>
            <Spinner size="sm" animation="border" role="status" />
          </Toast.Body>
        </Toast>
      </div>
    ) : (
      <div>
        <Toast show={this.state.showUpcoming} onClose={this.toggleUpcoming}>
          <Toast.Header>
            <strong className="mr-auto">Due This Week</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>
            <Table size="sm">
              <tr>
                <th>Name</th>
                <th>Amount</th>
              </tr>
              {this.state.billsUpcoming.map((bill, key) => {
                return (
                  <tr key={key}>
                    <td>{bill.name}</td>
                    <td>${bill.amount}</td>
                  </tr>
                );
              })}
            </Table>
          </Toast.Body>
        </Toast>
      </div>
    );

    return (
      <div>
        <Button
          variant="danger"
          size="sm"
          style={buttonStyle}
          onClick={this.toggleToday}
        >
          Due Today{" "}
          <Badge variant="light">{this.state.billsToday.length}</Badge>
        </Button>
        <Button
          variant="warning"
          size="sm"
          style={buttonStyle}
          onClick={this.toggleUpcoming}
        >
          Upcoming{" "}
          <Badge variant="light">{this.state.billsUpcoming.length}</Badge>
        </Button>
        {/* <Button variant="success" size="sm" onClick={this.togglePaid}>
          Paid <Badge variant="light">9</Badge>
        </Button> */}
        {TodayToast}
        {UpcomingToast}
        {/* <Toast show={this.state.showPaid} onClose={this.togglePaid}>
          <Toast.Header>
            <strong className="mr-auto">Bills Paid</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast> */}
      </div>
    );
  }
}
