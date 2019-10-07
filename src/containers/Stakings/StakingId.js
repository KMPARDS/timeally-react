import React, { Component } from 'react';
import { connect } from 'react-redux';
import TransactionModal from '../TransactionModal/TransactionModal';

import { Spinner, Button } from 'react-bootstrap';

const ethers = require('ethers');

class StakingId extends Component {
  state = {
    loading: true,
    staking: {},
    currentMonth: 0,
    canWithdraw: false,
    withdrawing: false,
    errorMessage: '',
    stakingMonth: 0,
    planMonths: 0,
    stakingEndTime: 0,
    monthlyBenefits: {},
    monthlyBenefitSpinner: {},
    selectedMonths: {},
    selectedMonthsUpdated: true,
    selectedQuerySpinner: false,
    selectedMonthsBenefit: '',
    showWithdrawTransactionModal: false,
    withdrawSpinner: false
  };

  componentDidMount = async () => {
    window.x = window.reduxStore.getState();
    const currentMonth = Number(await this.props.store.timeallyInstance.functions.getCurrentMonth());
    this.setState({ currentMonth });
    if(this.props.store.walletInstance.address && this.props.match.params.id) {
      const staking = await this.props.store.timeallyInstance.functions.stakings(
        this.props.store.walletInstance.address,
        Number(this.props.match.params.id)
      );
      console.log(staking);
      const stakingPlan = await this.props.store.timeallyInstance.functions.stakingPlans(
        staking.stakingPlanId
      );
      this.setState({ staking, stakingMonth: Number(staking[2]), planMonths: Number(stakingPlan[0]) });
      const currentMouTimestamp = (await this.props.store.esInstance.functions.mou()).toNumber();
      const stakingStartTime = this.state.staking[1].toNumber();
      const stakingEndTime = (this.state.staking[2].eq(1) ? 63244800 : 31622400) + stakingStartTime;
      const canWithdraw = currentMouTimestamp > stakingEndTime;

      console.log(canWithdraw, stakingEndTime, currentMouTimestamp);
      this.setState({ canWithdraw, stakingEndTime, loading: false });
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

  querySelected = async() => {
    this.setState({ selectedQuerySpinner: true });
    console.log('sd', this.displaySelectedArray);

    try {
      const monthlyBenefit = await this.props.store.timeallyInstance.functions.seeBenefitOfAStakingByMonths(
        this.props.store.walletInstance.address,
        this.props.match.params.id,
        this.displaySelectedArray
      );
      console.log(monthlyBenefit);
      let lessDecimals = ethers.utils.formatEther(monthlyBenefit).split('.');
      if(lessDecimals[1].length >= 2) {
        lessDecimals[1] = lessDecimals[1].slice(0,2);
      }
      this.setState({ selectedMonthsBenefit: lessDecimals.join('.'), selectedQuerySpinner: false, selectedMonthsUpdated: false });
    } catch (err) {
      console.log('error from bl chain', err.message);
      this.setState({ selectedQuerySpinner: false });
    }
  }

  withdrawStaking = async() => {
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
                        className="btn z-btn-outline"
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
              onClick={() => this.setState({ selectedMonthsUpdated: true, selectedMonths: {...this.state.selectedMonths, [i]: !this.state.selectedMonths[i]} })}
              className={`btn ${this.state.selectedMonths[i] ? 'z-btn-full' : 'z-btn-outline'}`}

            >
              {i > this.state.currentMonth ? 'Cannot Select' : (this.state.selectedMonths[i] ? 'Selected' : 'Select')}
            </button>
          </td>
        </tr>
      );
    }

    this.displaySelectedArray = Object.entries(this.state.selectedMonths).filter(entry => entry[1]).map(entry => entry[0]);

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
                        {this.state.loading
                          ? <p>Please wait loading staking details...</p>
                          : <><p style={{padding: '10px'}}>Please select months of which you want to withdraw your NRT benefits.</p>
                      <table className="table table-striped" border="1">
                          <thead>
                            <tr>
                              <th>NRT Month</th>
                              <th>Monthly Benefit</th>
                              {/*<th>Liquid Benefit</th>
                              <th>Reward Benefit</th>*/}
                              <th>Withdraw Benefits</th>
                            </tr>
                          </thead>
                          <tbody>

                              {monthsTableRows}

                          </tbody>
                        </table>

                      {this.displaySelectedArray.length
                        ? <div style={{backgroundColor: '#eee', padding: '1rem', borderRadius: '.25rem'}}>
                          <p>You have selected: {this.displaySelectedArray.join(', ')}</p>
                          {this.state.selectedMonthsBenefit && !this.state.selectedMonthsUpdated
                            ? <>
                              <p>{this.state.selectedMonthsBenefit} ES</p>
                              {this.state.selectedMonthsBenefit !== '0.0' ? <><p>Your benefits will be withdrawned 50% in liquid to your wallet, and 50% accruded as TimeAlly rewards.</p>
                              <Button onClick={() => this.setState({ showWithdrawTransactionModal: true })}>
                                Withdraw Benefit
                              </Button></> : null}
                            </>
                            : <Button
                                onClick={this.querySelected}
                                disabled={this.state.selectedQuerySpinner}
                              >
                                {this.state.selectedQuerySpinner
                                  ? <Spinner animation="border" /> : 'Query Total Benefit Withdrawl'
                                }
                              </Button>}
                        </div> : <p>You have not selected any month. To withdraw benefits, select one or more months.</p>}

                        <p>{this.state.canWithdraw ? 'You can withdraw.' : 'The staking period is not complete, so you will be able to withdraw after staking period completes at '+new Date(this.state.stakingEndTime * 1000)}</p>

                        <div style={{backgroundColor: '#eee', padding: '1rem', borderRadius: '.25rem', marginTop: '16px'}}>
                          TimeAlly Stakers can add nominees to their stakings. After one year of time period of staking, nominees get access to your benefits and principal amount of a particular staking. You can add multiple nominees with % share of the staking, and they would have access only upto their shares in your staking.<br /><br />
                          <Button onClick={() => this.props.history.push(this.props.match.url + '/nominees')}>
                            View Nominees of this stakings
                          </Button>
                        </div>
                        </>}
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TransactionModal
            show={this.state.showWithdrawTransactionModal}
            hideFunction={() => this.setState({
              showWithdrawTransactionModal: false,
              withdrawSpinner: false
            })}
            ethereum={{
              transactor: this.props.store.timeallyInstance.functions.withdrawBenefitOfAStakingByMonths,
              estimator: this.props.store.timeallyInstance.estimate.withdrawBenefitOfAStakingByMonths,
              contract: this.props.store.timeallyInstance,
              contractName: 'TimeAlly',
              arguments: [this.props.match.params.id, this.displaySelectedArray],
              ESAmount: '0.0',
              headingName: 'Withdraw Benefit',
              functionName: 'Withdraw Benefit',
              directGasScreen: true,
              continueFunction: txHash => this.setState({
                showWithdrawTransactionModal: false,
                withdrawSpinner: false
              })
            }}
          />
      </div>
    );
  }
}

export default connect(state => {return{store: state}})(StakingId);
