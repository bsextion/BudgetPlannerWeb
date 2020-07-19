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
import { Bill } from "../../constants/bill";
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
import { IType } from "../../constants/column-types";

const currency: IType = "currency";
const date: IType = "date";
const boolean: IType = "boolean";
// @ts-ignore
const columns = [
  { title: "Name", field: "name" },
  { title: "Amount", field: "amount", type: currency },
  { title: "Due Date", field: "dueTime", type: date },
  // @ts-ignore
  { title: "Category", field: "category" },
  { title: "Paid", field: "isPaid", type: boolean },
];

const tableIcons = {
  // @ts-ignore
  Add: React.forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
};

interface IState {
  isLoading: boolean;
  bills: Bill[];
}

export class BillPage extends React.Component<IState> {
  // @ts-ignore

  state = {
    isLoading: true,
    bills: [
      {
        id: "",
        name: "",
        dueTime: new Date(),
        amount: 0,
        category: "",
        isPaid: false,
      },
    ],
  };

  componentDidMount() {
    this.getBillData();
  }

  // componentDidUpdate(prevProps: any){
  // }

  getBillData() {
    axios.get(`/bill/`).then((res) => {
      const billData = res.data;
      this.setState({ bills: billData, isLoading: false });
    });
  }

  addNewBill(billAdded: Bill) {
    axios.post("/bill/add", billAdded).then((res) => {
      const billData = res.data;
      console.log(res);
      console.log(res.data);
    });
    console.log(billAdded);
  }

  updateBill(billUpdated: Bill) {
    axios.put("/bill/update", billUpdated).then((res) => {
      const billData = res.data;
    });
  }

  deleteBill(bill: Bill) {
    axios.delete(`/bill/remove/${bill.id}`).then((res) => {
      const billData = res.data;
      console.log(res);
      console.log(res.data);
    });
    console.log(bill);
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
      <div style={{ maxWidth: "1550px", margin: "20px auto" }}>
        <MaterialTable
          title="Bills"
          columns={columns}
          data={this.state.bills}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const data = this.state.bills;
                    data.push(newData);
                    this.addNewBill(newData);
                    this.setState({ data }, () => resolve());
                  }
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const data = this.state.bills;
                    const index = data.indexOf(newData);
                    data[index] = newData;
                    this.updateBill(newData);
                    this.setState({ data }, () => resolve());
                  }
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    let data = this.state.bills;
                    const index = data.indexOf(oldData);
                    data.splice(index, 1);
                    this.deleteBill(oldData);
                    this.setState({ data }, () => resolve());
                  }
                  resolve();
                }, 1000);
              }),
          }}
        ></MaterialTable>
      </div>
    );
  }
}
