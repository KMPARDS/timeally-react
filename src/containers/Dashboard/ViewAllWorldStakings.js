import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import StakingEntry from './StakingEntry';
import { timeally } from '../../env';
const ethers = require('ethers');

class ViewAllWorldStakings extends Component {
  state = {
    stakings: []
  };

  componentDidMount = async() => {
    const newStakingEventSig = ethers.utils.id("NewStaking(address,uint256,uint256,uint256)");
    const topics = [ newStakingEventSig, null, null, null ];

    const logs = await this.props.store.providerInstance.getLogs({
      address: timeally.address,
      fromBlock: 0, //(await this.props.store.providerInstance.getBlockNumber()) - 5760,
      toBlock: 'latest',
      topics
    });

    console.log('fetching logs from the ethereum blockchain', logs);

    let stakingsInLast24Hours = ethers.utils.bigNumberify(0);
    const stakings = [];
    for(let i = logs.length - 1; i >= 0; i--) {
      const log = logs[i];

      const address = log.topics[1].slice(0,2) + log.topics[1].slice(26,log.topics[1].length);
      const stakingId = Number('0x'+log.data.slice(66,130));
      console.log(stakingId);
      // const staking = await this.props.store.timeallyInstance.functions.stakings(address, stakingId);
      //console.log(staking);
      stakings.push({
        address,
        stakingId,
        planId: ethers.utils.bigNumberify(log.topics[2]).toNumber(),
        amount: window.lessDecimals(ethers.utils.bigNumberify(log.data.slice(0,66))),
        transactionHash: log.transactionHash
      });
    }

    this.setState({ stakings });
  };

  render() {
    return (
      <>
        {this.state.stakings.length
        ? <>
          <Table responsive>
            <thead style={{textAlign:'center'}}>
              <tr>
                <th>Address</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Staking Type</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            {this.state.stakings.map(staking => (
              <StakingEntry
                address={staking.address}
                stakingId={staking.stakingId}
                planId={staking.planId}
                amount={staking.amount}
                transactionHash={staking.transactionHash}
              />
            ))}
          </Table>
        </> : 'Please wait loading stakings...'}
      </>
    );
  }
}

export default connect(state => {return{store: state}})(ViewAllWorldStakings);
