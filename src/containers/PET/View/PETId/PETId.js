import React, { Component } from 'react';
import { Button,Table } from 'react-bootstrap';
import { connect } from 'react-redux';

import Layout from '../../../Layout/Layout';
// import DepositElement from './DepositElement';
import '../../PET.css';

const ethers = require('ethers');

class PETId extends Component {
  state = {
    months: [],
    loading: true,
  };

  componentDidMount = async() => {
    const pet = await this.props.store.petInstance.functions.pets(
      // this.props.store.walletInstance.address,
      '0xC8e1F3B9a0CdFceF9fFd2343B943989A22517b26',
      this.props.match.params.id
    );
    const petPlan = await this.props.store.petInstance.functions.petPlans(pet.planId);

    const months = [];
    for(let i = 1; i <= 12; i++) {
      months.push([]);
    }

    const newDepositSig = ethers.utils.id('NewDeposit(address,uint256,uint256,uint256,uint256,address)');

    const topics = [
      newDepositSig,
      ethers.utils.hexZeroPad(this.props.store.walletInstance.address, 32),
      ethers.utils.hexZeroPad('0x'+Number(this.props.match.params.id).toString(16), 32)
    ];

    const logs = await this.props.store.providerInstance.getLogs({
      address: this.props.store.petInstance.address,
      fromBlock: 0,
      toBlock: 'latest',
      topics
    });

    console.log('deposits logs', logs);

    logs.forEach(log => {
      const month = Number(window.sliceDataTo32Bytes(log.data,0));
      months[month - 1].push(
        // ethers.utils.formatEther(
          ethers.utils.bigNumberify(window.sliceDataTo32Bytes(log.data,1))
        // )
      );
    });

    this.setState({
      months,
      commitmentAmount: petPlan.minimumMonthlyCommitmentAmount,
      initTimestamp: pet.initTimestamp.toNumber()
    });
  }

  render = () => (
    <Layout
      breadcrumb={['Home', 'PET','View']}
      title={`PET ID: ${this.props.match.params.id}`}>
      {this.state.months.length ? <>
        <p>On this page you can see your deposits on your PET.</p>
        <Table responsive>
          <thead>
            <tr>
              <th>Deposit Month</th>
              <th>User Deposit Amount</th>
              <th>PET's Deposit</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.months.map((depositArray, index) => {
              const monthId = index+1;
              let depositAmount = ethers.constants.Zero;
              depositArray.forEach(amount => depositAmount = depositAmount.add(amount));
              let status = '';
              const petArray = [];
              if(depositAmount.gte(this.state.commitmentAmount)) {
                petArray.push(this.state.commitmentAmount);

                const topUp = depositAmount.sub(this.state.commitmentAmount);
                petArray.push(topUp.div(2));
              } else if(depositAmount.gte(this.state.commitmentAmount.div(2))) {
                petArray.push(depositAmount);
              }
              let petAmount = ethers.constants.Zero;
              petArray.forEach(amount => petAmount = petAmount.add(amount));

              const MONTH_LENGTH = 2629744;
              const windowOpenUntil = this.state.initTimestamp + 2629744 * monthId;
              const currentTimestamp = Math.floor(Date.now() / 1000);

              return (
                <tr>
                  <td>{monthId}</td>
                  <td>{depositArray.map(amount => ethers.utils.formatEther(amount)+' ES').join(' + ')}{depositArray.length > 1
                    ? <> = {ethers.utils.formatEther(depositAmount)} ES</>
                    : null}
                    {depositArray.length > 0
                      ? <>{windowOpenUntil - currentTimestamp > MONTH_LENGTH
                        ? <>Window not yet open</>
                        : windowOpenUntil - currentTimestamp > 0
                          ? <>Pet can deposit on your deposit</>
                          : <>Pet cannot deposit as your window is closed</>
                        }</>
                      : null}
                      {0 < windowOpenUntil - currentTimestamp && windowOpenUntil - currentTimestamp < MONTH_LENGTH ? <><br /><Button onClick={() => this.props.history.push(this.props.location.pathname+'/deposit/')}>Deposit</Button></>:null}
                    </td>
                  <td>{petArray[0]
                    ? <>{ethers.utils.formatEther(petArray[0])} ES (for acheiving commitment of {ethers.utils.formatEther(this.state.commitmentAmount)} ES){petArray[1]
                      ? <> and {ethers.utils.formatEther(petArray[1])} ES (for topup of {ethers.utils.formatEther(depositAmount.sub(this.state.commitmentAmount))} ES)</>
                      :null}</>
                    : <>{windowOpenUntil - currentTimestamp > MONTH_LENGTH
                      ? <>Window not yet open</>
                      : windowOpenUntil - currentTimestamp > 0
                        ? <>Pet can deposit on your deposit</>
                        : <>Pet cannot deposit as your window is closed</>
                      }</>}
                  </td>
                  <td>{ }</td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <div style={{backgroundColor: '#eee', padding: '1rem', borderRadius: '.25rem', margin: '16px 0'}}>
          <p>To make a deposit for the current month in your PET you can click the below button.</p>
          <Button onClick={() => this.props.history.push(`/pet/view/${this.props.match.params.id}/deposit`)}>Make a Deposit</Button>
        </div>

        <div className="details">
          <Button onClick={() => this.props.history.push(`/pet/view/${this.props.match.params.id}/benefits`)}>Benefit Page</Button>
        </div>

        <div className="details">
          <Button onClick={() => this.props.history.push(`/pet/view/${this.props.match.params.id}/nominees`)}>Nominee Page</Button>
        </div>
      </> : (
        this.state.loading
        ? <p>Please wait loading...</p>
        : <p>There is nothing to show.</p>
      )}
    </Layout>

    );
}

export default connect(state => {return{store: state}})(PETId);
