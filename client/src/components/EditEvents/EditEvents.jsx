import React from 'react';
import axios from 'axios';


class EditEvent extends React.Component {
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
      this.setState({
        events: res.data.rows,
      })
    })
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

export default EditEvent;
