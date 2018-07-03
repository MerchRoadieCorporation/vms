import React from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import swal from 'sweetalert2';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        device: '',
        total: ''
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

    axios({
      method: 'post',
      url: '/sales',
      data: localStorage.email
    }).then(res => {
      console.log(res.data);
      this.setState({
        device: res.data.device,
        total: res.data.numsold,
      })
    })
  }

// Clear user token and profile data from localStorage
  logout(e) {
    localStorage.removeItem('token');
    swal({ text: 'You are now logged out.', showConfirmButton: false, timer: 1500});
    this.props.history.replace('/');
    console.log('clicced')
  }

  render() {
    return (
      <div>
        <button>Sales</button>
        <button onClick={ this.logout }>Logout</button>
        {this.state.device} {this.state.total}
      </div>
    )
  }

}

export default Main;
