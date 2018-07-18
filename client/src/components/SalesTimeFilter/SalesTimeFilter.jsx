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
    this.handleNoCheck = this.handleNoCheck.bind(this);
    this.timeSelect = this.timeSelect.bind(this);
    this.eventSelect = this.eventSelect.bind(this);
  }

  handleCheck(e) {
    console.log(e.target.value)
  }

  handleNoCheck() {
    let bool = false;
    console.log(this.props)

    if((this.state.time === false) && (this.state.event === false)) {
      swal({
        type: 'error',
        title: 'Error',
        text: 'Please choose an option!',
        showConfirmButton: false,
        timer: 1500
      })
    }
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



  render() {
    return (
      <div>
        <div className="salesfilter">
          <h2> Do you want to see your report by Start and End time or Event?</h2>
          <h1>Note: You must have registered the Event in the main dashboard for it to appear here.
          Event Reports will have a settlement summary at the bottom.</h1>
          <label><input name="answer" type="radio" value="time" onClick={this.timeSelect} />Start & End Time</label>
          <label><input name="answer" type="radio" value="event" onClick={this.eventSelect} />Event</label>
          <button onClick={this.handleNoCheck}>Next</button>
        </div>
      </div>
    )
  }
}

export default SalesTimeFilter;
