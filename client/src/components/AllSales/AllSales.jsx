import React from 'react';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class AllSales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
    }
  }

  componentDidMount() {
    const self = this;

    axios({
      method: 'post',
      url: '/sales',
      data: {
        email: localStorage.email
      }
    }).then(res => {
      console.log(res.data);

      const sales = []

      self.setState({
        sales: sales,
      })
    })
  }

  render() {
    return (
      <div>
        <BootstrapTable className="salestable" data={this.state.sales} striped hover>
          <TableHeaderColumn isKey dataField="machine">Machine</TableHeaderColumn>
          <TableHeaderColumn dataField="total">Total Sale</TableHeaderColumn>
          <TableHeaderColumn dataField="itemsSold" width="150">Items Sold</TableHeaderColumn>
          <TableHeaderColumn dataField="date" width="200">Date</TableHeaderColumn>
          <TableHeaderColumn dataField="time" width="200">Time</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }

}

export default AllSales;
