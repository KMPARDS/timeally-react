import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class SIPElement extends Component {
  state = {
    stakingTime: 'Loading...',
    currentTime: Math.floor(Date.now()/1000)
  };

  componentDidMount = async() => {
    const sip = await this.props.store.sipInstance.functions.sips(
      this.props.store.walletInstance.address,
      this.props.sipId
    );
    console.log(sip);
    const stakingTime = new Date(sip.stakingTimestamp.toNumber() * 1000).toLocaleString();
    const sipPlan = await this.props.store.sipInstance.functions.sipPlans(sip.planId);
    console.log(sipPlan);
    const accumulationPeriodMonths = sipPlan.accumulationPeriodMonths.toNumber();
    const benefitPeriodYears = sipPlan.benefitPeriodYears.toNumber();
    const gracePeriodSeconds = sipPlan.gracePeriodSeconds.toNumber();
    const sipPlanName = `${accumulationPeriodMonths} Months / ${benefitPeriodYears} Years`;
    const nextWithdrawTimestamp = sip.stakingTimestamp.toNumber() + accumulationPeriodMonths*2629744;
    let nextDepositTimestamp = sip.stakingTimestamp.toNumber();
    let i = 0;
    while(nextDepositTimestamp < Math.floor(Date.now()/1000)) {
      nextDepositTimestamp += 2629744;
    }
    // 2629744
    this.setState({ stakingTime, sipPlanName, nextDepositTimestamp, nextWithdrawTimestamp });

    this.intervalId = setInterval(() => {
      this.setState({ currentTime: Math.floor(Date.now()/1000) });
    },1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.intervalId);
  }

  render = () => {

    return (
      <tr>
        <td>{this.props.sipId}</td>
        <td>{this.state.stakingTime}</td>
        <td>{this.state.sipPlanName}</td>
        <td>{this.props.monthlyCommitmentAmount} ES</td>
        <td>{this.state.nextDepositTimestamp ? window.getTimeRemaining(this.state.nextDepositTimestamp - this.state.currentTime) : 'Calculating...'}</td>
        <td>{this.state.nextWithdrawTimestamp ? window.getTimeRemaining(this.state.nextWithdrawTimestamp - this.state.currentTime) : 'Calculating...'}</td>
        <td><Button onClick={this.props.onClick}>View SIP</Button></td>
      </tr>
    );
  }
}

export default connect(state => {return{store: state}})(SIPElement);
