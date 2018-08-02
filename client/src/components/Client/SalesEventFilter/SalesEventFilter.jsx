import React from 'react';
import axios from 'axios';

class SalesEventFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    }
  }

  componentDidMount() {
    axios({
      url: '/getevents',
      method: 'post',
      data: {
        email: localStorage.email,
      }
    }).then(res => {
      const e = [];
      const events = [];

      for(let i = 0; i < res.data.rows.length; i++) {
        e.push(res.data.rows[i]);
      }

      for(let i = 0; i < e.length; i++) {
        events.push({
          event: e[i],
          checked: false,
        });
      }

      this.setState({
        events: events,
      })
      console.log(events)
    })
  }

  handleNext() {
    // let bool = false;
    //
    // for(let i = 0; i < this.state.machines.length; i++) {
    //   if(this.state.machines[i].checked === true) {
    //     bool = true;
    //   }
    // }
    //
    // if(bool === false) {
    //   swal({
    //     type: 'error',
    //     title: 'Error',
    //     text: 'Please choose at least one event!',
    //     showConfirmButton: false,
    //     timer: 1500
    //   })
    // } else {
    //   this.sendMachines();
    //   this.props.showSalesTimeFilter();
    // }
  }

  render() {
    return (
      <div>
        <div className="salesfilter">
          <h1>Which events would you like to see sales for?</h1>
            <form>
            { this.state.events.map((item, i) => {
                return <label key={i}><input type="checkbox" key={i} value={item.event.name} onChange={this.handleChange} />{item.event.name}</label>
              })
            }
            </form>
            <button onClick={this.handleNext}>Next</button>
        </div>
      </div>
    )
  }
}

export default SalesEventFilter;
