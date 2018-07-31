import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import DayPicker, { DateUtils } from 'react-day-picker';
import swal from 'sweetalert2';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: undefined,
      to: undefined,
      startTime: undefined,
      endTime: undefined,
    }
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleCreateEvent = this.handleCreateEvent.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.startTimeChange = this.startTimeChange.bind(this);
    this.endTimeChange = this.endTimeChange.bind(this);
  }

  getInitialState() {
    this.setState({
      from: undefined,
      to: undefined,
    })
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  handleCreateEvent() {
    if(this.state.from === undefined) {
      swal({
        type: 'error',
        title: 'Error',
        text: 'Please choose a date!',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
        this.sendDates();
        this.props.showFilteredSales();
    }
  }

  createEvent() {
    let to;

    if(this.state.to) {
      to = this.state.to.toLocaleDateString();
    }
    const dates = [this.state.from.toLocaleDateString(), to]
    const name = $('#EventName').val();
    const email = localStorage.email;
  }

  startTimeChange(startTime) {
    this.setState({
      startTime: startTime,
    })
  }

  endTimeChange(endTime) {
    this.setState({
      endTime: endTime,
    })
  }

  render() {
    const format = 'h:mm a';
    const now = moment().hour(0).minute(0);
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div>
      <label><input id="EventName" style={{ width: 300 }} className="login" type="text" name="eventname" />Event Name:</label>
        <div className="calendar">
          <p>
            {!from && !to && 'Please select a date.'}
            {from && !to && '*Optional* Please select the last date.'}
            {from &&
              to &&
              `Selected from ${from.toLocaleDateString()} to
                  ${to.toLocaleDateString()}`}{' '}
            {from &&
              to && (
                <button className="link" onClick={this.handleResetClick}>
                  Reset
                </button>
              )}
          </p>
          <DayPicker
            className="Selectable"
            numberOfMonths={this.props.numberOfMonths}
            selectedDays={[from, { from, to }]}
            modifiers={modifiers}
            onDayClick={this.handleDayClick}
          /><br />
          Start Time:<br /><TimePicker
            showSecond={false}
            defaultValue={now}
            className="xxx"
            onChange={this.startTimeChange}
            format={format}
            use12Hours
            inputReadOnly
           /><br /><br />
           End Time:<br /><TimePicker
             showSecond={false}
             defaultValue={now}
             className="xxx"
             onChange={this.endTimeChange}
             format={format}
             use12Hours
             inputReadOnly
            /><br /><br />
          <button onClick={this.handleCreateEvent}>Create Event</button>
          </div>
      </div>
    )
  }
}

export default CreateEvent;
