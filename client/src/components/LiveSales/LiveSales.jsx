import React from 'react';
import axios from 'axios';
import CountUp from 'react-countup';

let x = 0
const add = () => { x+= 20; return x }
let n = 0
const increment = () => { n++; return n; }

class LiveSales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        device: '',
        prevTotal: 0,
        total: 0,
        prevNumsold: 0,
        numsold: 0,
    }
  }


componentDidMount() {
  const self = this;

  this.getSales = setInterval(function(){
    axios({
      method: 'post',
      url: '/sales',
      data: {
        email: localStorage.email
      }
    }).then(res => {
      console.log(res.data);


      let device;
      let prevTotal = x
      let total = add();
      let prevNumsold = n
      let numsold = increment();

      // let total = 0;
      // let numsold = 0;

      for(let i = 0; i < res.data.length; i++) {
        device = res.data[i].device;
        total += parseFloat(res.data[i].total);
        numsold += res.data[i].numsold;
      }

      console.log(total, numsold)

      self.setState({
        device: device,
        prevTotal: prevTotal,
        total: total,
        prevNumsold: prevNumsold,
        numsold: numsold,
      })
    }) }, 8000);
}

componentWillUnmount() {
  clearInterval(this.getSales);
}

  render() {
    return (
      <div>
        <div id="title" className="machinesale">
          <img className="machine" src={'../../../images/whitelogo.png'} />
          <br /><br />
          <h1 className="machinename">MR-2</h1>
          <br />
          <CountUp
            className="countup"
            start={this.state.prevTotal}
            end={this.state.total}
            useEasing={true}
            useGrouping={true}
            separator=","
            decimals={2}
            prefix="Total Sales: $"
          />
          <br />
          <CountUp
            className="countup"
            start={this.state.prevNumsold}
            end={this.state.numsold}
            useEasing={true}
            useGrouping={true}
            separator=","
            decimals={0}
            prefix="Total Items Sold: "
          />
        </div>
      </div>
    )
  }

}

export default LiveSales;
