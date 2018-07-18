import React from 'react';
import axios from 'axios';
import SaleTimeFilter from '../SalesTimeFilter/SalesTimeFilter';
import swal from 'sweetalert2';

class SalesMRFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      machines: [],
    }
    this.handleChange = this.handleChange.bind(this);
    // this.selectAll = this.selectAll.bind(this);
    this.handleNoCheck = this.handleNoCheck.bind(this);
    this.sendMachines = this.sendMachines.bind(this);
  }

  componentDidMount() {
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

      this.setState({
        machines: machines,
      })
    })
  }

  handleChange(e) {
    const machine = e.target.value;
    const machines = this.state.machines;

    for(let i = 0; i < machines.length; i++) {
      if(machines[i].name === machine) {
        machines[i].checked = !machines[i].checked;
      }
    }
    
    this.setState({
      machines: machines,
    })
  }

  sendMachines() {
    const mrArr = [];

    for(let i = 0; i < this.state.machines.length; i++) {
      if(this.state.machines[i].checked === true) {
        mrArr.push(this.state.machines[i].name)
      }
    }

    this.props.sendMachines(mrArr);
  }

  handleNoCheck() {
    let bool = false;

    for(let i = 0; i < this.state.machines.length; i++) {
      if(this.state.machines[i].checked === true) {
        bool = true;
      }
    }

    if(bool === false) {
      swal({
        type: 'error',
        title: 'Error',
        text: 'Please choose at least one Merch Roadie!',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      this.sendMachines();
      this.props.showSalesTimeFilter();
    }
  }

  // selectAll() {
  //   const self = this;
  //   const machines = self.state.machines;
  //
  //   for(let i = 0; i < machines.length; i++) {
  //     machines[i].checked = true
  //   }
  //
  //   console.log(machines)
  //
  //   self.setState({
  //     machines: machines,
  //   })
  // }

  render() {
    return (
      <div>
        <div className="salesfilter">
          <h1>Which Merch Roadies would you like to see sales for?</h1>
            <form>
            { this.state.machines.map((item, i) => {
                return <label key={i}><input type="checkbox" key={i} value={item.name} onChange={this.handleChange} />{item.name}</label>
              })
            }
            </form>
            <button onClick={this.handleNoCheck}>Next</button>
        </div>
      </div>
    )
  }
}

export default SalesMRFilter;
