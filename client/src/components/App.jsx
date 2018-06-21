import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      total: '',
    }
    this.click = this.click.bind(this);
  }

  click() {
    const context = this;

    Axios({
      method: 'post',
      url: '/test'
    }).then(res => {
      let total = 0;
      
      for(let i = 1; i < res.data.length; i++) {
        total += parseFloat(res.data[i]['__EMPTY_3']);
      }

      const finalTotal = total.toFixed(2);
      this.setState({ total: finalTotal });
    });
  }

  render () {
    return (
      <div>
        <button onClick={() => { this.click()} }>TEST</button>
        <div>{this.state.total}</div>
      </div>
    )
  }
}


export default App;