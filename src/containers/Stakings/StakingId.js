import React, { Component } from 'react';
import { connect } from 'react-redux';

const ethers = require('ethers');

class StakingId extends Component {
  state = {
    staking: {}
  }
  componentDidMount = async () => {
    if(this.props.store.walletInstance.address && this.props.match.params.id) {
      const staking = await this.props.store.timeallyInstance.functions.viewStaking(
        this.props.store.walletInstance.address,
        this.props.match.params.id
      );

      this.setState({ staking });
    }
  };

  render() {
    if(!this.props.store.walletInstance.address) {
      return (<p>User not found, please load wallet</p>);
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
                        <li>Stakings</li>
                        <li className="active">{this.props.match.params.id}</li>
                      </ol>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="bg-white pinside30">
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12">
                          <h1 className="page-title">Stakings</h1>
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

                    <p>Staking amount: {this.state.staking[0] ? ethers.utils.formatEther(this.state.staking[0]) : null}</p>
                    <p>Staking time: {new Date(this.state.staking[1] * 1000).toLocaleString()}</p>
                    <p>Staking plan Id: {this.state.staking[2] ? this.state.staking[2].toNumber() : null} ({this.state.staking[2] ? '2 Year' : '1 Year'})</p>
                    <p>Status: {this.state.staking[3] ? this.state.staking[3].toNumber() : null}</p>
                    <p>Accrued amount: {this.state.staking[4] ? ethers.utils.formatEther(this.state.staking[4]) : null}</p>
                    {this.state.staking[3] && this.state.staking[3].eq(2) ? <p>Loan id: {this.state.staking[5] ? this.state.staking[5].toNumber() : null}</p> : null}



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

export default connect(state => {return{store: state}})(StakingId);
