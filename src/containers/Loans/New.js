import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Form } from 'react-bootstrap';
import { timeally } from '../../env';
const ethers = require('ethers');

class Loan extends Component {
  state = {
    currentScreen: 0,
    stakings: [],
    selectedStakingIds: [],
    maxLoanAmount: '',
    loaningAmount: '',
    loanProcessing: false,
    errorMessage: ''
  }

  componentDidMount = async () => {
    const newStakingEventSig = ethers.utils.id("NewStaking(address,uint256,uint256,uint256)");
    const topics = [ newStakingEventSig, null, null, null ];

    const logs = await this.props.store.providerInstance.getLogs({
      address: timeally.address,
      fromBlock: 0,
      toBlock: 'latest',
      topics
    });

    const stakings = [];
    //for(let i = logs.length - 1; i >= 0; i--) {
    for(const log of logs) {
      //const log = logs[i];
      const address = log.topics[1].slice(0,2) + log.topics[1].slice(26,log.topics[1].length);
      const stakingId = Number(log.data.slice(66,130));
      const staking = await this.props.store.timeallyInstance.functions.viewStaking(address, stakingId);
      console.log(staking);
      stakings.push(
        <option value={stakingId}>
          {stakingId}) Stake Amount: {ethers.utils.formatEther(ethers.utils.bigNumberify(log.data.slice(0,66)))} | {new Date(staking[1].toNumber() * 1000).toLocaleString()}
        </option>
      );
    }
    this.setState({ stakings });
  };

  selectStakings = event => {
    console.log(event.target.value);
    const selectedStakingIds = [...this.state.selectedStakingIds];
    const index = selectedStakingIds.indexOf(event.target.value);
    if(index === -1) {
      selectedStakingIds.push(event.target.value);
    } else {
      selectedStakingIds.splice(index, 1);
    }
    this.setState({ selectedStakingIds });
  };

  seeHowMuchLoan = async () => {
    const args = [
      this.props.store.walletInstance.address,
      this.state.selectedStakingIds
    ];
    console.log(args);
    const maxLoanAmount = await this.props.store.timeallyInstance.functions.seeMaxLoaningAmountOnUserStakings(
      this.props.store.walletInstance.address,
      this.state.selectedStakingIds
    );
    console.log('max loan',ethers.utils.formatEther(maxLoanAmount));
    this.setState({ maxLoanAmount: ethers.utils.formatEther(maxLoanAmount), currentScreen: 1 });
  };

  takeLoan = async () => {
    this.setState({ loanProcessing: true });
    try {
      const tx = await this.props.store.timeallyInstance.takeLoanOnSelfStaking(
        0,
        ethers.utils.parseEther(this.state.loaningAmount),
        this.state.selectedStakingIds
      );
      await tx.wait();
    } catch (e) {
      this.setState({ errorMessage: e.message });
    }
    this.setState({ loanProcessing: false });
  }

  render() {
    let screen = (
      <Form>
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Select staking on which you want to take loan:</Form.Label>
          <Form.Control as="select" multiple onChange={this.selectStakings}>
            {this.state.stakings}
          </Form.Control>
        </Form.Group>
        {this.state.selectedStakingIds.length ? <div>Selected stakings: {this.state.selectedStakingIds.join(', ')}<br /><br /></div> : null}
        <Button variant="primary" onClick={this.seeHowMuchLoan}>See how much loan can be taken</Button>
      </Form>
    );

    if(this.state.currentScreen === 1) {
      screen = (
        <div>
          <p>You can take loan of {this.state.maxLoanAmount} ES currently</p>
          <input type="text" placeholder="Enter amount to loan" onKeyUp={ e => this.setState({ loaningAmount: e.target.value }) } /><br/>
          <select>
            <option value="0">2 months with 1%</option>
          </select><br/>
          {
            this.state.errorMessage
            ? <div><br />
            <p>Error from Blockchain: {this.state.errorMessage}</p></div>
            : null
          }
          <button onClick={this.takeLoan} disabled={this.state.loanProcessing}>{!this.state.loanProcessing ? 'Take Loan' : 'Please wait taking loan...'}</button>
        </div>
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
                        <li><a href="index.html">Home</a></li>
                        <li>Loans</li>
                        <li className="active">New</li>
                      </ol>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="bg-white pinside30">
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12">
                          <h1 className="page-title">New Loans</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
             <div className="wrapper-content bg-white pinside40">
                <div className="loan-eligibility-block">
                    <Card>
                        <Card.Body align="center">
                          <Card style={{margin: '15px 0', maxWidth: '500px'}}>
                            <Card.Body align="center">
                              { screen }
                            </Card.Body>
                          </Card>
                        </Card.Body>
                      </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default connect(state => {return{store: state}})(Loan);
