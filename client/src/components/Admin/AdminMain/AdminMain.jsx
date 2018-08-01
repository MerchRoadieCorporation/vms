import React from 'react';
import swal from 'sweetalert2';

class AdminMain extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
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

  render() {
    return (
      <div>
      ADMIN YEE
        <button id="logout" onClick={this.logout}>Logout</button>
      </div>
    )
  }
}

export default AdminMain;
