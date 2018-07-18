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

  handleNext() {
    if(this.state.from === undefined) {
      swal({
        type: 'error',
        title: 'Error',
        text: 'Please choose a start date!',
        showConfirmButton: false,
        timer: 1500
      })
    } else if(this.state.from && this.state.to === undefined) {
      swal({
        type: 'error',
        title: 'Error',
        text: 'Please choose an end date!',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      console.log(this.state.from.toLocaleDateString(), this.state.to.toLocaleDateString())
    }
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
    <div>
      <div className="calendar">
        <p>
          {!from && !to && 'Please select the first day.'}
          {from && !to && 'Please select the last day.'}
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
