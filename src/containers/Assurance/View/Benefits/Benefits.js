import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button,Table } from 'react-bootstrap';
import Layout from '../../../Layout/Layout';
import '../../Assurance.css';

const ethers = require('ethers');

class Benefits extends Component {
  state = {
    benefitPeriodYears: null,
    monthlyBenefitAmountArray: [],
    depositStatusArray: []
  };

  componentDidMount = async() => {
    const sip = await this.props.store.sipInstance.functions.sips(
      this.props.store.walletInstance.address,
      this.props.match.params.id
    );
    const sipPlan = await this.props.store.sipInstance.functions.sipPlans(sip.planId);

    const monthlyBenefitAmountPromiseArray = []
    , depositDoneStatusPromiseArray = [];

    for(let i = 1; i <= sipPlan.accumulationPeriodMonths; i++) {
      monthlyBenefitAmountPromiseArray.push(
        this.props.store.sipInstance.functions.viewMonthlyBenefitAmount(
          this.props.store.walletInstance.address,
          this.props.match.params.id,
          i
        )
      );
      depositDoneStatusPromiseArray.push(
        this.props.store.sipInstance.functions.getDepositDoneStatus(
          this.props.store.walletInstance.address,
          this.props.match.params.id,
          i
        )
      );
    }

    await Promise.all([...monthlyBenefitAmountPromiseArray, ...depositDoneStatusPromiseArray]);

    const monthlyBenefitAmountArray = []
    , depositStatusArray = [];

    for(let i = 0; i < sipPlan.accumulationPeriodMonths; i++) {
      monthlyBenefitAmountArray.push(await monthlyBenefitAmountPromiseArray[i]);
      depositStatusArray.push(await depositDoneStatusPromiseArray[i]);
    }

    this.setState({
      monthlyBenefitAmountArray,
      depositStatusArray,

    });
  }
  render = () => {
    const benefitTableElementArray = [];

    for(let i = 0; i < 108; i++) {
      benefitTableElementArray.push(
        <tr>
          <td>{i+1}</td>
          <td>{this.state.monthlyBenefitAmountArray[i%12] ? ethers.utils.formatEther(this.state.monthlyBenefitAmountArray[i%12]) + ' ES' : 'Loading...'}</td>
          <td><Button disabled>Select</Button></td>
        </tr>
      );
      if((i+1)%36===0) {
        benefitTableElementArray.push(
          <tr style={{backgroundColor:'#aaa'}}>
            <td>Power Booster {Math.ceil(i/36)}</td>
            <td></td>
            <td><Button disabled>Select</Button></td>
          </tr>
        );
      }
    }

    return (
      <Layout
          breadcrumb={['Home', 'Assurance','View', this.props.match.params.id, 'Benefits']}
          title={this.props.match.params.id}>
          <p>This page is under construction. On this page user can see their monthly benefits in advance and withdraw them after the withdraw window is open for the month.</p>
          <Table responsive>
          <thead>
            <tr>
              <th>Month Number</th>
              <th>Benefit Amount</th>
              <th>Click on buttons to Select</th>
            </tr>
          </thead>
          <tbody>
            {benefitTableElementArray}
          </tbody>
        </Table>

      <div className="details">
          <Button disabled>Withdraw</Button>
      </div>

      </Layout>

    );
  }
}

export default connect(state => {return{store: state}})(Benefits);
