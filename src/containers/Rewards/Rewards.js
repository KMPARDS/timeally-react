import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';
import { timeally } from '../../env';

import TransactionModal from '../TransactionModal/TransactionModal';

const ethers = require('ethers');

class Rewards extends Component {
  state = {
    reward: '',
    status: 0,
    claiming: false,
    stakingPlan: undefined,
    showTransactionModal: false,
    errorMessage: '',
    successDisplay: false,
    restaked: false
  }

  checkReward = async() => {
    this.setState({ status: 1 });
    const reward = await this.props.store.timeallyInstance.functions.launchReward(this.props.store.walletInstance.address);
    this.setState({ status: 2, reward: window.lessDecimals(reward) });
  };

  claimReward = async () => {
    this.setState({ claiming: true, errorMessage: '' });
    try {
      const reward = await this.props.store.timeallyInstance.functions.claimLaunchReward(this.state.stakingPlan);
      this.setState({ successDisplay: true });
    } catch (e) {
      this.setState({ errorMessage: e.message });
    }
    this.setState({ claiming: false });
  };

  render() {
    let rewardComponent;
    if(this.state.status === 1) {
      rewardComponent = (
        <div>
          <p>Please wait checking in the blockchain ...</p>
        </div>
      );
    } else if(this.state.status === 2 && this.state.reward === '0.0') {
      rewardComponent = (
        <div>
          <p>Sorry there is no reward currently, please try later.</p>
        </div>
      );
    } else if(this.state.status === 2) {
      rewardComponent = (
        <div>
          <p>Hey! A reward of {this.state.reward} ES is available!</p>
          {window.connectedToMetamask ? <select onChange={event => this.setState({ stakingPlan: event.target.value })}>
            <option value={undefined} selected disabled>Click to select your staking plan</option>
            <option value={0}>1 Year</option>
            <option value={1}>2 Year</option>
          </select> : null}<br /><br />
        {this.state.errorMessage ? <Alert variant="danger">{this.state.errorMessage}</Alert> : null}
        {this.state.successDisplay ? <Alert variant="success">Success! You can go to your stakings page to see your new staking!</Alert> : null}
        <button className="btn btn-default btn-sm" onClick={()=>{
            if(window.connectedToMetamask) {
              this.claimReward();
            } else {
              this.setState({ showTransactionModal: true});
            }
          }} disabled={this.state.claiming}>{this.state.claiming ? 'Claiming...' : 'Claim this into a staking'}</button>
        </div>
      );
    }


    return (
        <div>
            <div className="page-header">
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-breadcrumb">
                          <ol className="breadcrumb">
                            <li><a href="index.html">Home</a></li>
                            <li className="active">Rewards</li>
                          </ol>
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="bg-white pinside30">
                          <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12">
                              <h1 className="page-title">Claim your rewards</h1>
                            </div>
                            <div className="col-xl-8 col-lg-8 col-md-3 col-sm-12 col-12">

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
                    <p>Note: <strong>You need some amount of Ether in your wallet address to proceed with your claim. Having at least 0.01 ETH is good</strong>. The network fee is generally pretty less than this, you can view exact amount of network gas fee when you will proceed. It depends on how much crowded Ethereum network is currently. This fee is paid to the miners of Ethereum blockchain network who contribute their resources to keep this network decentralized, immutable and safe from corruption. If you don't have sufficient amount of Ether, your transaction would not be proceed. Ether is a popular cryptocurrency and you can get it from almost any cryptocurrency exchange.</p>
                    {this.state.restaked
                      ? <>
                        <Alert variant="success">Your ES are staked. You can go to stakings to see your staking.</Alert>
                        <Button onClick={() => this.props.history.push('/stakings')}>Go to Stakings</Button>
                      </>
                      : <>
                      {this.state.reward ? null : <button className="btn btn-default btn-sm" onClick={this.checkReward}>Check for vesting rewards</button>}
                      {rewardComponent}
                    </>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

            </div>

          <TransactionModal
            show={this.state.showTransactionModal}
            hideFunction={() => this.setState({ showTransactionModal: false })}
            ethereum={{
              transactor: this.props.store.timeallyInstance.functions.claimLaunchReward,
              estimator: this.props.store.timeallyInstance.estimate.claimLaunchReward,
              contract: this.props.store.timeallyInstance,
              arguments: [this.state.stakingPlan],
              reward: this.state.reward,
              continueFunction: () => this.setState({
                status: 0,
                reward: '',
                showTransactionModal: false,
                restaked: true
              })
              //minimumBetInEs: this.state.minimumBetInExaEs!==undefined ? (new BigNumber(ethers.utils.bigNumberify(this.state.minimumBetInExaEs))).dividedBy(10**18).toFixed() : undefined
            }}
          />

         </div>
    );
  }
}

export default connect(state => {return{store: state}})(Rewards);
