import React from 'react';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class SalesReports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: undefined,
      gross: undefined,
    }
  }

  componentDidMount() {
    const self = this;

    if(this.props.machines && this.props.dates) {
      axios({
        method: 'post',
        url: '/filteredsales',
        data: {
          email: localStorage.email,
          machines: this.props.machines,
          dates: this.props.dates,
        }
      }).then(res => {
        console.log(res.data.rows)
        const sales = [];
        let gross = 0;

        for(let i = 0; i < res.data.rows.length; i++) {
          sales.push(res.data.rows[i]);
          gross += parseFloat(res.data.rows[i].total_sale)
        }

        self.setState({
          sales: sales,
          gross: gross,
        })
      })
    }

    // axios({
    //   method: 'post',
    //   url: '/sales',
    //   data: {
    //     email: localStorage.email
    //   }
    // }).then(res => {
    //   console.log(res.data);
    //
    //   const sales = res.data
    //
    //   self.setState({
    //     sales: sales,
    //   })
    // })
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
        <br />
        <h1 className="gross"> Gross Sales: {this.state.gross} </h1>
      </div>
    )
  }

}

export default SalesReports;
