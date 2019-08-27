import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Spinner } from 'react-bootstrap';

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
    monthlyBenefits: {},
    monthlyBenefitSpinner: {},
    selectedMonths: []
  };

  componentDidMount = async () => {
    const currentMonth = Number(await this.props.store.timeallyInstance.functions.getCurrentMonth());
    this.setState({ currentMonth });

    if(this.props.store.walletInstance.address && this.props.match.params.id) {
      const staking = await this.props.store.timeallyInstance.functions.stakings(
        this.props.store.walletInstance.address,
        this.props.match.params.id
      );
      console.log(staking);
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

  query = async month => {
    (()=>{
      const monthlyBenefitSpinner = {...this.state.monthlyBenefitSpinner};
      monthlyBenefitSpinner[month] = true;
      this.setState({ monthlyBenefitSpinner });
    })();

    console.log('month', month);
    const monthlyBenefits = {...this.state.monthlyBenefits};

    try {
      const monthlyBenefit = await this.props.store.timeallyInstance.functions.seeBenefitOfAStakingByMonths(
        this.props.store.walletInstance.address,
        this.props.match.params.id,
        [month]
      );
      console.log(monthlyBenefit);
      let lessDecimals = ethers.utils.formatEther(monthlyBenefit).split('.');
      if(lessDecimals[1].length >= 2) {
        lessDecimals[1] = lessDecimals[1].slice(0,2);
      }
      monthlyBenefits[month] = lessDecimals.join('.');
    } catch (err) {
      console.log('error from bl chain', err.message);
    }

    (()=>{
      const monthlyBenefitSpinner = {...this.state.monthlyBenefitSpinner};
      monthlyBenefitSpinner[month] = false;
      this.setState({ monthlyBenefitSpinner, monthlyBenefits });
    })();

  };



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

    for(let i = this.state.stakingMonth + 1; i <= this.state.stakingMonth + this.state.planMonths; i++) {
      // if(i > this.state.currentMonth) show grey
      monthsTableRows.push(
        <tr key={'month-'+i}>
          <td>{i}</td>
          <td>

            {
                this.state.monthlyBenefits[i]
                  ? this.state.monthlyBenefits[i] + ' ES'
                  : (
                    this.state.monthlyBenefitSpinner[i]
                    ? <Spinner animation="border" />
                    : <button
                        disabled={i > this.state.currentMonth}
                        onClick={() => this.query(i)}
                        className="btn query btn-outline-primary"
                      >
                        {i > this.state.currentMonth ? 'Cannot Query as NRT not released' : 'Query'}
                      </button>
                  )
                }



          </td>
          {/*<td></td>
          <td></td>*/}
          <td>
            <button
              disabled={i > this.state.currentMonth}
              className="btn query btn-outline-primary"

            >
              {i > this.state.currentMonth ? 'Cannot Select' : 'Select'}
            </button>
          </td>
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
                        <p>This page is under construction. You will be able to view your stakings benefits here, claim your staking monthly received benefits in liquid and rewards and withdraw your staking's principal amount once the plan period is over.</p>
                        {/* <>
                    <p>Staking amount: {this.state.staking[0] ? ethers.utils.formatEther(this.state.staking[0]) : null}</p>
                    <p>Staking time: {new Date(this.state.staking[1] * 1000).toLocaleString()}</p>
                    <p>Staking plan Id: {this.state.staking[2] ? this.state.staking[2].toNumber() : null} ({this.state.staking[2] && this.state.staking[2].eq(1) ? '2 Year' : '1 Year'})</p>
                    <p>Status: {this.state.staking[3] ? this.state.staking[3].toNumber() : null}</p>
                    
                    {this.state.staking[3] && this.state.staking[3].eq(2) ? <p>Loan id: {this.state.staking[5] ? this.state.staking[5].toNumber() : null}</p> : null}
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

                      </> */}
                      <table className="table table-striped" border="1">
                          <thead>
                            <tr>
                              <th>NRT Month</th>
                              <th>Monthly Benefit</th>
                              {/*<th>Liquid Benefit</th>
                              <th>Reward Benefit</th>*/}
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
