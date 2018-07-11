import React from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import swal from 'sweetalert2';
import CountUp from 'react-countup';

let x = 0
const add = () => { x+= 20; return x }
let n = 0
const increment = () => { n++; return n; }

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        device: '',
        prevTotal: 0,
        total: 0,
        prevNumsold: 0,
        numsold: 0,
        showSales: false,
    }
    this.logout = this.logout.bind(this);
    this.showSales = this.showSales.bind(this);
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

    if (localStorage.getItem('token') !== 'null') {
      axios({url: 'http://localhost:3000/main', method: 'get'}).then(data => {
      }).catch(err => {
        throw err;
      })
    } else {
      this.props.history.push('/');
    }

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
        let prevTotal = total
        let prevNumsold = numsold
        let total = add();
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
      }) }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.getSales);
  }

// Clear user token and profile data from localStorage
  logout() {
    localStorage.removeItem('token');
    swal({ text: 'You are now logged out.', showConfirmButton: false, timer: 1500});
    this.props.history.replace('/');
  }

//Conditional rendering for sale button on onClick
  showSales() {
    if(this.state.showSales === false) {
      this.setState({
        showSales: true,
      })
    } else {
      this.setState({
        showSales: false,
      })
    }
    console.log('cliced')
  }

  render() {
    return (
      <div>
        <button onClick= {this.showSales}>Sales</button>
        <button id="logout" onClick={this.logout}>Logout</button>
          {this.state.showSales ? <div id="title" className="machinesale">
            <img className="machine" src={'../../../images/whitelogo.png'} />
            <br /><br />
            <h1 className="machinename">MR-2</h1>
            <br />
            <CountUp
              className="countup"
              start={this.state.total}
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
              start={this.state.numsold}
              end={this.state.numsold}
              useEasing={true}
              useGrouping={true}
              separator=","
              decimals={0}
              prefix="Total Items Sold: "
            />
          </div> : null}
      </div>
    )
  }

}

export default Main;
