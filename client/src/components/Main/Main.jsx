import React from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import swal from 'sweetalert2';
import SalesReports from '../SalesReports/SalesReports';
import SalesMRFilter from '../SalesMRFilter/SalesMRFilter';
import SalesTimeFilter from '../SalesTimeFilter/SalesTimeFilter';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        device: '',
        machines: [],
        dates: [],
        events: [],
        showMainButtons: true,
        showSalesReports: false,
        showSalesMRFilter: false,
        showSalesTimeFilter: false,
    }
    this.logout = this.logout.bind(this);
    this.showSalesReports = this.showSalesReports.bind(this);
    this.returnToMain = this.returnToMain.bind(this);
    this.getMachines = this.getMachines.bind(this);
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
    })
  }

  showSalesReports() {
    if(this.state.showSalesReports === false) {
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

  getMachines(machines) {
    this.setState({
      machines: machines,
    })
  }

  render() {
    return (
      <div>
        {this.state.showMainButtons  ? <div className="mainbutton">
        <button className="main" onClick= {this.showSalesReports}>Sales Reports</button>
        <br /><br />
        <button className="main">Manage Events</button>
        </div> : null}
        {!this.state.showMainButtons ? <button id="return" onClick={this.returnToMain}>Return to Main Page</button> : null}
        <button id="logout" onClick={this.logout}>Logout</button>
        {this.state.showSalesMRFilter ? <SalesMRFilter sendMachines={this.getMachines} showSalesTimeFilter={this.showSalesTimeFilter.bind(this)} /> : null}
        {this.state.showSalesTimeFilter ? <SalesTimeFilter /> : null}
        {this.state.showSalesReports ? <SalesReports /> : null}
      </div>
    )
  }

}

export default Main;
