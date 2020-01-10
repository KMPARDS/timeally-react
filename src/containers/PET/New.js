import React, { Component } from 'react';
import { Button, Card, Form, Spinner, Alert, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import Layout from '../Layout/LayoutPET';
import TransactionModal from '../TransactionModal/TransactionModal';
import { esContract, PET, network } from '../../env';

const ethers = require('ethers');

class New extends Component {
  state = {
    currentScreen: 0,
    userAmount: undefined,
    step1DisplayButton: false,
    plan: undefined,
    spinner: false,
    waiting: false,
    approveTxHash: '',
    txHash: '',
    open: false,
    errorMessage: '',
    showNewPetTransactionModal: false,
    targetDepositAmount: null
  }

  componentDidMount= async() => {
    this.onOpenModal();
  }

  onPlanChange = event => {
    this.setState({ plan: +event.target.value });
    // console.log(event);
    // this.checkAmount();
  }

  // checkAmount = () => {
  //   if(this.state.plan !== undefined) {
  //     let isOk = false;
  //     const amountBN = ethers.utils.parseEther(this.state.userAmount);
  //     if(this.state.plan === 0) {
  //       if(amountBN.gte('1000') && amountBN.lt('2000')) throw 'Amount should be from 1000 to 1999';
  //     } else if(this.state.plan === 1) {
  //       if(amountBN.gte('2000') && amountBN.lt('5000')) throw 'Amount should be from 2000 to 4999';
  //     } else if(this.state.plan === 2) {
  //       if(amountBN.gte('5000') && amountBN.lt('10000')) throw 'Amount should be from 5000 to 9999';
  //     } else if(this.state.plan === 3) {
  //       if(amountBN.gte('10000') && amountBN.lt('20000')) throw 'Amount should be from 10000 to 19999';
  //     } else if(this.state.plan === 4) {
  //       if(amountBN.gte('20000')) throw 'Amount should be atleast 20000';
  //     }
  //   }
  // };

  onAmountUpdate = event => {
    try {
      const amountBN = ethers.utils.parseEther(event.target.value);
      // this.checkAmount();
      this.setState({ userAmount: ethers.utils.formatEther(amountBN), errorDisplay: false, errorDisplayText: '' });
    } catch (error) {
      console.log(error.message);
      this.setState({ userAmount: '', errorDisplay: true, errorDisplayText: error.message })
    }
  }

  onFirstSubmit = async event => {
    event.preventDefault();

    await this.setState({ spinner: true, errorDisplay: false, errorDisplayText: '' });

    const petPlan = await this.props.store.petInstance.functions.petPlans(this.state.plan);

    if(ethers.utils.parseEther(this.state.userAmount).gte(petPlan.minimumMonthlyCommitmentAmount)) {
      this.setState({
        spinner: false,
        currentScreen: 1,
        // targetDepositAmount: ethers.utils.formatEther(petPlan.minimumMonthlyCommitmentAmount)
      });
    } else {
      this.setState({
        spinner: false,
        errorDisplay: true,
        errorDisplayText:  `Low Contribution Amount: Your entered self contribution ${this.state.userAmount} ES should be more than minimum self contribution target ${ethers.utils.formatEther(petPlan.minimumMonthlyCommitmentAmount)} ES for the selected plan`
      });
    }
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    let screen;

    const startOverAgainButton = (
      <span style={{display:'block', textAlign:'left', cursor: 'pointer'}} onClick={() => this.setState({ currentScreen: 0 })}>{'<'}Start All Over</span>
    );

    if(this.state.currentScreen === 0) {
      screen = (
          <>
           {/* <button className="btn" onClick={this.onOpenModal}>Open modal</button> */}
           <Modal show={this.state.open}>
              <div style={{padding: '2rem'}}>
                  <h2>Terms & Conditions</h2>
                  <h5>Please scroll and read the complete document carefully, then if you agree then you can select proceed option.</h5>
                  <hr></hr>
                  <div style={{overflowY:'scroll', height:'500px'}}>
                  <p style={{fontSize:'12px'}}>
                  The Eraswapfoundation OU is a group of developers and technology professionals who are passionate
                    about the potential of decentralized applications. It does not own or lead the TimeAllyPET ("TimeAllyPET"), but
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
                    TimeAllyPET is a DApp which refers to a suite of protocols using decentralized application. TimAlly is a
                    decentralized application whish run on P2P network of computers. TimeAllyPET uses Ethereum Virtual
                    Machine (“EVM”), which can execute code of arbitrary algorithmic complexity. TimeAllyPET uses distributed
                    ledger technology which is neither stored in a centralized location nor managed by any single entity.<br></br><br></br>
                    The New Released Token (NRT) distribution, Vesting, rewards are completely governed by TimeAllyPET
                    DApp as per the predefined rules which is system driven & by the user itself. No organization, institute,
                    human or personnel intervention is authorized to control or alter or modify the system driven software<br></br><br></br>

                    <span style={{fontWeight:'bold'}}>Important Guidelines for Users about TimeAllyPET DAPP</span><br></br><br></br>
                    1. The user should carefully review the whitepaper and website content of TimeAllyPET DApp to
                    familiarize with the Smart Contract logics & PET plans.<br></br><br></br>
                    2. The User should understand, acknowledge that assuring in TimeAllyPET are subject to market risks
                    and no PET on the valuation & its returns since it depends solely on the user itself &
                    distribution is governed by DApp .<br></br><br></br>
                    3. The Users should read carefully about the vesting plans and completely understands the risk
                    factors associated with the vesting plans on the date of the transaction and thereafter. The user
                    should consider their specific requirements before choosing any PET plan with TimeAllyPET
                    DApp.<br></br><br></br>
                    4. The Users are advised that the assuring in TimeAllyPET is based and dependent on the submission of
                    information by user and the User shall be solely responsible for any submission of incorrect or
                    non-submission/omission of necessary and accurate information. The User confirms and
                    believes that transaction/s undertaken is/are appropriate for the User as per the objective of
                    the User.<br></br><br></br>
                    5. The User should confirm that the decision for vesting, claiming or undertaking any transaction
                    on the TimeAllyPET DApp is taken with complete knowledge & ownership with user itself. <br></br><br></br>
                    The User should recognize vesting in Time Ally involves certain risks and will take full cognizance
                    of and understand all of the risk factors related before investing in Time Ally Contracts<br></br><br></br>
                    7. The User should understand and accept complete responsibility & liability for any damages or
                    losses, however caused, in connection with the vesting, use of, or on the reliance of DApp. <br></br><br></br>
                    8. Do not participate in offerings where one or more people offer you a guaranteed return in
                    exchange for an upfront deposit. The end result is that usually a lot of people loose a lot.
                    Guarantee is given on something which you control or hold. TimeAllyPET Vault holds the token. Thus the guarantee can be given by Smart Contract as they
                    hold all the tokens which will be released over next 50 years. It can guarantee only the release
                    of Era Swap (ES) from NRT Pool. Because all tokens which are to be released in future are stored
                    in vault and are distributed based on the work performed by the users among them<br></br><br></br>
                    9. Era Swap doesn’t guarantees any Fiat or Crypto because Era Swap doesn’t control any Fiat or
                    any other cryptocurrency. Era Swap token (ES) can only be used in the Eco System. ES can not be
                    used outside Era swap Ecosystem.<br></br><br></br>
                    10. The User can claim rewards based on the work performed in the ecosystem or vesting done in
                    TimeAllyPET. As per preset rules, if the user has performed tasks, then they are eligible for rewards.
                    In this case only, user can come and withdraw from TimeAllyPET DApp. The users will be solely
                    responsible for claiming the rewards.<br></br><br></br>
                    11. Phishing websites often go hand-in-hand with phishing emails. Phishing emails can link to a
                    replica website designed to steal login credentials or prompt one to install malware. Do not
                    install software or log in to a website unless you are 100% sure it isn't a fake one. Phishing
                    websites may also appear as sponsored results on search engines or in app marketplaces used
                    by mobile devices. Be wary that you aren't downloading a fake app or clicking a sponsored link
                    to a fake website. It is completely on User’s risk and the user is only liable for any such activity.<br></br><br></br>
                    No warranties<br></br><br></br>
                    The TimeAllyPET DApp is opted by users on an "as is" basis without any warranties of any kind regarding the
                    Website interface and/or any content, data, materials and/or services provided on the Website.<br></br><br></br>
                    THE TIMEALLYPET DAPP SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                    PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
                    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
                    CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
                    OR THE USE OR OTHER DEALINGS IN THE SOFTWARE<br></br><br></br>
                    <a onClick={this.onCloseModal}  className="btn btn-primary btn-sm"><span className="text-white">Proceed</span></a>
                  </p>
                  </div>
                </div>
              </Modal>
        <Card style={{marginBottom:'0'}}> 

        <div style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', padding:'20px 40px', margin: '15px'}}>

          <Form className="mnemonics custom-width" onSubmit={this.onFirstSubmit} style={{borderRadius: '.25rem', padding:'20px 40px', margin: '15px auto'}}>
            <h3 style={{marginBottom: '15px'}}>New PET Contract - Step 1 of 2</h3>

            <Form.Group controlId="PETAmount">
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control as="select" onChange={this.onPlanChange} className="width-100">
                  <option disabled selected={this.state.plan === undefined}>Select PET Plan</option>
                  <option value="0" selected={this.state.plan === 0}>ID: 0) Self Contribution 500+ ES / Month</option>
                  <option value="1" selected={this.state.plan === 1}>ID: 1) Self Contribution 1000+ ES / Month</option>
                  <option value="2" selected={this.state.plan === 2}>ID: 2) Self Contribution 2500+ ES / Month</option>
                  <option value="3" selected={this.state.plan === 3}>ID: 3) Self Contribution 5000+ ES / Month</option>
                  <option value="4" selected={this.state.plan === 4}>ID: 4) Self Contribution 10000+ ES / Month</option>
                </Form.Control>
              </Form.Group>

              <Form.Control
                className="stakingInput"
                onChange={this.onAmountUpdate}
                // value={this.state.userAmount}
                type="text"
                autoComplete="off"
                placeholder="Enter Self ES Monthly Deposit Target"
                style={{width: '325px'}}
                isInvalid={this.state.errorDisplay}
              />

              {this.state.errorDisplayText ? <p style={{color: this.state.errorDisplay ? 'red' : 'green', textAlign: 'left'}}>{this.state.errorDisplayText}</p> : null}
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
          </div>
        </Card>
        </>
      );
    } else if(this.state.currentScreen === 1) {
      const halfTarget = ethers.utils.formatEther(ethers.utils.parseEther(this.state.userAmount));
      const fullTarget = ethers.utils.formatEther(ethers.utils.parseEther(this.state.userAmount).mul(2));
      const lumSum = ethers.utils.formatEther(ethers.utils.parseEther(this.state.userAmount).mul(12));
      let annuityPercentage = '';
      switch(this.state.plan) {
        case 0:
          annuityPercentage = '10.0%';
          break;
        case 1:
          annuityPercentage = '10.5%';
          break;
        case 2:
          annuityPercentage = '11.0%';
          break;
        case 3:
          annuityPercentage = '11.5%';
          break;
        case 4:
          annuityPercentage = '12.0%';
          break;
      }
      screen = (
        <>
        <Card style={{marginBottom:'0'}}>
          <div style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', padding:'20px 40px', margin: '15px'}}>
            {startOverAgainButton}
            <h3 style={{marginBottom: '15px'}}>New PET Contract - Step 2 of 2</h3>
            <p>You are initiating a PET of <b>{fullTarget} ES</b> with a self commitment of <b>{halfTarget} ES</b> and PET contribution of <b>{halfTarget} ES</b> with plan id <b>{this.state.plan}</b> where in you are entitled to receive <b>{annuityPercentage}</b> as annuity of ES accumulated for the month and <b>12 booster bonus ES</b>. This means when you deposit at least <b>{halfTarget} ES</b> within 30 days and 10 hours in your PET, your PET contributes another <b>{halfTarget} ES</b> for you and making your deposit <b>{fullTarget} ES</b> for that month. You can also checkout fee based LumpSum deposit options of Quarterly, Half Yearly and Annual Deposit Frequency Mode.</p>

            <p>This is only a PET initiation transaction. While initiating a new PET, you do not need to transfer any ES. After your <u>New PET</u> transaction is done (by below button), you will be able to see it in your <u>View PETs</u> page and there you can make deposit to it within 30 days and 10 hours for it to be counted in first month.</p>

            <p>Please click the following button to confirm your PET.</p>
              {
                this.state.errorMessage
                ? <Alert variant="danger">
                    {this.state.errorMessage}
                  </Alert>
                : null
              }
            <Button onClick={() => {
                  this.setState({ showNewPetTransactionModal: true, spinner: true });
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
              {this.state.waiting ? 'Waiting for confirmation' : ( this.state.spinner ? 'Sending transaction' : 'Confirm PET')}
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
          <Card style={{marginBottom:'0'}}>
            <div className="custom-width" style={{borderRadius: '.25rem', padding:'20px 40px', margin: '15px auto'}}>
              <h3 style={{marginBottom: '15px'}}>PET confirmed!</h3>
              <Alert variant="success">Your PET is initiated. You can view your transaction on <a style={{color: 'black'}} href={`https://${network === 'homestead' ? '' : 'kovan.'}etherscan.io/tx/${this.state.txHash}`} target="_blank" rel="noopener noreferrer">EtherScan</a>. You are yet to make a deposit and you can do this from your View PET page.</Alert>
              <Button onClick={() => this.props.history.push('/pet/view')}>Go to View PETs</Button>
            </div>
          </Card>

        </>
      );
    }

    return (
      <Layout
        breadcrumb={['Home', 'PET', 'New']}
        title='ES PET Contract'
        subtitle='1 Year Accumulation - 5 Year Annuity'
        buttonName='Calculator Excel'
        buttonOnClick={window.open.bind(null, '/excel/PET_Calculator.xlsx')}
      >
        {screen}
        <TransactionModal
            show={this.state.showNewPetTransactionModal}
            hideFunction={() => this.setState({ showNewPetTransactionModal: false, spinner: false })}
            ethereum={{
              transactor: this.props.store.petInstance.functions.newPET,
              estimator: this.props.store.petInstance.estimate.newPET,
              contract: this.props.store.petInstance,
              contractName: 'TimeAllyPET',
              arguments: [
                this.state.plan,
                ethers.utils.parseEther(this.state.userAmount || '0')
              ],
              ESAmount: '0.0',
              headingName: 'New PET',
              functionName: 'New PET',
              // stakingPlan: this.state.plan,
              directGasScreen: true,
              continueFunction: txHash => this.setState({
                spinner: false,
                currentScreen: 2,
                showNewPetTransactionModal: false,
                txHash
              })
            }}
          />
      </Layout>
    )
  }
}

export default connect(state => {return{store: state}})(New);
