import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Form, Spinner, Alert } from 'react-bootstrap';
import Layout from '../Layout/Layout';
import TransactionModal from '../TransactionModal/TransactionModal';
import { timeally, network } from '../../env';
const ethers = require('ethers');

class Repay extends Component {
  state = {
    currentScreen: 0,
    errorMessage: '',
    spinner: false,
    loanObj: null,
    allowance: null,
    showApproveTransactionModal: false,
    showRepayTransactionModal: false,
    txHash: null
  }

  componentDidMount = async() => {
    (async() => {
      const loanObj = await this.props.store.timeallyInstance.functions.loans(this.props.store.walletInstance.address, this.props.match.params.id);

      this.setState({ loanObj });
    })();

    (async() => {
      const allowance = await this.props.store.esInstance.functions.allowance(
        this.props.store.walletInstance.address,
        this.props.store.timeallyInstance.address
      );

      this.setState({ allowance });
    })();
  };

  render() {
    const amount = this.state.loanObj ? ethers.utils.formatEther(this.state.loanObj.exaEsAmount) : null;

    const startOverAgainButton = (
      <span style={{display:'block', textAlign:'left', cursor: 'pointer'}} onClick={() => this.setState({ currentScreen: 0 })}>{'<'}Start All Over</span>
    );

    let screen = (
      <div>
        <p>To repay your loan, you need <strong>{
          amount
          ? <>{amount} ES</>
          : <>Loading amount...</>
        }</strong> in your wallet.</p>
        <p>In the step 1, we will start with ERC20 approval process and following that we will make the repayLoan transaction to the TimeAlly Smart Contract.</p>
        {this.state.allowance && this.state.loanObj && this.state.allowance.gte(this.state.loanObj.exaEsAmount)
          ? <>
            Looks like you already have enough allowance.<br/>
            <Button onClick={() => this.setState({ currentScreen: 1 })}>Go to next step</Button>
          </>
          : <>{amount ?
            <Button
              onClick={() => this.setState({ showApproveTransactionModal: true })}
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
              {this.state.spinner ? <>Please wait...</> : <>Approve TimeAlly to withdraw {amount} ES</>}
            </Button> : null}</>}
      </div>
    );

    if(this.state.currentScreen === 1) {
      screen = (
        <div>
          {startOverAgainButton}
          <p>In this step, you have to make the repay loan transaction and tokens will be transferred to TimeAlly Contract.</p>
          <Button
            onClick={() => this.setState({ showRepayTransactionModal: true })}
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
            {this.state.spinner ? <>Please wait...</> : <>Repay Loan</>}
          </Button>
        </div>
      );
    } else if(this.state.currentScreen === 2) {
      screen = (
        <>
          <Card>
            <div className="custom-width" style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', padding:'20px 40px', margin: '15px auto'}}>
              <h3 style={{marginBottom: '15px'}}>Repay confirmed!</h3>
              <Alert variant="success">Your Loan is Repayed. You can view your transaction on <a style={{color: 'black'}} href={`https://${network === 'homestead' ? '' : 'kovan.'}etherscan.io/tx/${this.state.txHash}`} target="_blank" rel="noopener noreferrer">EtherScan</a></Alert>
              <Button onClick={() => this.props.history.push('/loans/view')}>Go to View Loans</Button>
            </div>
          </Card>

        </>
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
            show={this.state.showApproveTransactionModal}
            hideFunction={() => this.setState({ showApproveTransactionModal: false, spinner: false })}
            ethereum={{
              transactor: this.props.store.esInstance.functions.approve,
              estimator: this.props.store.esInstance.estimate.approve,
              contract: this.props.store.esInstance,
              contractName: 'Era Swap ERC20',
              arguments: [
                this.props.store.timeallyInstance.address,
                this.state.loanObj ? this.state.loanObj.exaEsAmount : ethers.constants.Zero
              ],
              ESAmount: amount,
              headingName: 'Approve',
              functionName: 'approve',
              // stakingPlan: this.state.plan,
              directGasScreen: true,
              continueFunction: txHash => this.setState({
                spinner: false,
                currentScreen: 1,
                showApproveTransactionModal: false,
                txHash
              })
            }}
          />

          <TransactionModal
              show={this.state.showRepayTransactionModal}
              hideFunction={() => this.setState({ showRepayTransactionModal: false, spinner: false })}
              ethereum={{
                transactor: this.props.store.timeallyInstance.functions.repayLoanSelf,
                estimator: this.props.store.timeallyInstance.estimate.repayLoanSelf,
                contract: this.props.store.timeallyInstance,
                contractName: 'TimeAlly',
                arguments: [this.props.match.params.id],
                ESAmount: amount,
                headingName: 'Repay Loan',
                functionName: 'repayLoanSelf',
                directGasScreen: true,
                continueFunction: txHash => this.setState({
                  spinner: false,
                  currentScreen: 2,
                  showRepayTransactionModal: false,
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
      StakingId: {this.props.stakingId}) Repay Amount: {this.props.stakeAmount} | {this.state.staking
        ? new Date(this.state.staking[1].toNumber() * 1000).toLocaleString() : 'Loading staking time...'}
    </Card>
  );
}

export default connect(state => {return{store: state}})(Repay);
