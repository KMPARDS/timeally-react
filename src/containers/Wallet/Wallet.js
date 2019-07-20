import React, { Component } from 'react';
import { connect } from 'react-redux';

const ethers = require('ethers');

class WalletPage extends Component {
  state = {
    userAddress: '',
    esBalance: {},
    etherBalance: {},
    totalStakings: {},
    share: {}
  }

  async componentDidMount() {
    if(Object.keys(this.props.store.walletInstance).length) {
      const month = await this.props.store.timeallyInstance.functions.getCurrentMonth();

      await this.setState({
        userAddress: this.props.store.walletInstance.address
      });
      this.setState({
        esBalance: await this.props.store.esInstance.functions.balanceOf(this.state.userAddress)
      });
      this.setState({
        etherBalance: await this.props.store.providerInstance.getBalance(this.state.userAddress)
      });
      this.setState({
        totalStakings: await this.props.store.timeallyInstance.functions.userActiveStakingByMonth(
          this.props.store.walletInstance.address,
          (month).add(1)
        )
      });

      this.setState({
        share: await this.props.store.timeallyInstance.functions.seeShareForUserByMonth(
          this.props.store.walletInstance.address,
          month
        )
      });
    }
  }

  render() {
    let isWalletPresent = false;
    if(Object.keys(this.props.store.walletInstance).length) {
      isWalletPresent = true;
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
                      <div className="bg-white pinside30 mb30 highlight-outline outline">
                        <p><b>YourAddress</b> : <span style={{color:'#f51f8a'}}>{this.state.userAddress}</span></p>
                        <div className="row">
                          <div className="col-md-6"><b>Your ES Balance</b>:
                            {Object.keys(this.state.esBalance).length ? ethers.utils.formatEther(this.state.esBalance) : null} ES</div>
                          <div className="col-md-6"><b>Your Ether Balance</b>:
                            {Object.keys(this.state.etherBalance).length ? ethers.utils.formatEther(this.state.etherBalance) : null } ETH</div>
                          <div className="col-md-6"><b>Your Total Active Stakings in Next Month</b>:
                            {Object.keys(this.state.totalStakings).length ? ethers.utils.formatEther(this.state.totalStakings) : null} ES</div>
                          <div className="col-md-6"><b>This Month's Benefit</b>:
                            {Object.keys(this.state.share).length ? ethers.utils.formatEther(this.state.share) : null} ES</div>
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
