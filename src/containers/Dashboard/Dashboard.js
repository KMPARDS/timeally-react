import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

import { timeally } from '../../env';

const ethers = require('ethers');

class Dashboard extends Component {
  state = {
    stakings: []
  }
  componentDidMount() {
    this.showStakings();
  }

  showStakings = async () => {
    this.setState({ betsToDisplay: [], betsLoading: true });
    const newStakingEventSig = ethers.utils.id("NewStaking(address,uint256,uint256)");
    const topics = [ newStakingEventSig, null, null, null ];

    const logs = await this.props.store.providerInstance.getLogs({
      address: timeally.address,
      fromBlock: 0,
      toBlock: 'latest',
      topics
    });

    const stakings = [];
    for(const log of logs) {
      stakings.push({
        address: log.topics[1].slice(0,2) + log.topics[1].slice(26,log.topics[1].length),
        planId: ethers.utils.bigNumberify(log.topics[2]).toNumber(),
        amount: ethers.utils.formatEther(ethers.utils.bigNumberify(log.data)).toString()
      });
    }

    this.setState({ stakings });

    console.log('fetching logs from the ethereum blockchain', logs);
  }

  render() {
    return (
      <div>
        This is dashboard page
        <div>
          <Button onClick={() => this.props.history.push('/stakings/new')}>New Staking</Button>
          <Card style={{margin: '15px 0'}}>
            <Card.Body>
              <h5>View all stakings happening in world</h5>
              {this.state.stakings.map(staking => (
                <p><strong>Address:</strong> {staking.address} and <strong>Plan:</strong> {staking.planId ? '2 Year' : '1 Year'} and <strong>Amount:</strong> {staking.amount} ES</p>
              ))}
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
};

export default connect(state => {return{store: state}})(withRouter(Dashboard));
