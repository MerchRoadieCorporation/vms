import React from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
        total: '',
    }
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

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('token');
    swal({ text: 'You are now logged out.', showConfirmButton: false, timer: 1500});
    this.props.history.replace('/');
    console.log('clicced')
  }


  render() {
    return (
      <div>
      <div id="page-wrapper">
        <section id="banner">
          <div className="inner">
            <header id="header">
              <h1 id="title">Merch Roadie</h1>
              <nav id="nav">
                <ul>
                  <li className="special">
                    <a href="#menu" className="menuToggle"><span>Menu</span></a>
                    <div id="menu">
                      <ul>
                        <li>Sales</li>
                        <li onClick={this.logout.bind(this)}>Logout</li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </nav>
            </header>
          </div>
        </section>
      </div>
      </div>
    )
  }

}

export default Main;
