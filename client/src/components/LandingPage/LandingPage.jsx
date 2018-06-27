import React from 'react';

class LandingPage extends React.Component {
    constructor() {
      super();
    }

    render() {
      return (
        <div>
          <div id="page-wrapper">
            <section id="banner">
              <div className="inner">
                <img className="logo" src={require('../../../dist/images/whitelogo.png')}></img>
                <br/ ><br/ >
                <h2 id="title">Merch Roadie</h2>
                <ul className="actions special">
                  <form id="title">
                    <label>
                      Email:
                      <input style={{width: 250}} className="login" type="text" name="email" />
                      Password:
                      <br /><input className="login" type="text" name="password" />
                    </label >
                      <br />
                      <input type="submit" value="login" />
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