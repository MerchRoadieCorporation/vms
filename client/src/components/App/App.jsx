import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import Main from '../Main/Main';
import AdminMain from '../Admin/AdminMain/AdminMain';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ LandingPage } />
        </Switch>
        <Route path="/main" component={ Main } />
        <Route path="/admin" component={ AdminMain } />
      </div>
    )
  }
}

export default App;
