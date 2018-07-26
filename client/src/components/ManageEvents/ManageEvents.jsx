import React from 'react';


class ManageEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateEvent: false,
      showEditEvent: false,
    }
    this.showCreateEvent = this.showCreateEvent.bind(this);
    this.showEditEvent = this.showEditEvent.bind(this);
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

export default ManageEvents;
