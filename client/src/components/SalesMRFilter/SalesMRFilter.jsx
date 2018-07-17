import React from 'react';
import axios from 'axios';

class SalesMRFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      machines: [],
    }
  }

  componentDidMount() {
    const self = this;

    axios({
      method: 'post',
      url: '/mrsales',
      data: {
        email: localStorage.email
      }
    }).then(res => {
      const machines = [];

      for(let i = 0; i < res.data.rows.length; i++) {
        if(machines.indexOf(res.data.rows[i].machine) === -1) {
          machines.push(res.data.rows[i].machine);
        }
      }

      self.setState({
        machines: machines,
      })
    })
  }

  render() {
    return (
      <div>
        <div className="salesfilter">
          <h1>Which Merch Roadies would you like to see sales for?</h1>
            <ul>
              {this.state.machines.map((machine, i) => {
                return <li key={i}>{machine}</li>
                })
              }
            </ul>
        </div>
      </div>
    )
  }
}

export default SalesMRFilter;
