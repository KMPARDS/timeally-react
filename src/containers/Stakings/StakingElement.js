import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import TransactionModal from '../TransactionModal/TransactionModal';
const ethers = require('ethers');

/// @props address - address of user
/// @props stakingId - staking id of the user address
class StakingElement extends Component {
  state = {
    nextBenefitTime: null,
    stakingDetails: null,
    intervalId: null,
    benefitSpinner: false,
    benefitAmount: null,
    showWithdrawTransactionModal: false
  };

  componentDidMount = async() => {
    const stakingDetails = await this.props.store.timeallyInstance.functions.stakings(this.props.address, this.props.stakingId);

    let currentTime;
    try {
      currentTime = (await this.props.store.esInstance.functions.mou()).toNumber();
    } catch (e) {
      currentTime = Math.floor(Date.now()/1000);
    }

    const stakingTimestamp = stakingDetails[1].toNumber();
    let nextBenefitTime = 0;
    let factor = 0;
    while(!(nextBenefitTime > 0)) {
      nextBenefitTime = (stakingTimestamp + 2629744 * factor++) - currentTime;
    }

    const intervalId = setInterval(() => this.setState({ nextBenefitTime: this.state.nextBenefitTime-1 }), 1000);

    await this.setState({ stakingDetails, nextBenefitTime, intervalId });
  };

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  };

  query = async() => {
    this.setState({ benefitSpinner: true });

    const currentMonth = await this.props.store.timeallyInstance.functions.getCurrentMonth();
    const stakingMonth = Number(this.state.stakingDetails[2]);
    const stakingPlanId = this.state.stakingDetails[3];
    const stakingPlan = await this.props.store.timeallyInstance.functions.stakingPlans(stakingPlanId);
    const monthsOfStaking = Number(stakingPlan[0]);
    const months = [];
    for(let i = stakingMonth + 1; i <= currentMonth; i++) {
      months.push(i);
    }
    console.log('seeing months', months);

    try {
      const output = await this.props.store.timeallyInstance.functions.seeBenefitOfAStakingByMonths(
        this.props.store.walletInstance.address,
        this.props.stakingId,
        months
      );
      console.log(output);
      let lessDecimals = ethers.utils.formatEther(output).split('.');
      if(lessDecimals[1].length >= 2) {
        lessDecimals[1] = lessDecimals[1].slice(0,2);
      }
      const benefitAmount = lessDecimals.join('.');
      this.setState({ benefitAmount, withdrawMonths: months, benefitSpinner: false });
    } catch (err) {
      console.log('error from bl chain', err.message);
      this.setState({ benefitSpinner: false });
    }
  }

  withdraw = async() => {
    this.setState({ showWithdrawTransactionModal: true });
  }

  render = () => {
    const days = Math.floor(this.state.nextBenefitTime/60/60/24);
    const hours = Math.floor((this.state.nextBenefitTime - days * 60 * 60 * 24) / 60 / 60);
    const minutes = Math.floor((this.state.nextBenefitTime - days * 60 * 60 * 24 - hours * 60 * 60) / 60);
    const seconds = this.state.nextBenefitTime - days * 60 * 60 * 24 - hours * 60 * 60 - minutes * 60;
    return (
    <tr>
      <td>{this.props.stakingId}</td>
      <td>{this.state.stakingDetails ? ethers.utils.formatEther(this.state.stakingDetails[0]) : 'Loading...'} ES</td>
      <td>{this.state.stakingDetails ? (this.state.stakingDetails[3].toNumber() ? '2 Year' : '1 Year') : 'Loading...'}</td>
      <td>{this.state.stakingDetails ? new Date(this.state.stakingDetails[1].toNumber() * 1000).toLocaleString() : 'Loading...'}</td>
      <td>{days ? `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds` : 'Calculating...'}</td>
      <td>{
          this.state.benefitAmount
            ? (
              <>
                {this.state.benefitAmount + ' ES'}
                <button
                  className="btn query btn-outline-primary"
                  onClick={this.withdraw}
                  disabled={this.state.withdrawSpinner !== undefined || this.state.benefits === '0.0'}
                >
                  {
                    this.state.withdrawSpinner === undefined
                    ? 'Withdraw'
                    : (
                      this.state.withdrawSpinner === 1
                      ? 'Preparing tx...'
                      : (
                        this.state.withdrawSpinner === 2
                        ? 'Sending tx...'
                        : (
                          this.state.withdrawSpinner === 3
                          ? 'Waiting for confirmation...'
                          : (
                            this.state.withdrawSpinner === 4
                            ? 'Withdrawl Success! Sent 50% to wallet and 50% to rewards'
                            : 'Error: see it in console'
                          )
                        )
                      )
                    )
                  }
                </button>
              </>

            )
            : (
              this.state.benefitSpinner
              ? <Spinner animation="border" />
              : <button className="btn query btn-primary" onClick={this.query}>Query</button>
            )
          }
      </td>
      <td><button onClick={() => this.props.history.push('/stakings/'+ this.props.stakingId)} className="btn query btn-primary">View Staking</button></td>
      {/*<td><button className="btn query btn-primary">WITHDRAW</button></td>*/}

      <TransactionModal
          show={this.state.showWithdrawTransactionModal}
          hideFunction={() => this.setState({ showWithdrawTransactionModal: false, spinner: false })}
          ethereum={{
            transactor: this.props.store.timeallyInstance.functions.withdrawBenefitOfAStakingByMonths,
            estimator: this.props.store.timeallyInstance.estimate.withdrawBenefitOfAStakingByMonths,
            contract: this.props.store.timeallyInstance,
            contractName: 'TimeAlly',
            arguments: [this.props.stakingId, this.state.withdrawMonths],
            ESAmount: '0.0',
            headingName: 'Withdraw Benefit',
            functionName: 'Withdraw Benefit',
            directGasScreen: true,
            continueFunction: txHash => this.setState({
              benefitAmount: '0.0',
              showWithdrawTransactionModal: false,
            })
          }}
        />
    </tr>
  );
  };
}

export default connect(state => {return{store: state}})(StakingElement);
