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
        { this.state.events.map((event, i) => {
              return <h1 key={i}>{event.name}</h1>
            })
          }
      </div>
    )
  }
}

export default EditEvent;
