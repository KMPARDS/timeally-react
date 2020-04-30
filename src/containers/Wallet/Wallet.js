import React, { Component } from 'react';
import { connect } from 'react-redux';
import copy from 'copy-to-clipboard';
import { Button } from 'react-bootstrap';

const ethers = require('ethers');

class WalletPage extends Component {
  state = {
    esBalance: null,
    etherBalance: null,
    totalStakingsNow: null,
    totalStakingsNext: null,
    rewardsESBalance: null,
    tsgapPrepaidESBalance: null,
    prepaidESBalance: null,
    myActiveStakings: null,
    copied: false
  };

  componentDidMount = async () => {
    if(Object.keys(this.props.store.walletInstance).length) {
      const userAddress = this.props.store.walletInstance.address;
      const currentMonth = await this.props.store.timeallyInstance.functions.getCurrentMonth();

      (async()=>{
        this.setState({
          esBalance: await this.props.store.esInstance.functions.balanceOf(userAddress)
        });
      })();

      (async()=>{
        this.setState({
          etherBalance: await this.props.store.providerInstance.getBalance(userAddress)
        });
      })();

      (async() => {
        const rewardsESBalance = await this.props.store.timeallyInstance.functions.launchReward(userAddress);
        this.setState({ rewardsESBalance });
      })();
      (async() => {
        const tsgapPrepaidESBalance = await this.props.store.sipInstance.functions.prepaidES(userAddress);
        this.setState({ tsgapPrepaidESBalance });
      })();
      (async() => {
        const prepaidESBalance = await this.props.store.petInstance.functions.prepaidES(userAddress);
        this.setState({ prepaidESBalance });
      })();

      (async() => {
        // const myActiveStakings = await this.props.store.timeallyInstance.functions.userActiveStakingByMonth(this.props.store.walletInstance.address, currentMonth);

        const numberOfStakings = Number(await this.props.store.timeallyInstance.functions
          .getNumberOfStakingsByUser(this.props.store.walletInstance.address));
        console.log('numberOfStakings',numberOfStakings);
        let myActiveStakings = ethers.utils.bigNumberify(0);
        if(numberOfStakings) {
          for(let stakingId = 0; stakingId < numberOfStakings; stakingId++) {
            // if(await this.props.store.timeallyInstance.functions.isStakingActive(
            //   this.props.store.walletInstance.address,
            //   stakingId,
            //   currentMonth
            // )) {
              const staking = await this.props.store.timeallyInstance.functions.stakings(
                this.props.store.walletInstance.address,
                stakingId
              );
              if(Number(staking[4]) === 1) {
                myActiveStakings = myActiveStakings.add(staking[0]);
              }

              // console.log(ethers.utils.formatEther(staking[0]))
            // }
          }
        }

        this.setState({ myActiveStakings });
      })();
    }
  }

  render() {
    let isWalletPresent = false;
    let userAddress;
    if(Object.keys(this.props.store.walletInstance).length) {
      isWalletPresent = true;
      userAddress = this.props.store.walletInstance.address;
    }
    return (
      <div>
            <div className="page-header">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="page-breadcrumb">
                      <ol className="breadcrumb">
                        <li><a>Home</a></li>
                        <li className="active">Wallet</li>
                      </ol>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="bg-white pinside30">
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12">
                          <h1 className="page-title">Wallet</h1>
                        </div>
                        {/* <div className="col-xl-8 col-lg-8 col-md-3 col-sm-12 col-12">
                          <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="btn-action"> <a href="#" className="btn btn-default">How To Apply</a> </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* content start */}
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="wrapper-content bg-white pinside40">
                   <div className="bg-white section-space80">
                     <div className="container">
                  <div className="row">
                    {
                     isWalletPresent ?
                    <div className="col-12">
                      <div className="bg-white pinside30 mb30 highlight-outline outline set-word-break-all">
                        <p style={{cursor: 'pointer'}} onClick={() => {
                          copy(userAddress);
                          this.setState({ copied: true });
                          setTimeout(this.setState.bind(this, {copied: false}), 2000);
                        }}><b>YourAddress</b> : <span style={{color:'#f51f8a'}}>{userAddress}</span>{this.state.copied ? <> ✓ Copied!</> : (userAddress ? <> Click to Copy</> : null)}</p>
                        <div className="row">
                          <div className="col-md-6 set-word-break-all"><b>Your ES Balance</b>:
                            {this.state.esBalance ? window.lessDecimals(this.state.esBalance) : null} ES
                          </div>
                          <div className="col-md-6 set-word-break-all"><b>Your Ether Balance</b>:
                            {this.state.etherBalance ? window.lessDecimals(this.state.etherBalance) : null } ETH
                          </div>
                          <div className="col-md-6 set-word-break-all"><b>Your Stakings</b>:
                            {this.state.myActiveStakings ? window.lessDecimals(this.state.myActiveStakings) + ' ES' : 'Loading...'}
                          </div>
                          <div className="col-md-6 set-word-break-all"><b>Your TimeAlly Rewards:</b>:
                            {this.state.rewardsESBalance ? window.lessDecimals(this.state.rewardsESBalance) + ' ES' : 'Loading...'}
                            {this.state.rewardsESBalance && !this.state.rewardsESBalance.eq(0) ? <Button onClick={() => this.props.history.push('/rewards')}>Go to TA Rewards</Button> : null}
                          </div>
                          <div className="col-md-6 set-word-break-all"><b>Your TSGAP PrepaidES</b>:
                            {this.state.tsgapPrepaidESBalance ? window.lessDecimals(this.state.tsgapPrepaidESBalance) + ' ES' : 'Loading...'}
                            {this.state.tsgapPrepaidESBalance && !this.state.tsgapPrepaidESBalance.eq(0) ? <Button onClick={() => this.props.history.push('/assurance')}>Go to TSGAP</Button> : null}
                          </div>
                          <div className="col-md-6 set-word-break-all"><b>Your PET PrepaidES</b>:
                            {this.state.prepaidESBalance ? window.lessDecimals(this.state.prepaidESBalance) + ' ES' : 'Loading...'}
                            {this.state.prepaidESBalance && !this.state.prepaidESBalance.eq(0) ? <Button onClick={() => this.props.history.push('/pet')}>Go to PET</Button> : null}
                          </div>





                        </div>
                      </div>
                    </div>
                    : <p onClick={() => this.props.history.push('/load-wallet')}>Please load your wallet</p>
                  }


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

export default connect(state => {return{store: state}})(WalletPage);
