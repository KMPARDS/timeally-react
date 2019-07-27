import React, { Component } from 'react';
import { connect } from 'react-redux';

const ethers = require('ethers');

class StakingId extends Component {
  state = {
    staking: {},
    currentMonth: 0,
    canWithdraw: false,
    withdrawing: false,
    errorMessage: '',
    stakingMonth: 0,
    planMonths: 0,
    monthlyBenefit: {},
    spinner: {}
  }
  componentDidMount = async () => {
    const currentMonth = Number(await this.props.store.timeallyInstance.functions.getCurrentMonth());
    this.setState({ currentMonth });

    if(this.props.store.walletInstance.address && this.props.match.params.id) {
      const staking = await this.props.store.timeallyInstance.functions.stakings(
        this.props.store.walletInstance.address,
        this.props.match.params.id
      );

      const stakingPlan = await this.props.store.timeallyInstance.functions.stakingPlans(
        Number(staking[2])
      );

      this.setState({ staking, stakingMonth: Number(staking[2]), planMonths: Number(stakingPlan[0]) });

      const currentMouTimestamp = (await this.props.store.esInstance.functions.mou()).toNumber();
      const stakingStartTime = this.state.staking[1].toNumber();
      const stakingEndTime = (this.state.staking[2].eq(1) ? 63244800 : 31622400) + stakingStartTime;
      const canWithdraw = currentMouTimestamp > stakingEndTime;

      console.log(canWithdraw, stakingEndTime, currentMouTimestamp);
      this.setState({ canWithdraw });
    }
  };

  fetchBenefit = async month => {
    const spinner = {...this.state.spinner};
    spinner[month] = true;
    this.setState({ spinner });

    console.log(month)

    const benefit = await this.props.store.timeallyInstance.functions.seeBenefitOfAStakingByMonths(
      this.props.store.walletInstance.address,
      this.props.match.params.id,
      [month]
    );

    console.log(benefit);

  }

  withdrawStaking = async () => {
    this.setState({ withdrawing: true, errorMessage: '' });
    try {
      await this.props.store.timeallyInstance.functions.withdrawExpiredStakings([this.props.match.params.id])
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ withdrawing: false });
  };

  render() {
    if(!this.props.store.walletInstance.address) {
      return (<p>User not found, please load wallet</p>);
    }
    const monthsTableRows = [];

    for(let i = this.state.stakingMonth; i < this.state.currentMonth; i++) {
      monthsTableRows.push(
        <tr>
          <td>{i + 1}</td>
          <td>
            {this.state.monthlyBenefit[i + 1]}
            <button
              onClick={() => this.fetchBenefit(i+1)}
              className="btn query btn-primary"
            >
              Query
            </button>
          </td>
          <td>john@example.com</td>
          <td>john@example.com</td>
          <td> <button className="btn query btn-primary">WITHDRAW</button> </td>
        </tr>
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
                    <p>Staking plan Id: {this.state.staking[2] ? this.state.staking[2].toNumber() : null} ({this.state.staking[2] && this.state.staking[2].eq(1) ? '2 Year' : '1 Year'})</p>
                    <p>Status: {this.state.staking[3] ? this.state.staking[3].toNumber() : null}</p>
                    {/*<p>Accrued amount: {this.state.staking[4] ? ethers.utils.formatEther(this.state.staking[4]) : null}</p>*/}
                    {this.state.staking[3] && this.state.staking[3].eq(2) ? <p>Loan id: {this.state.staking[5] ? this.state.staking[5].toNumber() : null}</p> : null}
                    {console.log(this.props)}
                    <button onClick={()=>this.props.history.push(`${this.props.match.url}/nominees`)}>View Nominees</button>

                    <br />
                    <br />

                    <button onClick={this.withdrawStaking} disabled={!this.state.canWithdraw && this.state.withdrawing}>{this.state.canWithdraw ? (this.state.withdrawing ? 'Withdrawing...' : 'Withdraw') : 'Cannot withdraw before end of period'}</button>

                      {
                        this.state.errorMessage
                        ? <div><br />
                        <p>Error from Blockchain: {this.state.errorMessage}</p></div>
                        : null
                      }

                      <table className="table table-striped" border="1">
                          <thead>
                            <tr>
                              <th>Month ID</th>
                              <th>Total Benefit</th>
                              <th>Liquid Benefit</th>
                              <th>Reward Benefit</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>

                              {monthsTableRows}

                          </tbody>
                        </table>


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
