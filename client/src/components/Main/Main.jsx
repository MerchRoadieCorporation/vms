import React from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import jwtDecode from 'jwt-decode';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        total: '',
    }
    this.click = this.click.bind(this);
  }

  click() {
    const context = this;

    axios({
      method: 'post',
      url: '/test'
    }).then(res => {
      let total = 0;

      for(let i = 1; i < res.data.length; i++) {
        total += parseFloat(res.data[i]['__EMPTY_3']);
      }

      const finalTotal = total.toFixed(2);
      this.setState({ total: finalTotal });
    });

    console.log(axios.defaults.headers)
  }

  logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('token');
        swal({ text: 'You are now logged out.', showConfirmButton: false, timer: 1500});
        this.props.history.replace('/');
    }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

    if (localStorage.getItem('token') !== 'null') {
      axios({url: 'http://localhost:3000/main', method: 'get'}).then(data => {
        console.log('IN AXIOS, data=', data);
      }).catch(err => {
        console.log('axios error=', err);
      })
    } else {
      this.props.history.push('/');
    }
  }


  render() {
    return (
      <div>
        <button onClick={() => { this.logout()} }>TEST</button>
        <div>{this.state.total}</div>
      </div>
    )
  }

}

export default Main;
