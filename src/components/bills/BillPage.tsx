import {
  Container,
  Row,
  Col,
  Spinner,
  FormControl,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import { Bill } from "./bill";
import axios from "axios";
import MaterialTable from "material-table";
import {
  AddBox,
  ArrowDownward,
  Check,
  Clear,
  DeleteOutline,
  ChevronRight,
  Edit,
  SaveAlt,
  FilterList,
  FirstPage,
  LastPage,
  ChevronLeft,
  Search,
  Remove,
  ViewColumn,
} from "@material-ui/icons";
import "../../common/spinner.css";
import * as React from "react";

// @ts-ignore
const columns = [
  { title: "Name", field: "name" },
  { title: "Amount", field: "amount" },
  { title: "Due Date", field: "dueTime" },
  { title: "Category", field: "category" },
];

const tableIcons = {
  // @ts-ignore
  Add: React.forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
};

export class BillPage extends React.Component {
  // @ts-ignore
  state = {
    isLoading: true,
    bills: [],
  };
  componentDidMount() {
    axios.get(`/bill/`).then((res) => {
      const billData = res.data;
      this.setState({ bills: billData, isLoading: false });
    });
  }
  // constructor(props: Readonly<{}>) {
  //   super(props);
  //   this.addRow = this.addRow.bind(this);
  // }

  //   addRow() {
  //     let rows = this.state.rows
  //     rows.push('new row')
  //     this.setState({rows: rows})
  // }

  render() {
    let { bills, isLoading } = this.state;
    if (isLoading) {
      return (
        <Spinner className="spinner-large" animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }

    return (
      <div style={{ maxWidth: "1550px", margin: "20px auto" }}>
        <MaterialTable
          title="Bills"
          columns={columns}
          data={this.state.bills}
          actions={[
            {
              icon: "add",
              tooltip: "Add User",
              isFreeAction: true,
              onClick: (event, bills) => {
                let rows = this.state.bills;

                this.setState({ bills: bills });
              },
            },
            {
              icon: "library_add",
              tooltip: "Duplicate User",
              onClick: (event) => alert("You want to add a new row"),
            },
            {
              icon: "delete",
              tooltip: "Delete User",
              onClick: (event) => alert("You want to add a new row"),
            },
          ]}
        ></MaterialTable>
      </div>
    );
  }
}
