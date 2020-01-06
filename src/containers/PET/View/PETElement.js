import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { network } from '../../../env';

const ethers = require('ethers');

class PETElement extends Component {
  state = {
    stakingTime: 'Loading...',
    currentTime: Math.floor(Date.now()/1000)
  };

  componentDidMount = async() => {
    const currentTime = network === 'homestead' ? Math.floor(Date.now() / 1000) : (await this.props.store.esInstance.functions.mou()).toNumber();

    const pet = await this.props.store.petInstance.functions.pets(
      this.props.store.walletInstance.address,
      this.props.petId
    );
    console.log(pet);
    const stakingTime = new Date(pet.initTimestamp.toNumber() * 1000).toLocaleString();
    const petPlan = await this.props.store.petInstance.functions.petPlans(pet.planId);
    console.log(petPlan);
    const minimumMonthlyCommitmentAmount = petPlan.minimumMonthlyCommitmentAmount;
    const monthlyBenefitFactorPerThousand = petPlan.monthlyBenefitFactorPerThousand;
    const petPlanName = `${ethers.utils.formatEther(minimumMonthlyCommitmentAmount.mul(2))} ES / ${monthlyBenefitFactorPerThousand.toNumber()/10}%`;
    const nextWithdrawTimestamp = pet.initTimestamp.toNumber() + 12*2629744;
    let nextDepositTimestamp = pet.initTimestamp.toNumber();
    let i = 0;
    while(nextDepositTimestamp < currentTime) {
      nextDepositTimestamp += 2629744;
    }
    // 2629744
    this.setState({ stakingTime, petPlanName, nextDepositTimestamp, nextWithdrawTimestamp });

    this.intervalId = setInterval(() => {
      this.setState({ currentTime: this.state.currentTime + 1 });
    },1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.intervalId);
  }

  render = () => {

    return (
      <tr>
        <td>{this.props.petId}</td>
        <td>{this.state.stakingTime}</td>
        <td>{this.state.petPlanName}</td>
        <td>{this.state.nextDepositTimestamp ? window.getTimeRemaining(this.state.nextDepositTimestamp - this.state.currentTime) : 'Calculating...'}</td>
        <td>{this.state.nextWithdrawTimestamp ? window.getTimeRemaining(this.state.nextWithdrawTimestamp - this.state.currentTime) : 'Calculating...'}</td>
        <td><Button onClick={this.props.onClick}>View PET</Button></td>
      </tr>
    );
  }
}

export default connect(state => {return{store: state}})(PETElement);
