import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Form, Spinner, Alert } from 'react-bootstrap';
import Layout from '../Layout/Layout';
import TransactionModal from '../TransactionModal/TransactionModal';
import { timeally, network } from '../../env';
const ethers = require('ethers');

class Loan extends Component {
  state = {
    currentScreen: 0,
    stakings: [],
    selectedStakingIds: [],
    maxLoanAmount: '',
    loaningAmount: '',
    errorMessage: '',
    spinner: false,
    showTakeLoanTransactionModal: false
  }

  componentDidMount = async () => {
    const newStakingEventSig = ethers.utils.id("NewStaking(address,uint256,uint256,uint256)");
    const topics = [ newStakingEventSig, ethers.utils.hexZeroPad(this.props.store.walletInstance.address, 32), null, null ];

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
      const stakingId = Number('0x'+log.data.slice(66,130));
      console.log({address, stakingId});
      // const staking = await this.props.store.timeallyInstance.functions.stakings(address, stakingId);
      // console.log(staking);
      stakings.push(
        <StakingElement
          key={address+stakingId}
          store={this.props.store}
          address={address}
          stakingId={stakingId}
          stakeAmount={ethers.utils.formatEther(ethers.utils.bigNumberify(log.data.slice(0,66)))}
          selectStaking={this.selectStaking}
          />
      );
    }
    this.setState({ stakings });
  };

  selectStaking = stakingId => {
    // console.log(event.target.value);
    const selectedStakingIds = [...this.state.selectedStakingIds];
    const index = selectedStakingIds.indexOf(+stakingId);
    if(index === -1) {
      selectedStakingIds.push(+stakingId);
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
      this.state.selectedStakingIds,
      0
    );
    console.log('max loan',ethers.utils.formatEther(maxLoanAmount));
    this.setState({ maxLoanAmount: ethers.utils.formatEther(maxLoanAmount), currentScreen: 1 });
  };

  // takeLoan = async () => {
  //   this.setState({ loanProcessing: true });
  //   try {
  //     const tx = await this.props.store.timeallyInstance.takeLoanOnSelfStaking(
  //       0,
  //       ethers.utils.parseEther(this.state.loaningAmount),
  //       this.state.selectedStakingIds
  //     );
  //     await tx.wait();
  //   } catch (e) {
  //     this.setState({ errorMessage: e.message });
  //   }
  //   this.setState({ loanProcessing: false });
  // }

  render() {
    const startOverAgainButton = (
      <span style={{display:'block', textAlign:'left', cursor: 'pointer'}} onClick={() => this.setState({ currentScreen: 0 })}>{'<'}Start All Over</span>
    );

    let screen = (
      <Form>
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Select staking on which you want to take loan:</Form.Label>
          <Card>
            {this.state.stakings}
          </Card>
        </Form.Group>
        {this.state.selectedStakingIds.length ? <div>Selected stakings: {this.state.selectedStakingIds.join(', ')}<br /><br /></div> : null}
        <Button variant="primary"
          onClick={this.seeHowMuchLoan}
          disabled={this.state.spinner}
        >
        {this.state.spinner ?
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          style={{marginRight: '2px'}}
        /> : null}
        {this.state.spinner ? <>Please wait checking...</> : <>See how much loan can be taken</>}</Button>
      </Form>
    );

    if(this.state.currentScreen === 1) {
      screen = (
        <div>
          {startOverAgainButton}
          <p>You can take loan of {this.state.maxLoanAmount} ES currently</p>
          <input className="form-control input-md" type="number" placeholder="Enter amount to loan" onKeyUp={ e => this.setState({ loaningAmount: e.target.value }) } /><br/>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control as="select" onChange={this.onPlanChange}>
                <option value="0">2 months with 1%</option>
                </Form.Control>
              </Form.Group>
          {/* <select>
            <option value="0">2 months with 1%</option>
          </select> */}
          <br/>
          {
            this.state.errorMessage
            ? <div><br />
            <p>Error from Blockchain: {this.state.errorMessage}</p></div>
            : null
          }
          <Button
            onClick={() => this.setState({ showTakeLoanTransactionModal: true })}
            disabled={this.state.spinner}>
            {this.state.spinner ?
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              style={{marginRight: '2px'}}
            /> : null}
            {this.state.spinner ? <>Please wait...</> : <>Take Loan</>}
          </Button>
        </div>
      );
    } else if(this.state.currentScreen === 2) {
      screen = (
        <Card>
          <div className="custom-width" style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', padding:'20px 40px', margin: '15px auto'}}>
            <h3 style={{marginBottom: '15px'}}>Loan confirmed!</h3>
            <Alert variant="success">Your Loan is confirmed. You can view your transaction on <a style={{color: 'black'}} href={`https://${network === 'homestead' ? '' : 'kovan.'}etherscan.io/tx/${this.state.txHash}`} target="_blank" rel="noopener noreferrer">EtherScan</a></Alert>
            <Button onClick={() => this.props.history.push('/loans/view')}>Go to View Loans</Button>
          </div>
        </Card>
      );
    }

    return (
      <>
        <Layout
          breadcrumb={['Home', 'Loans', 'New']}
          title="New TimeAlly Loan"
        >
          { screen }
        </Layout>
        <TransactionModal
            show={this.state.showTakeLoanTransactionModal}
            hideFunction={() => this.setState({ showTakeLoanTransactionModal: false, spinner: false })}
            ethereum={{
              transactor: this.props.store.timeallyInstance.functions.takeLoanOnSelfStaking,
              estimator: this.props.store.timeallyInstance.estimate.takeLoanOnSelfStaking,
              contract: this.props.store.timeallyInstance,
              contractName: 'TimeAlly',
              arguments: [
                0,
                ethers.utils.parseEther(this.state.loaningAmount || '0'),
                this.state.selectedStakingIds
              ],
              ESAmount: '0.0',
              headingName: 'Take Loan',
              functionName: 'Take Loan',
              // stakingPlan: this.state.plan,
              directGasScreen: true,
              continueFunction: txHash => this.setState({
                spinner: false,
                currentScreen: 2,
                showTakeLoanTransactionModal: false,
                txHash
              })
            }}
          />
        </>
    );
  }
}

class StakingElement extends Component {
  state = {
    staking: null,
    selected: false
  };

  componentDidMount = async() => {
    const staking = await this.props.store.timeallyInstance.functions.stakings(this.props.address, this.props.stakingId);
    this.setState({ staking })
  };

  render = () => (
    <Card style={{margin: '.2rem', textAlign:'left', cursor:'pointer', backgroundColor: this.state.selected ? '#0002' : undefined}} onClick={() => {
      this.props.selectStaking(this.props.stakingId);
      this.setState({ selected: !this.state.selected });
    }}>
      StakingId: {this.props.stakingId}) Stake Amount: {this.props.stakeAmount} | {this.state.staking
        ? new Date(this.state.staking[1].toNumber() * 1000).toLocaleString() : 'Loading staking time...'}
    </Card>
  );
}

export default connect(state => {return{store: state}})(Loan);
