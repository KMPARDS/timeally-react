import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { timeally } from '../../env';

import Entry from './Entry';

const ethers = require('ethers');

class Stakings extends Component {
  state = {
    stakings: [],
    loading: true
  }

  async componentDidMount() {
    this.showStakings();
  }

  showStakings = async () => {
    const newStakingEventSig = ethers.utils.id("NewStaking(address,uint256,uint256,uint256)");
    const topics = [ newStakingEventSig, ethers.utils.hexZeroPad(this.props.store.walletInstance.address, 32) ];

    const logs = await this.props.store.providerInstance.getLogs({
      address: timeally.address,
      fromBlock: 0,
      toBlock: 'latest',
      topics
    });

    console.log('logs', logs);

    const stakings = [];
    for(let i = logs.length - 1; i >= 0; i--) {
      const log = logs[i];
      const address = log.topics[1].slice(0,2) + log.topics[1].slice(26,log.topics[1].length);
      const stakingId = Number('0x'+log.data.slice(66,130));
      console.log(address, stakingId, log);
      const staking = await this.props.store.timeallyInstance.functions.stakings(address, stakingId);
      console.log(staking);
      stakings.push({
        address,
        planId: ethers.utils.bigNumberify(log.topics[2]).toNumber(),
        amount: window.lessDecimals(ethers.utils.bigNumberify(log.data.slice(0,66))),
        timestamp: staking[1].toNumber(),
        hash: log.transactionHash
      });
    }

    await this.setState({ stakings, loading: false });

    console.log('fetching logs from the ethereum blockchain', logs, this.state.stakings);
  }

  render() {
    return (
    <div>
    <div className="page-header">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li><a href="index.html">Home</a></li>
                    <li className="active">Stakings</li>
                  </ol>
                </div>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="bg-white pinside30">
                  <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12">
                      <h1 className="page-title">Stakings</h1>
                    </div>
                    <div className="col-xl-8 col-lg-8 col-md-3 col-sm-12 col-12">
                      <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <Button className="btn-default" onClick={() => this.props.history.push('/transactions/stakings')}>View only stakings</Button>
                          <Button onClick={() => this.props.history.push('/transactions/withdrawls')}>View only Withdrawls</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
    <div>
  <div className="container">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="wrapper-content bg-white pinside10">

            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

                {this.state.loading
                  ? 'Please wait loading your staking transactions...'
                  : this.state.stakings.map(staking => (
                  <Entry
                    key={staking.hash}
                    store={this.props.store}
                    staking={staking}
                  />
                ))}

              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  </div>
  </div>
  );
  }
}


export default connect(state => {return{store: state}})(Stakings);
