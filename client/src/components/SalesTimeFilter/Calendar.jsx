import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import swal from 'sweetalert2';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: undefined,
      to: undefined,
    }
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.sendDates = this.sendDates.bind(this);
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

  sendDates() {
    let to;

    if(this.state.to) {
      to = this.state.to.toLocaleDateString();
    }
    const dates = [this.state.from.toLocaleDateString(), to]
    this.props.sendDates(dates);
  }

  handleNext() {
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

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
    <div>
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
        <button onClick={this.handleNext}>Next</button>
        </div>
      </div>
    )
  }

}

export default Calendar;
