import * as React from "react";
import { Container, Row, Col, Spinner, FormControl, Form, InputGroup } from "react-bootstrap";
import {Bill} from './bill'
import BootstrapTable from "react-bootstrap-table-next";
// @ts-ignore
import cellEditFactory from "react-bootstrap-table2-editor";
import axios from 'axios';
import BillService from '../../services/BillService'

// @ts-ignore
const columns = [{
  dataField: 'id',
  text: 'Bill ID'
}, 
{
  dataField: 'name',
  text:  'Bill Name'

}, 
{
  dataField: 'dueTime',
  text: 'Bill Price'
},
{
  dataField:'amount',
  text: 'Amount',
},
{
  dataField: 'category',
  text: 'Category'
}
]
;

export class BillPage extends React.Component {

  state = {
    isLoading: true,
    bills: []
  }

   componentDidMount() {
     
    axios.get(`/bill/`)
    .then(res => {
      const billData = res.data;
      this.setState({ bills: billData, isLoading: false });
    })

  }

  render() {
    const BillTable  = (
      <BootstrapTable
      keyField="id"
      data={ this.state.bills }
      columns={ columns }
      cellEdit={ cellEditFactory({ mode: 'click' }) }>

      </BootstrapTable>
  //     <div>
  //       <Container>
  //           <Row>
  //         <Col>Bill ID</Col>
  //         <Col>Bill Name</Col>
  //         <Col>Due Date</Col>
  //         <Col>Amount</Col>
  //         <Col>Category</Col>
  //           </Row>
  //           {this.state.bills.map(bill => 
       
  //         <Row><Col>
  //         <InputGroup className="mb-3">
  //   <InputGroup.Prepend>
  //     <InputGroup.Text id="basic-addon3">
  //      BI
  //     </InputGroup.Text>
  //   </InputGroup.Prepend>
  //   <FormControl id="basic-url" aria-describedby="basic-addon3" value={bill['id']} readOnly={false} />
  // </InputGroup></Col>
  // <Col>
  //         <InputGroup className="mb-3">
  //   <FormControl id="basic-url" aria-describedby="basic-addon3" />
  // </InputGroup></Col>
  // <Col>
  //         <InputGroup className="mb-3">
  //   <InputGroup.Prepend>
  //     <InputGroup.Text id="basic-addon3">
  //      BI
  //     </InputGroup.Text>
  //   </InputGroup.Prepend>
  //   <FormControl id="basic-url" aria-describedby="basic-addon3" />
  // </InputGroup></Col>
  // <Col>
  //         <InputGroup className="mb-3">
  //   <InputGroup.Prepend>
  //     <InputGroup.Text id="basic-addon3">
  //      BI
  //     </InputGroup.Text>
  //   </InputGroup.Prepend>
  //   <FormControl id="basic-url" aria-describedby="basic-addon3" />
  // </InputGroup></Col>
  // <Col>
  //         <InputGroup className="mb-3">
  //   <InputGroup.Prepend>
  //     <InputGroup.Text id="basic-addon3">
  //      BI
  //     </InputGroup.Text>
  //   </InputGroup.Prepend>
  //   <FormControl id="basic-url" aria-describedby="basic-addon3" />
  // </InputGroup></Col>
  //         </Row>
  //           )}
  //       </Container>
  //     </div>
    )

    let { bills, isLoading } = this.state;
    if (isLoading) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    return <div>{BillTable}</div>;
  }
}