import * as React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import * as billService from "../../services/BillService";
import { BillPage } from "../bills/BillPage";
export class Calendar extends React.Component {
  state = {
    isLoading: true,
    bills: [],
  };
  async componentDidMount() {
    axios.get(`/bill/`).then((res) => {
      const billData = res.data;
      this.setState({ bills: billData, isLoading: false });
    });
  }

  render() {
    return (
      <div style={{ maxWidth: "900px", margin: "40px auto" }}>
        <div
          style={{ maxWidth: "900px", margin: "40px auto" }}
          className="billPreview"
        >
        </div>
        <FullCalendar
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth",
          }}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={this.getEvents()}
        />
      </div>
    );
  }

  private getEvents() {
    console.log(this.state.bills);
    return this.state.bills.map((bill) => {
      const { id, name, dueTime, amount, category } = bill;

      let startTime = new Date(dueTime);
      let endTime = new Date(dueTime);
      return {
        title: "$" + amount + "  " + name,
        start: startTime,
        end: endTime,
        description: amount,
        // @ts-ignore
        extendedProps: { description: "Lecture" },
      };
    });
  }
}
