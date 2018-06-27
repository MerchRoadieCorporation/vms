import React from 'react';

class LandingPage extends React.Component {
    constructor() {
      super();
    }

    render() {
      return (
        <div>
      
          <div id="page-wrapper">
            {/* <header id="header" className="alt">
              <h1><a href="index.html">Spectral</a></h1>
              <nav id="nav">
                <ul>
                  <li className="special">
                    <a href="#menu" className="menuToggle"><span>Menu</span></a>
                    <div id="menu">
                      <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="generic.html">Generic</a></li>
                        <li><a href="elements.html">Elements</a></li>
                        <li><a href="#">Sign Up</a></li>
                        <li><a href="#">Log In</a></li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </nav>
            </header> */}

            <section id="banner">
              <div className="inner">
                <h2>Merch Roadie</h2>
                <ul className="actions special">
                  <li><a href="#" className="button primary">Log In</a></li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      )
    }
}

export default LandingPage