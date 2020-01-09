import React, { Component } from 'react';
import { Button, Card, Form, Spinner, Alert, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import Layout from '../../../Layout/Layout';
import TransactionModal from '../../../TransactionModal/TransactionModal';
import { esContract, sip, network } from '../../../../env';

const ethers = require('ethers');

class Deposit extends Component {
  state = {
    currentScreen: 0,
    userAmount: undefined,
    spinner: true,
    waiting: false,
    approveTxHash: '',
    txHash: '',
    open: false,
    errorMessage: '',
    showApproveTransactionModal: false,
    showStakeTransactionModal: false,
    approveSuccess: false,
    approveAlreadyDone: false,
    userLiquidEsBalance: undefined,
    userPrepaidESBalance: undefined,
    isLiquidAvailable: false,
    isPrepaidAvailable: false,
    insufficientBalance: false,
    insufficientBalanceText: '',
    usePrepaidES: false,
    monthlyCommitmentAmount: undefined
  }

  componentDidMount= async() => {
    if(this.props.store.walletInstance) {
      const userLiquidEsBalancePromise = this.props.store.esInstance.functions.balanceOf(this.props.store.walletInstance.address);
      const userPrepaidESBalancePromise = this.props.store.sipInstance.functions.prepaidES(this.props.store.walletInstance.address);
      const sipPromise = this.props.store.sipInstance.functions.sips(this.props.store.walletInstance.address, this.props.match.params.id);
      await Promise.all([userLiquidEsBalancePromise, userPrepaidESBalancePromise, sipPromise]);
      this.setState({
        userLiquidEsBalance: await userLiquidEsBalancePromise,
        userPrepaidESBalance: await userPrepaidESBalancePromise,
        monthlyCommitmentAmount: (await sipPromise).monthlyCommitmentAmount,
        spinner: false
      });
      this.onAmountUpdate({target:{value:this.state.userAmount}});
    }
  }

  onAmountUpdate = async event => {
    try {
      if(this.state.userLiquidEsBalance && this.state.userPrepaidESBalance && this.state.monthlyCommitmentAmount) {
        const isLiquidAvailable = ethers.utils.parseEther(event.target.value || '0').lte(this.state.userLiquidEsBalance);
        const isPrepaidAvailable = ethers.utils.parseEther(event.target.value || '0').lte(this.state.userPrepaidESBalance);
        const isDepositAtleastMinimum = ethers.utils.parseEther(event.target.value || '0').gte(this.state.monthlyCommitmentAmount);
        console.log('isLiquidAvailable', isLiquidAvailable, 'isPrepaidAvailable', isPrepaidAvailable, 'isDepositAtleastMinimum', isDepositAtleastMinimum);

        let insufficientBalance = false;
        let insufficientBalanceText = '';
        if(+event.target.value) {
          if(isDepositAtleastMinimum) {
            if(isLiquidAvailable && isPrepaidAvailable) {
              insufficientBalanceText = `You can use either your liquid tokens (${window.lessDecimals(this.state.userLiquidEsBalance)} ES) or your TimeAllySIP prepaidES tokens (${window.lessDecimals(this.state.userPrepaidESBalance)} ES) for this SIP.`;
            } else if(isLiquidAvailable && !isPrepaidAvailable) {
              insufficientBalanceText = this.state.userPrepaidESBalance.gt(0) ? `You can use your liquid ES tokens (${window.lessDecimals(this.state.userLiquidEsBalance)} ES) for this SIP as there aren't enough tokens in your TimeAllySIP prepaidES.` : '' ;
            } else if(!isLiquidAvailable && isPrepaidAvailable) {
              insufficientBalanceText = `You can use your TimeAllySIP prepaidES tokens (${window.lessDecimals(this.state.userPrepaidESBalance)} ES) for this SIP.`
            } else {
              insufficientBalance = true;
              insufficientBalanceText = `Insufficient ES balance. You only have ${window.lessDecimals(this.state.userLiquidEsBalance)} liquid ES tokens${this.state.userPrepaidESBalance.gt(0) ? ` and ${window.lessDecimals(this.state.userPrepaidESBalance)} TimeAllySIP prepaidES tokens.` : '.'}`;
            }
          } else {
            insufficientBalance = true;
            insufficientBalanceText = `Your amount should be at least ${window.lessDecimals(this.state.monthlyCommitmentAmount)} ES. `
          }
        }

        await this.setState({
          userAmount: event.target.value,
          isLiquidAvailable,
          isPrepaidAvailable,
          insufficientBalance,
          insufficientBalanceText,
        });
      } else {
        await this.setState({ userAmount: event.target.value });
      }
    } catch (error) {
      console.log(error.message);
      this.setState({ insufficientBalance: true, insufficientBalanceText: error.message })
    }
    // console.log('this.state.userLiquidEsBalance', this.state.userLiquidEsBalance, this.state.insufficientBalance);
  }

  onFirstSubmit = async event => {
    event.preventDefault();

    await this.setState({ spinner: true });
    const allowance = await this.props.store.esInstance.functions.allowance(
      this.props.store.walletInstance.address,
      this.props.store.sipInstance.address
    );

    console.log('allowance', allowance, allowance.gte(ethers.utils.parseEther(this.state.userAmount)));

    if(allowance.gte(ethers.utils.parseEther(this.state.userAmount))) {
      this.setState({
        spinner: false,
        currentScreen: 1,
        approveAlreadyDone: true
      });
    } else {
      this.setState({ spinner: false, currentScreen: 1, approveAlreadyDone: false });
    }
  }

  render() {
    let screen;

    const startOverAgainButton = (
      <span style={{display:'block', textAlign:'left', cursor: 'pointer'}} onClick={() => this.setState({ currentScreen: 0 })}>{'<'}Start All Over</span>
    );

    const headingText = `Deposit Installment of Month ${this.props.match.params.month}`;

    if(this.state.currentScreen === 0) {
      screen = (
          <>
        <Card>

          <Form onSubmit={this.onFirstSubmit} style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', width: '400px', padding:'20px 40px', margin: '15px auto'}}>
            <h3 style={{marginBottom: '15px'}}>{headingText} - Step 1 of 4</h3>

            <Form.Group controlId="installmentAmount">
              <Form.Control
                className="stakingInput"
                autoFocus
                onChange={this.onAmountUpdate}
                value={this.state.userAmount}
                type="text"
                autoComplete="off"
                placeholder="Enter installment amount for SIP"
                style={{width: '325px'}}
                isInvalid={this.state.insufficientBalance}
              />
              {this.state.insufficientBalanceText ? <p style={{color: this.state.insufficientBalance ? 'red' : 'green', textAlign: 'left'}}>{this.state.insufficientBalanceText}</p> : null}
            </Form.Group>


            <Button variant="primary" id="firstSubmit" type="submit" disabled={!this.state.userAmount || this.state.spinner}>
              {this.state.spinner ?
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{marginRight: '2px'}}
              /> : null}
              { this.state.spinner ? 'Please wait..' : 'Next'}
            </Button>
          </Form>
        </Card>
        </>
      );
    } else if(this.state.currentScreen === 1) {
      let displayText = '';
      if(this.state.isLiquidAvailable && this.state.isPrepaidAvailable) {
        displayText = <p>This dApp just noticed that you have <strong>{window.lessDecimals(this.state.userLiquidEsBalance)} liquid ES tokens</strong> as well as <strong>{window.lessDecimals(this.state.userPrepaidESBalance)} TimeAllySIP prepaidES</strong>. Please choose which you want to use to deposit the <strong>{window.getOrdinalString(this.props.match.params.month)} monthly installment of {this.state.userAmount} ES</strong> of your SIP with initial monthly commitment of {window.lessDecimals(this.state.monthlyCommitmentAmount)} ES.</p>;
      } else if(this.state.isLiquidAvailable && !this.state.isPrepaidAvailable) {
        displayText = <p>You have enough tokens (<strong>{window.lessDecimals(this.state.userLiquidEsBalance)} ES</strong>) in your wallet for SIP. Go to Step 3 for doing approval procedure of <strong>{this.state.userAmount} ES</strong> to TimeAllySIP Smart Contract.</p>;
      } else if(!this.state.isLiquidAvailable && this.state.isPrepaidAvailable) {
        displayText = <p>You have enough tokens in your TimeAllySIP prepaidES to make a deposit of <strong>{this.state.userAmount} ES</strong> in your SIP with initial monthly commitment of {window.lessDecimals(this.state.monthlyCommitmentAmount)} ES.</p>;
      } else {
        displayText = <p>Seems that you don't have enough ES tokens for making deposit of <strong>{this.state.userAmount} ES</strong> for {window.getOrdinalString(this.props.match.params.month)} Month. Your liquid balance is <strong>{window.lessDecimals(this.state.userLiquidEsBalance)} ES</strong>{this.state.userPrepaidESBalance.gt(0) ? <> and prepaidES balance is <strong>{window.lessDecimals(this.state.userPrepaidESBalance)} ES</strong></> : null}. Are you sure you want to proceed? You can get ES tokens from anyone who has ES tokens. ES tokens are also trading on Probit Exchange, where you can exchange your other crypto assets with the exchange community for ES.</p>;
      }

      screen = (
        <Card>
          <div className="mnemonics" style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', width: '400px', padding:'20px 40px', margin: '15px auto'}}>
            {startOverAgainButton}
            <h3 style={{marginBottom: '15px'}}>{headingText} - Step 2 of 4</h3>
            {displayText}
            <Button
              style={{display:'block', width:'100%'}}
              disabled={!this.state.isLiquidAvailable}
              onClick={() => this.setState({
                usePrepaidES: false,
                currentScreen: 2
              })}
            >
              From Liquid: {window.lessDecimals(this.state.userLiquidEsBalance)}
            </Button>
            <Button
              variant="warning"
              style={{display:'block', width:'100%'}}
              disabled={!this.state.isPrepaidAvailable}
              onClick={() => this.setState({
                usePrepaidES: true,
                currentScreen: 3
              })}
            >
              From PrepaidES: {window.lessDecimals(this.state.userPrepaidESBalance)}
            </Button>
          </div>
        </Card>
      );
    } else if(this.state.currentScreen === 2) {
      screen = (
        <>
        <Card>
          <div className="mnemonics" style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', width: '400px', padding:'20px 40px', margin: '15px auto'}}>
            {startOverAgainButton}
            <h3 style={{marginBottom: '15px'}}>{headingText} - Step 3 of 4</h3>
            {!this.state.approveAlreadyDone ? <>
              <p>This step is for approving TimeAllySIP Smart Contract to collect {this.state.userAmount} ES from your account. <strong>No funds will be debited from your account in this step.</strong> Funds will be debited in Step 3 and sent into SIP Contract when you do New SIP transaction.</p>
              {
                this.state.errorMessage
                ? <Alert variant="danger">
                    {this.state.errorMessage}
                  </Alert>
                : null
              }
              {this.state.approveSuccess
                ? <>
                  <Alert variant="warning">Your approve tx is confirmed! <strong>Note: Your {this.state.userAmount} ES has not been deposited in TimeAlly SIP Contract yet.</strong> Please go to third step to do your Monthly Deposit transaction.</Alert>
                  <Button onClick={() => this.setState({ currentScreen: 3 })}>
                    Go to 3rd Step
                  </Button>
                </>
                : <Button onClick={() => {
                    this.setState({ showApproveTransactionModal: true, spinner: true });
                }} disabled={this.state.spinner}>
                {this.state.spinner ?
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  style={{marginRight: '2px'}}
                /> : null}
                {this.state.spinner ? 'Please wait...' : 'Approve TimeAllySIP'}
              </Button>}
            </> : <>
              <Alert variant="primary">This dApp just noticed that you already have enough allowance. You can directly continue to the third step and do your Monthly Deposit transaction.</Alert>
              <Button onClick={() => this.setState({ currentScreen: 3 })}>
                Go to 3rd Step
              </Button>
            </>}
            <Button variant="secondary" onClick={() => this.setState({ currentScreen: this.state.currentScreen - 1, spinner: false })}>Back</Button>
          </div>
        </Card>
        </>
      );
    } else if(this.state.currentScreen === 3) {
      screen = (
        <>
        <Card>
          <div style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', width: '400px', padding:'20px 40px', margin: '15px auto'}}>
            {startOverAgainButton}
            <h3 style={{marginBottom: '15px'}}>{headingText} - Step 4 of 4</h3>
            <p>Please click the following button to confirm your SIP Monthly Deposit of <strong>{this.state.userAmount} ES</strong>.</p>
              {
                this.state.errorMessage
                ? <Alert variant="danger">
                    {this.state.errorMessage}
                  </Alert>
                : null
              }
            <Button onClick={() => {
                  this.setState({ showStakeTransactionModal: true, spinner: true });
              }} disabled={this.state.spinner}>
              {this.state.spinner ?
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{marginRight: '2px'}}
              /> : null}
              {this.state.waiting ? 'Waiting for confirmation' : ( this.state.spinner ? 'Sending transaction' : 'Confirm Monthly Deposit')}
            </Button>
            { this.state.txHash
              ? <p>You can view your transaction on <a style={{color: 'black'}} href={`https://${network === 'homestead' ? '' : 'kovan.'}etherscan.io/tx/${this.state.txHash}`} target="_blank" rel="noopener noreferrer">EtherScan</a>.</p>
              : null
            }
          </div>
        </Card>
        </>
      );
    } else {
      screen = (
        <>
          <Card>
            <div style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', width: '400px', padding:'20px 40px', margin: '15px auto'}}>
              <h3 style={{marginBottom: '15px'}}>{window.getOrdinalString(this.props.match.params.month)} Monthly Deposit confirmed!</h3>
              <Alert variant="success">Your deposit transaction is confirmed. You can view your transaction on <a style={{color: 'black'}} href={`https://${network === 'homestead' ? '' : 'kovan.'}etherscan.io/tx/${this.state.txHash}`} target="_blank" rel="noopener noreferrer">EtherScan</a></Alert>
              <Button onClick={() => this.props.history.push('/assurance/view/'+this.props.match.params.id)}>Go to SIP Deposits Page</Button>
            </div>
          </Card>

        </>
      );
    }

    return (
      <Layout
        breadcrumb={['Home', ...(() => {
          const x = this.props.location.pathname.split('/');
          x.shift();
          return x;
        })()]}
        title={`Deposit ${window.getOrdinalString(this.props.match.params.month)} Monthly Installment`}
      >
        {screen}
        <TransactionModal
          show={this.state.showApproveTransactionModal}
          hideFunction={() => this.setState({ showApproveTransactionModal: false, spinner: false })}
          ethereum={{
            transactor: this.props.store.esInstance.functions.approve,
            estimator: this.props.store.esInstance.estimate.approve,
            contract: this.props.store.esInstance,
            contractName: 'EraSwap',
            arguments: [this.props.store.sipInstance.address, ethers.utils.parseEther(this.state.userAmount?this.state.userAmount:'0')],
            ESAmount: this.state.userAmount,
            headingName: 'Approval Status',
            functionName: 'Approve',
            stakingPlan: this.state.plan,
            directGasScreen: true,
            continueFunction: () => this.setState({
              spinner: false,
              // currentScreen: 2,
              approveSuccess: true,
              showApproveTransactionModal: false
            })
          }}
        />
        <TransactionModal
            show={this.state.showStakeTransactionModal}
            hideFunction={() => this.setState({ showStakeTransactionModal: false, spinner: false })}
            ethereum={{
              transactor: this.props.store.sipInstance.functions.monthlyDeposit,
              estimator: this.props.store.sipInstance.estimate.monthlyDeposit,
              contract: this.props.store.sipInstance,
              contractName: 'TimeAllySIP',
              arguments: [
                this.props.store.walletInstance.address,
                this.props.match.params.id,
                ethers.utils.parseEther(this.state.userAmount?this.state.userAmount:'0'),
                this.props.match.params.month,
                this.state.usePrepaidES
              ],
              ESAmount: this.state.userAmount,
              headingName: window.getOrdinalString(this.props.match.params.month)+' Monthly Deposit',
              functionName: 'monthlyDeposit',
              stakingPlan: this.state.plan,
              directGasScreen: true,
              continueFunction: txHash => this.setState({
                spinner: false,
                currentScreen: 4,
                showStakeTransactionModal: false,
                txHash
              })
            }}
          />
      </Layout>
    )
  }
}

export default connect(state => {return{store: state}})(Deposit);
