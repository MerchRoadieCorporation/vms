import React from 'react';
import axios from 'axios';
import swal from 'sweetalert2';

class SalesEventFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      selectedEvent: undefined,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
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

  handleChange(e) {
    this.setState({
      selectedEvent: e.target.value,
    })
  }

  handleNext() {    
    if(!this.state.selectedEvent) {
      swal({
        type: 'error',
        title: 'Error',
        text: 'Please choose an event!',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      console.log('yay')
    }
  }

  render() {
    return (
      <div>
        <div className="salesfilter">
          <h1>Which events would you like to see sales for?</h1>
            <form>
            { this.state.events.map((item, i) => {
                return <label key={i}><input type="radio" key={i} value={item.event.name} onChange={this.handleChange} />{item.event.name}</label>
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
