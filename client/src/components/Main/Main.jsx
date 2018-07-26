import React from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import swal from 'sweetalert2';
import SalesReports from '../SalesReports/SalesReports';
import SalesMRFilter from '../SalesMRFilter/SalesMRFilter';
import SalesTimeFilter from '../SalesTimeFilter/SalesTimeFilter';
import Calendar from '../SalesTimeFilter/Calendar';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        device: '',
        machines: undefined,
        dates: undefined,
        events: undefined,
        showMainButtons: true,
        showSalesReports: false,
        showSalesMRFilter: false,
        showSalesTimeFilter: false,
        showCalendar: false,
    }
    this.logout = this.logout.bind(this);
    this.showSalesMRFilter = this.showSalesMRFilter.bind(this);
    this.showSalesTimeFilter = this.showSalesTimeFilter.bind(this);
    this.showFilteredSales = this.showFilteredSales.bind(this);
    this.showCalendar = this.showCalendar.bind(this);
    this.returnToMain = this.returnToMain.bind(this);
    this.getMachines = this.getMachines.bind(this);
    this.getDates = this.getDates.bind(this);
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

    if (localStorage.getItem('token') !== 'null') {
      axios({url: '/main', method: 'get'}).then(data => {
      }).catch(err => {
        throw err;
      })
    } else {
      this.props.history.push('/');
    }
  }

  logout() {
    localStorage.removeItem('token');
    swal({
      text: 'You are now logged out.',
      showConfirmButton: false,
      timer: 1500
    });
    this.props.history.replace('/');
  }

  returnToMain() {
    this.setState({
      showMainButtons: true,
      showSalesReports: false,
      showSalesMRFilter: false,
      showSalesTimeFilter: false,
      showCalendar: false,
    })
  }

  showSalesMRFilter() {
    if(this.state.showSalesMRFilter === false) {
      this.setState({
        showMainButtons: false,
        showSalesMRFilter: true,
      })
    }
  }

  showSalesTimeFilter() {
    if(this.state.showSalesTimeFilter === false) {
      this.setState({
        showSalesTimeFilter: true,
        showSalesMRFilter: false,
      })
    }
  }

  showCalendar() {
    this.setState({
      showSalesTimeFilter: false,
      showCalendar: true,
    })
  }

  showFilteredSales() {
    this.setState({
      showCalendar: false,
      showSalesReports: true,
    })
  }

  getMachines(machines) {
    this.setState({
      machines: machines,
    })
  }

  getDates(dates) {
    this.setState({
      dates: dates,
    })
  }

  render() {
    return (
      <div>
        {this.state.showMainButtons  ? <div className="mainbutton">
        <button className="main" onClick= {this.showSalesMRFilter}>Sales Reports</button>
        <br /><br />
        <button className="main">Manage Events</button>
        </div> : null}
        {!this.state.showMainButtons ? <button id="return" onClick={this.returnToMain}>Return to Main Page</button> : null}
        <button id="logout" onClick={this.logout}>Logout</button>
        {this.state.showSalesMRFilter ? <SalesMRFilter sendMachines={this.getMachines} showSalesTimeFilter={this.showSalesTimeFilter.bind(this)} /> : null}
        {this.state.showSalesTimeFilter ? <SalesTimeFilter showCalendar={this.showCalendar.bind(this)} /> : null}
        {this.state.showSalesReports ? <SalesReports machines={this.state.machines} dates={this.state.dates} /> : null}
        {this.state.showCalendar ? <Calendar sendDates={this.getDates} showFilteredSales={this.showFilteredSales.bind(this)} /> : null}
      </div>
    )
  }

}

export default Main;
