import React from 'react';
import axios from 'axios';

class AllSales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
    }
  }

  componentDidMount() {
    const self = this;

    axios({
      method: 'post',
      url: '/sales',
      data: {
        email: localStorage.email
      }
    }).then(res => {
      console.log(res.data);

      const sales = []

      self.setState({
        sales: sales,
      })
    })
  }

  render() {
    return (
      <div>
      <h1>ALLL SALEZZZ</h1>
      {this.state.sales}
      </div>
    )
  }

}

export default AllSales;
