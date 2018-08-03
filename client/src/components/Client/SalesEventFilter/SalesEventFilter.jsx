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
    this.sendEvent = this.sendEvent.bind(this);
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
        events.push(e[i]);
      }

      this.setState({
        events: events,
      })
    })
  }

  handleChange(e) {
    let event;

    for(let i = 0; i < this.state.events.length; i++) {
      if(this.state.events[i].name === e.target.value) {
        event = this.state.events[i];
      }
    }

    this.setState({
      selectedEvent: event,
    })
  }

  sendEvent() {
    this.props.sendEvent(this.state.selectedEvent);
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
      this.sendEvent();
      this.props.showFilteredSales();
    }
  }

  render() {
    return (
      <div>
        <div className="salesfilter">
          <h1>Which events would you like to see sales for?</h1>
            <form>
            { this.state.events.map((event, i) => {
                return <label key={i}><input type="radio" name="events" key={i} value={event.name} onChange={this.handleChange} />{event.name}</label>
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
