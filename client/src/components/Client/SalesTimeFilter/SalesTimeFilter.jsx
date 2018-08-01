import React from 'react';
import swal from 'sweetalert2';

class SalesTimeFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: false,
      event: false,
      showSelections: true,
      showTime: false,
      showEvent: false,
    }
    this.handleNext = this.handleNext.bind(this);
    this.timeSelect = this.timeSelect.bind(this);
    this.eventSelect = this.eventSelect.bind(this);
  }

  timeSelect() {
    this.setState({
      time: true,
      event: false,
    })
  }

  eventSelect() {
    this.setState({
      event: true,
      time: false,
    })
  }

  handleNext() {
    let bool = false;

    if((this.state.time === false) && (this.state.event === false)) {
      swal({
        type: 'error',
        title: 'Error',
        text: 'Please choose an option!',
        showConfirmButton: false,
        timer: 1500
      })
    } else if(this.state.time === true) {
      this.props.showCalendar();
    } else if(this.state.event === true) {
      this.props.showSalesEventFilter();
    }
  }

  render() {
    return (
      <div>
        <div className="salesfilter">
          <h2> Do you want to see your report by Start and End time or Event?</h2>
          <h1>Note: You must have registered the Event in the main dashboard for it to appear here.
          Event Reports will have a settlement summary at the bottom.</h1>
          <label><input name="answer" type="radio" value="time" onClick={this.timeSelect} />Start & End Time</label>
          <label><input name="answer" type="radio" value="event" onClick={this.eventSelect} />Event</label>
          <button onClick={this.handleNext}>Next</button>
        </div>
      </div>
    )
  }
}

export default SalesTimeFilter;
