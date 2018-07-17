import React from 'react';
import axios from 'axios';

class SalesMRFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      machines: [],
    }
    this.handleChange = this.handleChange.bind(this);
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
      const mrs = [];
      const machines = [];

      for(let i = 0; i < res.data.rows.length; i++) {
        if(mrs.indexOf(res.data.rows[i].machine) === -1) {
          mrs.push(res.data.rows[i].machine)
        }
      }

      for(let i = 0; i < mrs.length; i++) {
        machines.push({
          name: mrs[i],
          checked: false,
        });
      }

      self.setState({
        machines: machines,
      })
    })
  }

  handleChange(value) {
    const self = this;
    const machine = value.target.value;
    const machines = self.state.machines

    for(let i = 0; i < machines.length; i++) {
      if(machines[i].name === machine) {
        machines[i].checked = !machines[i].checked;
      }
    }

    console.log(machines)

    self.setState({
      machines: machines,
    })

  }


  render() {
    return (
      <div>
        <div className="salesfilter">
          <h1>Which Merch Roadies would you like to see sales for?</h1>
            <form>
            { this.state.machines.map((item, i) => {
                return <label key={i}><input type="checkbox" key={i} checked={item.checked} value={item.name} onChange={this.handleChange} />{item.name}</label>
              })
            }
            </form>
        </div>
      </div>
    )
  }
}

export default SalesMRFilter;
