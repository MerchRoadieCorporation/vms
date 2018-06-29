import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main';
import LandingPage from '../LandingPage/LandingPage';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
        </Switch>
        <Route path="/main" component={Main} />
      </div>
    )
  }
}

export default App;
