import React, { Component } from 'react';
import { Button, Card, Form, Spinner, Alert, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import Layout from '../../../Layout/LayoutPET';
import TransactionModal from '../../../TransactionModal/TransactionModal';
import { esContract, pet, network } from '../../../../env';

const ethers = require('ethers');

function getFees(frequencyMode) {
  switch(frequencyMode) {
    case 3:
      return 1;
    case 6:
      return 2;
    case 12:
      return 3;
    default:
      return null;
  }
}

class LumSumDeposit extends Component {
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
    monthlyCommitmentAmount: undefined,
    currentTime: Math.floor(Date.now()/1000),
    frequencyMode: null
  }

  componentDidMount= async() => {
    // await this.setState({ currentTime: network === 'homestead' ? Math.floor(Date.now() / 1000) : (await this.props.store.esInstance.functions.mou()) });
    this.state.currentTime = network === 'homestead' ? Math.floor(Date.now() / 1000) : (await this.props.store.esInstance.functions.mou());

    if(this.props.store.walletInstance) {
      const userLiquidEsBalancePromise = this.props.store.esInstance.functions.balanceOf(this.props.store.walletInstance.address);
      const userPrepaidESBalancePromise = this.props.store.petInstance.functions.prepaidES(this.props.store.walletInstance.address);
      const petPromise = this.props.store.petInstance.functions.pets(this.props.store.walletInstance.address, this.props.match.params.id);
      await Promise.all([userLiquidEsBalancePromise, userPrepaidESBalancePromise, petPromise]);
      this.setState({
        userLiquidEsBalance: await userLiquidEsBalancePromise,
        userPrepaidESBalance: await userPrepaidESBalancePromise,
        // monthId: Math.floor((this.state.currentTime - (await petPromise).initTimestamp)/2629744)+1,
        monthlyCommitmentAmount: (await petPromise).monthlyCommitmentAmount,
        spinner: false
      });
      this.onAmountUpdate({target:{value:this.state.userAmount}});
    }
  }

  onAmountUpdate = async event => {
    console.log('onAmountUpdate');
    try {
      if(this.state.userLiquidEsBalance && this.state.userPrepaidESBalance) {
        console.log('1');
        const isLiquidAvailable = ethers.utils.parseEther(event.target.value || '0').lte(this.state.userLiquidEsBalance);
        const isPrepaidAvailable = ethers.utils.parseEther(event.target.value || '0').lte(this.state.userPrepaidESBalance);
        const isDepositAtleastMinimum = ethers.utils.parseEther(event.target.value || '0').gte(this.state.monthlyCommitmentAmount.mul(this.state.frequencyMode || 1));
        console.log('isLiquidAvailable', isLiquidAvailable, 'isPrepaidAvailable', isPrepaidAvailable);
        console.log('2');
        let insufficientBalance = false;
        let insufficientBalanceText = '';
        if(+event.target.value) {
          if(isDepositAtleastMinimum) {
            if(isLiquidAvailable && isPrepaidAvailable) {
              insufficientBalanceText = `You can use either your liquid tokens (${window.lessDecimals(this.state.userLiquidEsBalance)} ES) or your TimeAllyPET prepaidES tokens (${window.lessDecimals(this.state.userPrepaidESBalance)} ES) for this PET.`;
            } else if(isLiquidAvailable && !isPrepaidAvailable) {
              insufficientBalanceText = this.state.userPrepaidESBalance.gt(0) ? `You can use your liquid ES tokens (${window.lessDecimals(this.state.userLiquidEsBalance)} ES) for this PET as there aren't enough tokens in your TimeAllyPET prepaidES.` : '' ;
            } else if(!isLiquidAvailable && isPrepaidAvailable) {
              insufficientBalanceText = `You can use your TimeAllyPET prepaidES tokens (${window.lessDecimals(this.state.userPrepaidESBalance)} ES) for this PET.`
            } else {
              insufficientBalance = true;
              insufficientBalanceText = `Insufficient ES balance. You only have ${window.lessDecimals(this.state.userLiquidEsBalance)} liquid ES tokens${this.state.userPrepaidESBalance.gt(0) ? ` and ${window.lessDecimals(this.state.userPrepaidESBalance)} TimeAllyPET prepaidES tokens.` : '.'}`;
            }
          } else {
            console.log('3');
            insufficientBalance = true;
            insufficientBalanceText = `Your commitment is ${window.lessDecimals(this.state.monthlyCommitmentAmount)} ES`+(this.state.frequencyMode?`, hence your amount should be ${window.lessDecimals(this.state.monthlyCommitmentAmount.mul(this.state.frequencyMode || 1))} ES.`:'');
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
      this.props.store.petInstance.address
    );

    // console.log('allowance', allowance, allowance.gte(ethers.utils.parseEther(this.state.userAmount).add(ethers.utils.parseEther(getFees(this.state.frequencyMode)))));

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

    const headingText = `Lum Sum Deposit`;
    const feesBN = ethers.utils.parseEther(this.state.userAmount?this.state.userAmount:'0').mul(getFees(this.state.frequencyMode)||'1').div(100);
    const fees = ethers.utils.formatEther(feesBN);
    
    const userAmountWithFees = ethers.utils.formatEther(ethers.utils.parseEther(this.state.userAmount?this.state.userAmount:'0').add(feesBN));

    if(this.state.currentScreen === 0) {
      screen = (
          <>
        <Card>

          <Form className="custom-width" onSubmit={this.onFirstSubmit} style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', padding:'20px 40px', margin: '15px auto'}}>
            <h3 style={{marginBottom: '15px'}}>{headingText} - Step 1 of 4</h3>

            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Control className="width-100" as="select" onChange={async event => {
                // await this.setState({ frequencyMode: +event.target.value });
                this.state.frequencyMode = +event.target.value;
                this.onAmountUpdate({target: {value: this.state.userAmount}});
              }}>
                <option disabled selected={this.state.frequencyMode === null}>Select SAP Frequency Mode</option>
                {[[3, getFees(3)], [6, getFees(6)], [12, getFees(12)]].map(entry => (
                  <option value={entry[0]} selected={this.state.frequencyMode === 0}>{entry[0]} Months => {entry[1]}% Convenience Fee</option>
                ))}

              </Form.Control>
            </Form.Group>

            <Form.Group controlId="installmentAmount">
              <Form.Control
                className="stakingInput"
                autoFocus
                onChange={this.onAmountUpdate}
                value={this.state.userAmount}
                type="text"
                autoComplete="off"
                placeholder="Enter total deposit amount"
                style={{width: '325px'}}
                isInvalid={this.state.insufficientBalance}
              />
              {this.state.insufficientBalanceText ? <p style={{color: this.state.insufficientBalance ? 'red' : 'green', textAlign: 'left'}}>{this.state.insufficientBalanceText}</p> : null}
            </Form.Group>


            <Button variant="primary" id="firstSubmit" type="submit" disabled={!this.state.userAmount || !this.state.frequencyMode || this.state.spinner || this.state.insufficientBalance}>
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
        displayText = <p>This dApp just noticed that you have <strong>{window.lessDecimals(this.state.userLiquidEsBalance)} liquid ES tokens</strong> as well as <strong>{window.lessDecimals(this.state.userPrepaidESBalance)} TimeAllyPET prepaidES</strong>. Please choose which you want to use to deposit the <strong>{this.state.monthId ? window.getOrdinalString(this.state.monthId) : 'Loading...'} monthly installment of {this.state.userAmount} ES</strong> of your PET with initial monthly commitment of  ES.</p>;
      } else if(this.state.isLiquidAvailable && !this.state.isPrepaidAvailable) {
        displayText = <p>You have enough tokens (<strong>{window.lessDecimals(this.state.userLiquidEsBalance)} ES</strong>) in your wallet for PET. Go to Step 3 for doing approval procedure of <strong>{this.state.userAmount} ES + {fees} ES = {userAmountWithFees} ES</strong> to TimeAllyPET Smart Contract.</p>;
      } else if(!this.state.isLiquidAvailable && this.state.isPrepaidAvailable) {
        displayText = <p>You have enough tokens in your TimeAllyPET prepaidES to make a deposit of <strong>{this.state.userAmount} ES</strong> in your PET with initial monthly commitment of  ES.</p>;
      } else {
        displayText = <p>Seems that you don't have enough ES tokens for making deposit of <strong>{this.state.userAmount} ES</strong> for {this.state.monthId ? window.getOrdinalString(this.state.monthId) : 'Loading...'} Month. Your liquid balance is <strong>{window.lessDecimals(this.state.userLiquidEsBalance)} ES</strong>{this.state.userPrepaidESBalance.gt(0) ? <> and prepaidES balance is <strong>{window.lessDecimals(this.state.userPrepaidESBalance)} ES</strong></> : null}. Are you sure you want to proceed? You can get ES tokens from anyone who has ES tokens. ES tokens are also trading on Probit Exchange, where you can exchange your other crypto assets with the exchange community for ES.</p>;
      }

      screen = (
        <Card>
          <div className="mnemonics custom-width" style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', padding:'20px 40px', margin: '15px auto'}}>
            {startOverAgainButton}
            <h3 style={{marginBottom: '15px'}}>{headingText} - Step 2 of 4</h3>
            {displayText}
            <Button
              style={{display:'block', width:'100%', margin: '0'}}
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
              style={{display:'block', width:'100%', margin: '0'}}
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
          <div className="mnemonics custom-width" style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', padding:'20px 40px', margin: '15px auto'}}>
            {startOverAgainButton}
            <h3 style={{marginBottom: '15px'}}>{headingText} - Step 3 of 4</h3>
            {!this.state.approveAlreadyDone ? <>
              <p>This step is for approving TimeAllyPET Smart Contract to collect <strong>{this.state.userAmount} ES + {fees} ES = {userAmountWithFees} ES</strong> from your account. <strong>No funds will be debited from your account in this step.</strong> Funds will be debited in Step 3 and sent into PET Contract when you do New PET transaction.</p>
              {
                this.state.errorMessage
                ? <Alert variant="danger">
                    {this.state.errorMessage}
                  </Alert>
                : null
              }
              {this.state.approveSuccess
                ? <>
                  <Alert variant="warning">Your approve tx is confirmed! <strong>Note: Your {userAmountWithFees} ES has not been deposited in TimeAlly PET Contract yet.</strong> Please go to third step to do your Lum Sum Deposit transaction.</Alert>
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
                {this.state.spinner ? 'Please wait...' : 'Approve TimeAllyPET'}
              </Button>}
            </> : <>
              <Alert variant="primary">This dApp just noticed that you already have enough allowance. You can directly continue to the third step and do your Lum Sum Deposit transaction.</Alert>
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
          <div className="custom-width" style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', padding:'20px 40px', margin: '15px auto'}}>
            {startOverAgainButton}
            <h3 style={{marginBottom: '15px'}}>{headingText} - Step 4 of 4</h3>
            <p>Please click the following button to confirm your PET Lum Sum Deposit of <strong>{this.state.userAmount} ES</strong> (additional <strong>{fees} ES</strong> will be charged making it total of <strong>{userAmountWithFees} ES</strong>).</p>
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
              {this.state.waiting ? 'Waiting for confirmation' : ( this.state.spinner ? 'Sending transaction' : 'Confirm Lum Sum Deposit')}
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
            <div className="custom-width" style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', padding:'20px 40px', margin: '15px auto'}}>
              <h3 style={{marginBottom: '15px'}}>{this.state.monthId ? window.getOrdinalString(this.state.monthId) : ''} Lum Sum Deposit confirmed!</h3>
              <Alert variant="success">Your lum sum deposit transaction is confirmed. You can view your transaction on <a style={{color: 'black'}} href={`https://${network === 'homestead' ? '' : 'kovan.'}etherscan.io/tx/${this.state.txHash}`} target="_blank" rel="noopener noreferrer">EtherScan</a></Alert>
              <Button onClick={() => this.props.history.push('/pet/view/'+this.props.match.params.id)}>Go to PET Deposits Page</Button>
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
        title={`Make Lum Sum Deposit`}
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
            arguments: [this.props.store.petInstance.address, ethers.utils.parseEther(userAmountWithFees)],
            ESAmount: userAmountWithFees,
            headingName: 'Approval Status',
            functionName: 'Approve',
            // stakingPlan: this.state.plan,
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
              transactor: this.props.store.petInstance.functions.makeLumSumDeposit,
              estimator: this.props.store.petInstance.estimate.makeLumSumDeposit,
              contract: this.props.store.petInstance,
              contractName: 'TimeAllyPET',
              arguments: [
                this.props.store.walletInstance.address,
                this.props.match.params.id,
                ethers.utils.parseEther(this.state.userAmount?this.state.userAmount:'0'),
                this.state.frequencyMode,
                this.state.usePrepaidES
              ],
              ESAmount: userAmountWithFees,
              headingName: `Lum Sum Deposit (${this.state.frequencyMode} Months)`,
              functionName: 'makeLumSumDeposit',
              // stakingPlan: this.state.plan,
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

export default connect(state => {return{store: state}})(LumSumDeposit);
