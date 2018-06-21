import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

class App extends React.Component {
  constructor() {
    super();

    this.click = this.click.bind(this);
  }

  click() {
    const context = this;
    Axios({
      method: 'post',
      url: '/test'
    }).then(res => {
      console.log(res);
    })
  }

  render () {
    return (
      <div>
        TEST
      </div>
    )
  }
}


export default App;