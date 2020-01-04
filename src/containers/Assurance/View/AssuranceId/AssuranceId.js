import React, { Component } from 'react';
import { Button,Table } from 'react-bootstrap';
import { connect } from 'react-redux';

import Layout from '../../../Layout/Layout';
import DepositElement from './DepositElement';
import '../../Assurance.css';

const ethers = require('ethers');

class AssuranceId extends Component {
  state = {
    months: [],
    loading: true,
  };

  componentDidMount = async() => {
    const sip = await this.props.store.sipInstance.functions.sips(
      this.props.store.walletInstance.address,
      this.props.match.params.id
    );
    const sipPlan = await this.props.store.sipInstance.functions.sipPlans(sip.planId);
    const accumulationPeriodMonths = sipPlan.accumulationPeriodMonths.toNumber();

    const months = [];
    for(let i = 1; i <= accumulationPeriodMonths; i++) {
      months.push({
        number: i,
        depositAmount: null,
        status: null,
        stakingTimestamp: sip.stakingTimestamp.toNumber()
      });
    }

    const newDepositSig = ethers.utils.id('NewDeposit(address,uint256,uint256,uint256,uint256,address)');

    const topics = [
      newDepositSig,
      ethers.utils.hexZeroPad(this.props.store.walletInstance.address, 32),
      ethers.utils.hexZeroPad('0x'+Number(this.props.match.params.id).toString(16), 32)
    ];

    const logs = await this.props.store.providerInstance.getLogs({
      address: this.props.store.sipInstance.address,
      fromBlock: 0,
      toBlock: 'latest',
      topics
    });

    console.log('deposits logs', logs);

    logs.forEach(log => {
      const month = Number(window.sliceDataTo32Bytes(log.data,0));
      months[month - 1].depositAmount = ethers.utils.formatEther(ethers.utils.bigNumberify(window.sliceDataTo32Bytes(log.data,1)));
    });

    this.setState({ months });
  }

  render = () => (
    <Layout
      breadcrumb={['Home', 'Assurance','View']}
      title={`SIP ID: ${this.props.match.params.id}`}>
      {this.state.months.length ? <>
        <Table responsive>
          <thead>
            <tr>
              <th>Deposit Month</th>
              <th>Deposit Amounts</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.months.map(month => (
              <DepositElement
                sipId={this.props.match.params.id}
                monthId={month.number}
                depositAmount={month.depositAmount}
                status={month.status}
                stakingTimestamp={month.stakingTimestamp}
                history={this.props.history}
                location={this.props.location}
              />
            ))}
          </tbody>
        </Table>
        <p>Grace penalty is 1% per graced months on Power Booster. Default penalty is 2% per defaulted months on Power Booster.</p>
        <div className="details">
          <Button onClick={() => this.props.history.push(`/assurance/view/${this.props.match.params.id}/benefits`)}>Benefit Page</Button>
        </div>

        <div className="details">
          <Button onClick={() => this.props.history.push(`/assurance/view/${this.props.match.params.id}/nominees`)}>Nominee Page</Button>
        </div>
      </> : (
        this.state.loading
        ? <p>Please wait loading...</p>
        : <p>There is nothing to show.</p>
      )}
    </Layout>

    );
}

export default connect(state => {return{store: state}})(AssuranceId);
