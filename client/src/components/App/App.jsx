import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main';
import LandingPage from '../LandingPage/LandingPage';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/main" component={Main} />
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </div>
    )
  }
}

export default App;