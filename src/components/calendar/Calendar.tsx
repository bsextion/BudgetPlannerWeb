import * as React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios';

export class Calendar extends React.Component {
    // componentDidMount {
    // //   let bills = axios.get(`/bill/`)
    // //     .then(res => {
    // //       const billData = res.data;
    // //       this.setState({ bills: billData, isLoading: false });
    // //     })
    // }
  render() {
    return (
      <FullCalendar headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',

      }}
      events={{
        url: '/bill/',
        method: 'GET',
        failure: function() {
            console.log('Data: ' , )
          alert('there was an error while fetching events!');
        },
        color: 'yellow',   // a non-ajax option
        textColor: 'black' // a non-ajax option
      }}
      plugins={[dayGridPlugin]} 
      initialView="dayGridMonth" 
      />
    );
  }
}
