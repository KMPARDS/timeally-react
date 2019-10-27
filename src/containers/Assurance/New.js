import React, { Component } from 'react';
import { Button, Card, Form, Spinner, Alert, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import Layout from '../Layout/Layout';
import TransactionModal from '../TransactionModal/TransactionModal';
import { esContract, sip, network } from '../../env';

const ethers = require('ethers');

class New extends Component {
  state = {
    currentScreen: 0,
    userAmount: undefined,
    plan: undefined,
    spinner: false,
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
    insufficientBalance: false
  }

  componentDidMount= async() => {
    this.onOpenModal();

    // if(this.props.store.walletInstance) this.props.history.push('/load-wallet');

    if(this.props.store.walletInstance) {
      const userLiquidEsBalance = await this.props.store.esInstance.functions.balanceOf(this.props.store.walletInstance.address);
      this.setState({ userLiquidEsBalance });
    }
  }

  onAmountUpdate = async event => {
    if(this.state.userLiquidEsBalance) {
      await this.setState({
        userAmount: event.target.value,
        insufficientBalance: ethers.utils.parseEther(event.target.value || '0').gt(this.state.userLiquidEsBalance) ,
        plan: +event.target.value >= 100000
        ? 4
        : (
          +event.target.value >= 10000
          ? 3
          : (
            +event.target.value >= 1000
            ? 2
            : (
              +event.target.value >= 500
              ? 1 : (
                +event.target.value >= 100
                ? 0 : undefined
              )
            )
          )
        )
      });
    } else {
      await this.setState({ userAmount: event.target.value });
    }
    // console.log('this.state.userLiquidEsBalance', this.state.userLiquidEsBalance, this.state.insufficientBalance);
  }

  onPlanChange = event => {
    this.setState({ plan: event.target.value });
    console.log(event.target.value);
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

  // onApproveClick = async() => {
  //   console.log(this.props.store);
  //   console.log(this.props.store.walletInstance);
  //   // this.props.store.esInstance.connect(this.props.store.walletInstance);
  //   // const contractWithSigner = new ethers.Contract(
  //   //   this.props.store.esInstance.address,
  //   //   esContract.abi, this.props.store.walletInstance);
  //   await this.setState({ spinner: true, errorMessage: '' });
  //   try {
  //     const tx = await this.props.store.esInstance.functions.approve(
  //       sip.address,
  //       ethers.utils.parseEther(this.state.userAmount),
  //       {gasPrice: 10000000000}
  //     );
  //     console.log(tx);
  //     await this.setState({ waiting: true, approveTxHash: tx.hash });
  //     await tx.wait();
  //     this.setState({ spinner: false, waiting: false, approveSuccess: true });
  //   } catch (err) {
  //     this.setState({
  //       spinner: false, waiting: false,
  //       errorMessage: 'Error from blockchain: ' + err.message
  //     });
  //   }
  // }
  // stakeNowClick = async() => {
  //   const contractWithSigner = new ethers.Contract(
  //     timeally.address,
  //     timeally.abi, this.props.store.walletInstance);
  //   await this.setState({ spinner: true, errorMessage: '' });
  //   try {
  //     const tx = await contractWithSigner.functions.newStaking(
  //       ethers.utils.parseEther(this.state.userAmount), this.state.plan, {gasLimit: 7000000, gasPrice: 10000000000});
  //     console.log(tx);
  //     await this.setState({ waiting: true, txHash: tx.hash });
  //     await tx.wait();
  //     this.setState({ spinner: false, waiting: false, currentScreen: 3 });
  //   } catch (err) {
  //     this.setState({
  //       spinner: false, waiting: false,
  //       errorMessage: 'Error from blockchain' + err.message
  //     });
  //   }
  // }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    let screen;

    if(this.state.currentScreen === 0) {
      screen = (
          <>
           {/* <button className="btn" onClick={this.onOpenModal}>Open modal</button> */}
           <Modal open={this.state.open}>
                  <h2>Terms & Conditions</h2>
                  <h5>Please scroll and read the complete document carefully to proceed.</h5>
                  <hr></hr>
                  <div style={{overflowY:'scroll', height:'500px'}}>
                  <p style={{fontSize:'12px'}}>
                  The Eraswapfoundation OU is a group of developers and technology professionals who are passionate
                    about the potential of decentralized applications. It does not own or lead the TimeAllySIP ("TimeAllySIP"), but
                    rather supports and develops the free, open-source & decentralize applications.<br></br><br></br>
                    The Eraswap Foundation is not a bank or financial institution and does not provide investment or
                    financial advice or consulting services to users. Eraswap Foundation makes no warranties or
                    representations, express or implied, on products offered through the platform. It accepts no liability for
                    any damages or losses, however caused, in connection with the use of, or on the reliance of
                    decentralized application, products or related services.<br></br><br></br>
                    In no way are the owners of, or contributors to, the Website responsible for the actions, decisions, or
                    other behavior taken or not taken by user in reliance upon the Website. Users not authorized and nor
                    should they rely on the Website for any legal advice, business advice, or advice of any kind. User should
                    act at their own risk in reliance on the contents of the Web interface.<br></br><br></br>
                    TimeAllySIP is a DApp which refers to a suite of protocols using decentralized application. TimAlly is a
                    decentralized application whish run on P2P network of computers. TimeAllySIP uses Ethereum Virtual
                    Machine (“EVM”), which can execute code of arbitrary algorithmic complexity. TimeAllySIP uses distributed
                    ledger technology which is neither stored in a centralized location nor managed by any single entity.<br></br><br></br>
                    The New Released Token (NRT) distribution, Vesting, rewards are completely governed by TimeAllySIP
                    DApp as per the predefined rules which is system driven & by the user itself. No organization, institute,
                    human or personnel intervention is authorized to control or alter or modify the system driven software<br></br><br></br>

                    <span style={{fontWeight:'bold'}}>Important Guidelines for Users about TimeAllySIP DAPP</span><br></br><br></br>
                    1. The user should carefully review the whitepaper and website content of TimeAllySIP DApp to
                    familiarize with the Smart Contract logics & Assurance plans.<br></br><br></br>
                    2. The User should understand, acknowledge that assuring in TimeAllySIP are subject to market risks
                    and no assurance on the valuation & its returns since it depends solely on the user itself &
                    distribution is governed by DApp .<br></br><br></br>
                    3. The Users should read carefully about the vesting plans and completely understands the risk
                    factors associated with the vesting plans on the date of the transaction and thereafter. The user
                    should consider their specific requirements before choosing any assurance plan with TimeAllySIP
                    DApp.<br></br><br></br>
                    4. The Users are advised that the assuring in TimeAllySIP is based and dependent on the submission of
                    information by user and the User shall be solely responsible for any submission of incorrect or
                    non-submission/omission of necessary and accurate information. The User confirms and
                    believes that transaction/s undertaken is/are appropriate for the User as per the objective of
                    the User.<br></br><br></br>
                    5. The User should confirm that the decision for vesting, claiming or undertaking any transaction
                    on the TimeAllySIP DApp is taken with complete knowledge & ownership with user itself. <br></br><br></br>
                    The User should recognize vesting in Time Ally involves certain risks and will take full cognizance
                    of and understand all of the risk factors related before investing in Time Ally Contracts<br></br><br></br>
                    7. The User should understand and accept complete responsibility & liability for any damages or
                    losses, however caused, in connection with the vesting, use of, or on the reliance of DApp. <br></br><br></br>
                    8. Do not participate in offerings where one or more people offer you a guaranteed return in
                    exchange for an upfront deposit. The end result is that usually a lot of people loose a lot.
                    Guarantee is given on something which you control or hold. TimeAllySIP Vault holds the token. Thus the guarantee can be given by Smart Contract as they
                    hold all the tokens which will be released over next 50 years. It can guarantee only the release
                    of Era Swap (ES) from NRT Pool. Because all tokens which are to be released in future are stored
                    in vault and are distributed based on the work performed by the users among them<br></br><br></br>
                    9. Era Swap doesn’t guarantees any Fiat or Crypto because Era Swap doesn’t control any Fiat or
                    any other cryptocurrency. Era Swap token (ES) can only be used in the Eco System. ES can not be
                    used outside Era swap Ecosystem.<br></br><br></br>
                    10. The User can claim rewards based on the work performed in the ecosystem or vesting done in
                    TimeAllySIP. As per preset rules, if the user has performed tasks, then they are eligible for rewards.
                    In this case only, user can come and withdraw from TimeAllySIP DApp. The users will be solely
                    responsible for claiming the rewards.<br></br><br></br>
                    11. Phishing websites often go hand-in-hand with phishing emails. Phishing emails can link to a
                    replica website designed to steal login credentials or prompt one to install malware. Do not
                    install software or log in to a website unless you are 100% sure it isn't a fake one. Phishing
                    websites may also appear as sponsored results on search engines or in app marketplaces used
                    by mobile devices. Be wary that you aren't downloading a fake app or clicking a sponsored link
                    to a fake website. It is completely on User’s risk and the user is only liable for any such activity.<br></br><br></br>
                    No warranties<br></br><br></br>
                    The TimeAllySIP DApp is opted by users on an "as is" basis without any warranties of any kind regarding the
                    Website interface and/or any content, data, materials and/or services provided on the Website.<br></br><br></br>
                    THE TIMEALLYSIP DAPP SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                    PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
                    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
                    CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
                    OR THE USE OR OTHER DEALINGS IN THE SOFTWARE<br></br><br></br>
                    <a onClick={this.onCloseModal}  className="btn btn-primary btn-sm"><span className="text-white">Proceed</span></a>
                  </p>
                  </div>
                </Modal>
        <Card>
          <Form className="mnemonics" onSubmit={this.onFirstSubmit} style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', width: '400px', padding:'20px 40px', margin: '15px auto'}}>

            <h3 style={{marginBottom: '15px'}}>New Assurance SIP - Step 1 of 3</h3>

            <Form.Group controlId="sipAmount">
              <Form.Control
                className="stakingInput"
                onChange={this.onAmountUpdate}
                value={this.state.userAmount}
                type="text"
                autoComplete="off"
                placeholder="Enter commitment amount for SIP"
                style={{width: '325px'}}
                isInvalid={this.state.insufficientBalance}
              />
              {this.state.insufficientBalance ? <p style={{color: 'red', textAlign: 'left'}}>Insufficient balance ES balance</p> : null}

              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control as="select" onChange={this.onPlanChange} style={{width: '325px'}}>
                  <option disabled selected={this.state.plan === undefined}>Select Assurance Plan</option>
                  <option value="0" selected={this.state.plan === 0}>Min 100 ES, 16%, 12 Months / 9 Years</option>
                  <option value="1" selected={this.state.plan === 1}>Min 500 ES, 18%, 12 Months / 9 Years</option>
                  <option value="2" selected={this.state.plan === 2}>Min 1000 ES, 20%, 12 Months / 9 Years</option>
                  <option value="3" selected={this.state.plan === 3}>Min 10000 ES, 22%, 12 Months / 9 Years</option>
                  <option value="4" selected={this.state.plan === 4}>Min 100000 ES, 24%, 12 Months / 9 Years</option>
                </Form.Control>
              </Form.Group>
            </Form.Group>


            <Button variant="primary" id="firstSubmit" type="submit" disabled={!this.state.userAmount || this.state.plan === undefined || this.state.spinner}>
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
      screen = (
        <>
        <Card>
          <div className="mnemonics" style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', width: '400px', padding:'20px 40px', margin: '15px auto'}}>
            <h3 style={{marginBottom: '15px'}}>New Assurance SIP - Step 2 of 3</h3>
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
                  <Alert variant="warning">Your approve tx is confirmed! <strong>Note: Your {this.state.userAmount} ES has not been deposited in TimeAlly SIP Contract yet.</strong> Please go to third step to do your NewSIP transaction.</Alert>
                  <Button onClick={() => this.setState({ currentScreen: 2 })}>
                    Go to 3rd Step
                  </Button>
                </>
                : <Button onClick={() => {
                  if(window.connectedToMetamask) {
                    this.onApproveClick();
                  } else {
                    this.setState({ showApproveTransactionModal: true, spinner: true });
                  }
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
              <Alert variant="primary">This dApp just noticed that you already have enough allowance. You can directly continue to the third step and do your NewSIP transaction.</Alert>
              <Button onClick={() => this.setState({ currentScreen: 2 })}>
                Go to 3rd Step
              </Button>
            </>}
            <Button variant="secondary" onClick={() => this.setState({ currentScreen: this.state.currentScreen - 1, spinner: false })}>Back</Button>
          </div>
        </Card>
        </>
      );
    } else if(this.state.currentScreen === 2) {
      screen = (
        <>
        <Card>
          <div style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', width: '400px', padding:'20px 40px', margin: '15px auto'}}>
            <h3 style={{marginBottom: '15px'}}>New Assurance SIP - Step 3 of 3</h3>
            <p>Please click the following button to confirm your SIP.</p>
              {
                this.state.errorMessage
                ? <Alert variant="danger">
                    {this.state.errorMessage}
                  </Alert>
                : null
              }
            <Button onClick={() => {
                if(window.connectedToMetamask) {
                  this.stakeNowClick();
                } else {
                  this.setState({ showStakeTransactionModal: true, spinner: true });
                }
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
              {this.state.waiting ? 'Waiting for confirmation' : ( this.state.spinner ? 'Sending transaction' : 'Confirm SIP')}
            </Button>
            { this.state.txHash
              ? <p>You can view your transaction on <a style={{color: 'black'}} href={`https://${network}.etherscan.io/tx/${this.state.txHash}`} target="_blank" rel="noopener noreferrer">EtherScan</a>.</p>
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
              <h3 style={{marginBottom: '15px'}}>SIP confirmed!</h3>
              <Alert variant="success">Your SIP is initiated. You can view your transaction on <a style={{color: 'black'}} href={`https://${network}.etherscan.io/tx/${this.state.txHash}`} target="_blank" rel="noopener noreferrer">EtherScan</a></Alert>
              <Button onClick={() => this.props.history.push('/assurance/view')}>Go to View Assurance SIPs</Button>
            </div>
          </Card>

        </>
      );
    }

    return (
      <Layout
        breadcrumb={['Home', 'Assurance', 'New']}
        title='New Assurance'
      >
        {screen}
        {console.log(this.state)}
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
              transactor: this.props.store.sipInstance.functions.newSIP,
              estimator: this.props.store.sipInstance.estimate.newSIP,
              contract: this.props.store.sipInstance,
              contractName: 'TimeAllySIP',
              arguments: [this.state.plan,ethers.utils.parseEther(this.state.userAmount?this.state.userAmount:'0')],
              ESAmount: this.state.userAmount,
              headingName: 'New SIP',
              functionName: 'New SIP',
              stakingPlan: this.state.plan,
              directGasScreen: true,
              continueFunction: txHash => this.setState({
                spinner: false,
                currentScreen: 3,
                showStakeTransactionModal: false,
                txHash
              })
            }}
          />
      </Layout>
    )
  }
}

export default connect(state => {return{store: state}})(New);
