import React from 'react';
import swal from 'sweetalert2';

class Menu extends React.Component {
  constructor() {
    super();
  }

  async logout() {
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
                          <li><a href="generic.html">Generic</a></li>
                          <li onClick={this.logout.bind(this)}><a href="#">Logout</a></li>
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

export default Menu;
