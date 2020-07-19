import * as React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import * as billService from "../../services/BillService";
import { BillPage } from "../bills/BillPage";
import "./style.css";
import { Spinner } from "react-bootstrap";
import { Bill } from "../../constants/bill";

interface IState {
  isLoading: boolean;
  bills: Bill[];
}

export class Calendar extends React.Component {
  state = {
    isLoading: true,
    bills: [{ id: "", name: "", dueTime: new Date(), amount: 0, category: "" }],
  };
  componentDidMount() {
    this.getBillData();
  }
  getBillData() {
    axios.get(`/bill/`).then((res) => {
      const billData = res.data;
      this.setState({ bills: billData, isLoading: false });
    });
  }

  render() {
    let { bills, isLoading } = this.state;
    if (this.state.isLoading) {
      return (
        <Spinner className="spinner-large" animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    return (
      <div style={{ display: "inline" }}>
        <div style={{ width: "100%", padding: "50px" }}>
          <FullCalendar
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth",
            }}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={this.getEvents()}
            eventClick={this.addEvent}
            displayEventTime={false}
          />
        </div>
      </div>
    );
  }

  private getEvents() {
    return this.state.bills.map((bill) => {
      const { id, name, dueTime, amount, category } = bill;
      let startTime = new Date(dueTime);
      let endTime = new Date(dueTime);
      return {
        title: "$" + amount + "  " + name,
        start: startTime,
        end: endTime,
        description: amount,
      };
    });
  }
  // @ts-ignore
  private addEvent = (event: any) => {};
}
