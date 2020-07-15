import * as React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import * as billService from "../../services/BillService";
import { BillPage } from "../bills/BillPage";
import "./style.css";
import MaterialTable from "material-table";
import { Spinner } from "react-bootstrap";

const columns = [
  { title: "Name", field: "name" },
  { title: "Amount", field: "amount"  },
  { title: "Due Date", field: "dueTime" },
  { title: "Category", field: "category" },
];
export class Calendar extends React.Component {
  state = {
    isLoading: true,
    bills: [],
  };
   componentDidMount() {
    this.getBillData()
  }
  getBillData() {
    axios.get(`/bill/`).then((res) => {
      const billData = res.data;
      this.setState({ bills: billData, isLoading: false });
    })
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
          <div style={{display: "inline"}}>
           <div style={{width:"100%", padding: "50px"}}>
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
      };
    });
  }

  private addEvent() {
    
  }
}
