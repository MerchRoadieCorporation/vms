import React from 'react';

class SalesTimeFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="salesfilter">
          <h2> Do you want to see your report by Start and End time or Event?</h2>
          <h1>Note: You must have registered the Event in the main dashboard for it to appear here.
          Event Reports will have a settlement summary at the bottom.</h1>
        </div>
      </div>
    )
  }
}

export default SalesTimeFilter;
