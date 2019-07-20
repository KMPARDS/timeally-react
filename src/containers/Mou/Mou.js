import React, { Component } from 'react';
import { connect } from 'react-redux';

class Mou extends Component {
  state = {
    seconds: '',
    timeTravelling: 0,
    errorMessage: ''
  }

  goToPast = async () => {
    this.setState({ timeTravelling: 1 });
    try {
      const tx = await this.props.store.esInstance.goToPast( Number(this.state.seconds) );
      this.setState({ timeTravelling: 2 });
      await tx.wait();
      this.setState({ timeTravelling: 0 });
    } catch(err) {
      this.setState({ timeTravelling: 0, errorMessage: err.message });
    }
  }

  goToFuture = async () => {
    this.setState({ timeTravelling: 1 });
    try {
      const tx = await this.props.store.esInstance.goToFuture( Number(this.state.seconds) );
      this.setState({ timeTravelling: 2 });
      await tx.wait();
      this.setState({ timeTravelling: 0 });
    } catch(err) {
      this.setState({ timeTravelling: 0, errorMessage: err.message });
    }
  }

  render() {
    if(this.state.timeTravelling === 2) {
      return (
        <p>Please wait time travelling!</p>
      );
    } else if(this.state.timeTravelling === 1) {
      return (
        <p>Please wait starting time machine...</p>
      );
    } else {
      return (
        <div>
          <button onClick={this.goToPast}>{'<='} Go to Past</button>
          <input type="text" placeholder="Enter no of seconds" onKeyUp={e => this.setState({ seconds: e.target.value})} />
          <button onClick={this.goToFuture}>Go to Future {'=>'}</button>
          {
            this.state.errorMessage
            ? <div><br />
            <p>Error from Blockchain: {this.state.errorMessage}</p></div>
            : null
          }
          <table>
            <tr>
              <td>30.5 days</td>
              <td>2635200</td>
            </tr>
            <tr>
              <td>366 days</td>
              <td>31622400</td>
            </tr>
            <tr>
              <td>61 days</td>
              <td>5270400</td>
            </tr>
          </table>
        </div>
      );
    }

  }
}

export default connect(state => {return{store: state}})(Mou);
