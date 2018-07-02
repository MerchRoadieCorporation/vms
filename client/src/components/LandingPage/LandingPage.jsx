import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import swal from 'sweetalert2';
import jwtDecode from 'jwt-decode';

class LandingPage extends React.Component {
    constructor() {
      super();
    }

    async handleLoginSubmit(e) {
      e.preventDefault();
      const email = $('#InputEmail').val();
      const password = $('#InputPassword').val();
      const self = this;

      axios({
        url: 'http://localhost:3000/login',
        method: 'post',
        data: {
          email,
          password,
        },
      }).then((res) => {
        if (res.status === 204) {
          swal({
            title: 'Error', text: 'Double check email and password', type: 'error', showConfirmButton: false, timer: 1000,
          }).then(() => {
            $('#InputEmail').val('');
            $('#InputPassword').val('');
          });
        } else {
          localStorage.setItem('token', res.data.accessToken);
          axios.defaults.headers.common['Authorization'] = res.data.accessToken;
          console.log(axios.defaults.headers);
          swal({
            title: 'Signing In', type: 'success', showConfirmButton: false, timer: 1000,
          }).then(() => {
            this.props.history.push('/main');
          });
        }
      }).catch((err) => {
        swal({
          title: 'Error', text: err, type: 'error', showConfirmButton: false, timer: 1000,
        }).then(() => {
          $('#InputEmail').val('');
          $('#InputPassword').val('');
        });
      });
   }

    render() {
      return (
        <div>
          <div id="page-wrapper">
            <section id="banner">
              <div className="inner">
                <h2 id="title">Merch Roadie</h2>
                <ul className="actions special">
                  <form id="title">
                    <label>
                      Email:
                      <input id="InputEmail" style={{width: 250}} className="login" type="text" name="email" />
                      Password:
                      <br /><input id="InputPassword" style={{width: 250}} className="login" type="text" name="password" />
                    </label >
                      <br />
                      <input type="submit" value="login" onClick={this.handleLoginSubmit.bind(this)} />
                    </form>
                </ul>
              </div>
            </section>
          </div>
        </div>
      )
    }
}

export default LandingPage
