import React, { Component } from 'react';
import { connect } from 'react-redux';

class StakingEntry extends Component {
  state = {
    timestamp: undefined,
    stakingType: undefined
  }

  componentDidMount = async() => {
    // console.log('staking entry', this.props);
    (async() => {
      const staking = await this.props.store.timeallyInstance.functions.stakings(this.props.address, this.props.stakingId);

      this.setState({ timestamp: staking[1].toNumber() });
    })();

    (async() => {
      const transaction = await this.props.store.providerInstance.getTransaction(this.props.transactionHash);
      const first8bytes = transaction.data.slice(2, 10); //0xe5fd04e6
      // console.log(first8bytes === 'e5fd04e6' ? 'Liquid Staking' : 'Reward Staking');
      this.setState({ stakingType: first8bytes === 'e5fd04e6' ? 'Liquid Staking' : 'Reward Staking' })
    })();
  };

  render() {
    return (
      <tr>
        <td style={{color:'#f51f8a'}}>{this.props.address}</td>
        <td>{this.props.planId ? '2 Year' : '1 Year'}</td>
        <td>{this.props.amount}</td>
        <td>{this.state.stakingType || 'Loading...'}</td>
        <td>{this.state.timestamp ? new Date(this.state.timestamp * 1000).toLocaleString() : 'Loading...'}</td>
      </tr>
    );
  }
};

export default connect(state => {return{store: state}})(StakingEntry);
