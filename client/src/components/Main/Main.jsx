import React from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import swal from 'sweetalert2';
import CountUp from 'react-countup';
import LiveSales from '../LiveSales/LiveSales';
import SalesReports from '../SalesReports/SalesReports';
import SalesMRFilter from '../SalesMRFilter/SalesMRFilter';
import SalesTimeFilter from '../SalesTimeFilter/SalesTimeFilter';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        device: '',
        prevTotal: 0,
        total: 0,
        prevNumsold: 0,
        numsold: 0,
        showLiveSales: false,
        showSalesReports: false,
        showSalesMRFilter: false,
        showSalesTimeFilter: false,
    }
    this.logout = this.logout.bind(this);
    this.showLiveSales = this.showLiveSales.bind(this);
    this.showSalesReports = this.showSalesReports.bind(this);
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

    if (localStorage.getItem('token') !== 'null') {
      axios({url: 'http://localhost:3000/main', method: 'get'}).then(data => {
      }).catch(err => {
        throw err;
      })
    } else {
      this.props.history.push('/');
    }
  }

// Clear user token and profile data from localStorage
  logout() {
    localStorage.removeItem('token');
    swal({ text: 'You are now logged out.', showConfirmButton: false, timer: 1500});
    this.props.history.replace('/');
  }

//Conditional rendering for sale button on onClick
  showLiveSales() {
    if(this.state.showLiveSales === false) {
      this.setState({
        showSalesReports: false,
        showLiveSales: true,
      })
    }
    console.log('cliced LIVE SALES')
  }

//Conditional rendering for sale button on onClick
  showSalesReports() {
    if(this.state.showSalesReports === false) {
      this.setState({
        showLiveSales: false,
        showSalesMRFilter: true,
      })
    }
    console.log('cliced ALL SALES')
  }

  render() {
    return (
      <div>
        <button onClick= {this.showLiveSales}>Live Sales</button>
        <button onClick= {this.showSalesReports}>Sales Reports</button>
        <button id="logout" onClick={this.logout}>Logout</button>
          {this.state.showLiveSales ? <LiveSales /> : null}
          {this.state.showSalesMRFilter ? <SalesMRFilter /> : null}
          {this.state.showSalesTimeFilter ? <SalesTimeFilter /> : null}
          {this.state.showSalesReports ? <SalesReports /> : null}
      </div>
    )
  }

}

export default Main;
