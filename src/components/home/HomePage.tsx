import * as React from "react";
import { Header } from "../../common/Header";
import { Calendar } from "../calendar/Calendar";

export class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Calendar></Calendar>
      </div>
    );
  }
}
