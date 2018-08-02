import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import DayPicker from 'react-day-picker';
import swal from 'sweetalert2';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      startTime: moment().hour(0).minute(0),
      endTime: moment().hour(0).minute(0),
    }
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleCreateEvent = this.handleCreateEvent.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.startTimeChange = this.startTimeChange.bind(this);
    this.endTimeChange = this.endTimeChange.bind(this);
  }

  handleDayClick(day, { selected }) {
    this.setState({
      date: selected ? undefined : day,
    });
  }

  handleCreateEvent() {
    if(this.state.date === undefined) {
      swal({
        type: 'error',
        title: 'Error',
        text: 'Please choose a date!',
        showConfirmButton: false,
        timer: 1500
      })
    } else if($('#EventName').val() === '') {
      swal({
        type: 'error',
        title: 'Error',
        text: 'Please enter an event name!',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      this.createEvent()
      swal({
        title: 'Event Created!',
        type: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  createEvent() {
    const name = $('#EventName').val();
    const email = localStorage.email;
    
    axios({
      method: 'post',
      url: '/createevent',
      data: {
        name: name,
        day: this.state.date.toLocaleDateString(),
        startTime: moment(this.state.startTime, 'HH:mm'),
        endTime: moment(this.state.endTime, 'HH.mm'),
        email: email
      }
    })
    console.log(moment(this.state.startTime).format('HH:mm'));
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
    return (
      <div>
      <label><input id="EventName" style={{ width: 300 }} className="login" type="text" name="eventname" />Event Name:</label>
        <div className="calendar">
          <p>
            {this.state.date ? `${this.state.date.toLocaleDateString()} selected` : 'Please select a day'}
          </p>
          <DayPicker
            className="Selectable"
            selectedDays={this.state.date}
            onDayClick={this.handleDayClick}
          />
          <br />
          Start Time:
          <br /><TimePicker
            showSecond={false}
            defaultValue={this.state.startTime}
            onChange={this.startTimeChange}
            format={'h:mm a'}
            use12Hours
            inputReadOnly
           />
          <br /><br />
         End Time:
         <br /><TimePicker
           showSecond={false}
           defaultValue={this.state.endTime}
           onChange={this.endTimeChange}
           format={'h:mm a'}
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
