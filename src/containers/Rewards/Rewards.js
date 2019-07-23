import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { timeally } from '../../env';

const ethers = require('ethers');

class Rewards extends Component {
  state = {
    reward: '',
    status: 0,
    claiming: false
  }

  checkReward = async() => {
    this.setState({ status: 1 });
    const reward = await this.props.store.timeallyInstance.functions.launchReward(this.props.store.walletInstance.address);
    this.setState({ status: 2, reward: ethers.utils.formatEther(reward) });
  };

  claimReward = async stakingPlanId => {
    this.setState({ claiming: true });
    const reward = await this.props.store.timeallyInstance.functions.claimLaunchReward(stakingPlanId);
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
          <p>Sorry there is no reward currently, please try letter.</p>
        </div>
      );
    } else if(this.state.status === 2) {
      rewardComponent = (
        <div>
          <p>Hey! A reward of {this.state.reward} ES is available!</p>
          <button onClick={this.claimReward.bind(this, 0)} disabled={this.state.claiming}>{this.state.claiming ? 'Claiming...' : 'Claim this into a staking'}</button>
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
                    <button onClick={this.checkReward}>Check for rewards</button>
                    {rewardComponent}
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

export default connect(state => {return{store: state}})(Rewards);
