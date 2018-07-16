import React from 'react';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class SalesReports extends React.Component {
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

      const sales = res.data

      self.setState({
        sales: sales,
      })
    })
  }

  render() {
    return (
      <div>
        <BootstrapTable className="salestable" data={this.state.sales} striped hover>
          <TableHeaderColumn isKey dataField="machine">MR #</TableHeaderColumn>
          <TableHeaderColumn dataField="total_sale">Total Sale</TableHeaderColumn>
          <TableHeaderColumn dataField="num_sold">Items Sold</TableHeaderColumn>
          <TableHeaderColumn dataField="payment_type">Payment Type</TableHeaderColumn>
          <TableHeaderColumn dataField="card_num">Last 4 Digits of Card</TableHeaderColumn>
          <TableHeaderColumn dataField="sale_date">Date</TableHeaderColumn>
          <TableHeaderColumn dataField="sale_time">Time</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }

}

export default SalesReports;
