import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

class Navbar extends Component {
  state = {
    userAddress: ''
  };

  componentDidMount = () => {
    window.updateTheNavbar = async action => {
      if(action.type === 'LOAD-WALLET-INSTANCE') {
        let userAddress = '';
        if(Object.entries(action.payload).length) {
          userAddress = await action.payload.getAddress();
        }
        this.setState({ userAddress });
      }
    };
  }

  render() {
    return (
      <div {...this.props}>
        <div onClick={() => this.props.history.push('/')}>Dashboard</div>
        <div onClick={() => this.props.history.push('/transactions')}>Transactions</div>
      </div>
    );
  }
}

export default connect(state => {return{store: state}})(withRouter(Navbar));
