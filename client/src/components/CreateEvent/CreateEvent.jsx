import React from 'react';
import axios from 'axios';
import $ from 'jquery';


class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.createEvent = this.createEvent.bind(this);
  }

  createEvent() {
    const name = $('#EventName').val();
    const email = localStorage.email;
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

export default CreateEvent;
