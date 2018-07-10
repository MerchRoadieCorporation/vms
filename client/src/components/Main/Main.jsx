import React from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import swal from 'sweetalert2';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        device: '',
        total: '',
        numsold: '',
    }
    this.logout = this.logout.bind(this);
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

    const self = this;

    this.getSales = setInterval(function(){
      axios({
        method: 'post',
        url: '/sales',
        data: {
          email: localStorage.email
        }
      }).then(res => {
        console.log(res.data);

        let device;
        let total = 0;
        let numsold = 0;

        for(let i = 0; i < res.data.length; i++) {
          device = res.data[i].device;
          total += parseFloat(res.data[i].total);
          numsold += res.data[i].numsold;
        }

        self.setState({
          device: device,
          total: total,
          numsold: numsold,
        })
      }) }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.getSales);
  }

// Clear user token and profile data from localStorage
  logout(e) {
    localStorage.removeItem('token');
    swal({ text: 'You are now logged out.', showConfirmButton: false, timer: 1500});
    this.props.history.replace('/');
  }

  render() {
    return (
      <div>
        <button>Sales</button>
        <button onClick={ this.logout }>Logout</button>
        <h1>DEVICE = {this.state.device}</h1>
        <h1>TOTAL = {this.state.total}</h1>
        <h1>NUMSOLD = {this.state.numsold}</h1>
      </div>
    )
  }

}

export default Main;
