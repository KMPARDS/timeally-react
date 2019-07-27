import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import Header from './Header';
import { esContract, timeally, network } from '../../../env';
import Modal from "react-responsive-modal";

const ethers = require('ethers');



class NewStaking extends Component {
  state = {
    currentScreen: 0,
    userAmount: 0,
    plan:0,
    spinner: false,
    waiting: false,
    txHash: '',
    open: false
  }

  componentDidMount=()=>{
    this.onOpenModal();
  }

  onAmountUpdate = event => {
    this.setState({ userAmount: event.target.value });
  }

  onPlanChange = event => {
    this.setState({ plan: event.target.value });
    console.log(event.target.value);
  }

  onFirstSubmit = async event => {
    event.preventDefault();

    await this.setState({ spinner: true });
    setTimeout(()=>{
      this.setState({ spinner: false, currentScreen: 1 });
    }, 300);
  }

  onApproveClick = async() => {
    console.log(this.props.store);
    console.log(this.props.store.walletInstance);
    // this.props.store.esInstance.connect(this.props.store.walletInstance);
    const contractWithSigner = new ethers.Contract(
      this.props.store.esInstance.address,
      esContract.abi, this.props.store.walletInstance);
    await this.setState({ spinner: true });
    const tx = await contractWithSigner.functions.approve(timeally.address, ethers.utils.parseEther(this.state.userAmount), {gasPrice: 10000000000});
    console.log(tx);
    await this.setState({ waiting: true });
    await tx.wait();
    this.setState({ spinner: false, waiting: false, currentScreen: 2 });
  }

  stakeNowClick = async() => {
    const contractWithSigner = new ethers.Contract(
      timeally.address,
      timeally.abi, this.props.store.walletInstance);
    await this.setState({ spinner: true });
    const tx = await contractWithSigner.functions.newStaking(
      ethers.utils.parseEther(this.state.userAmount), this.state.plan, {gasLimit: 7000000, gasPrice: 10000000000});
    console.log(tx);
    await this.setState({ waiting: true, txHash: tx.hash });
    await tx.wait();
    this.setState({ spinner: false, waiting: false, currentScreen: 3 });
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {

    if(this.state.currentScreen === 0) {
      return (
        
        <Header>
           <Modal open={this.state.open} onClose={this.onCloseModal}>
                  <h2>Terms & Conditions</h2>
                  <div style={{overflowY:'scroll', height:'500px'}}>
                  <p style={{fontSize:'12px'}}>
                  The Eraswapfoundation OU is a group of developers and technology professionals who are passionate
                    about the potential of decentralized applications. It does not own or lead the TimeAlly ("TimeAlly"), but
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
                    TimeAlly is a DApp which refers to a suite of protocols using decentralized application. TimAlly is a
                    decentralized application whish run on P2P network of computers. TimeALLY uses Ethereum Virtual
                    Machine (“EVM”), which can execute code of arbitrary algorithmic complexity. TimeAlly uses distributed
                    ledger technology which is neither stored in a centralized location nor managed by any single entity.<br></br><br></br>
                    The New Released Token (NRT) distribution, Vesting, rewards are completely governed by TimeAlly
                    DApp as per the predefined rules which is system driven & by the user itself. No organization, institute,
                    human or personnel intervention is authorized to control or alter or modify the system driven software<br></br><br></br>

                    <span style={{fontWeight:'bold'}}>Important Guidelines for Users about TimeAlly DAPP</span><br></br><br></br>
                    1. The user should carefully review the whitepaper and website content of TimeAlly DApp to
                    familiarize with the Smart Contract logics & Vesting plans.<br></br><br></br>
                    2. The User should understand, acknowledge that vesting in TimeAlly are subject to market risks
                    and no assurance on the valuation & its returns since it depends solely on the user itself &
                    distribution is governed by DApp .<br></br><br></br>
                    3. The Users should read carefully about the vesting plans and completely understands the risk
                    factors associated with the vesting plans on the date of the transaction and thereafter. The user
                    should consider their specific requirements before choosing any vesting plan with TimeAlly
                    DApp.<br></br><br></br>
                    4. The Users are advised that the vesting in TimeAlly is based and dependent on the submission of
                    information by user and the User shall be solely responsible for any submission of incorrect or
                    non-submission/omission of necessary and accurate information. The User confirms and
                    believes that transaction/s undertaken is/are appropriate for the User as per the objective of
                    the User.<br></br><br></br>
                    5. The User should confirm that the decision for vesting, claiming or undertaking any transaction
                    on the TimeAlly DApp is taken with complete knowledge & ownership with user itself. <br></br><br></br>
                    The User should recognize vesting in Time Ally involves certain risks and will take full cognizance
                    of and understand all of the risk factors related before investing in Time Ally Contracts<br></br><br></br>
                    7. The User should understand and accept complete responsibility & liability for any damages or
                    losses, however caused, in connection with the vesting, use of, or on the reliance of DApp. <br></br><br></br>
                    8. Do not participate in offerings where one or more people offer you a guaranteed return in
                    exchange for an upfront deposit. The end result is that usually a lot of people loose a lot.
                    Guarantee is given on something which you control or hold. TimeAlly Vault holds the token
                    allocated from NRT every month. Thus the guarantee can be given by Smart Contract as they
                    hold all the tokens which will be released over next 50 years. It can guarantee only the release
                    of Era Swap (ES) from NRT Pool. Because all tokens which are to be released in future are stored
                    in vault and are distributed based on the work performed by the users among them<br></br><br></br>
                    9. Era Swap doesn’t guarantees any Fiat or Crypto because Era Swap doesn’t control any Fiat or
                    any other cryptocurrency. Era Swap token (ES) can only be used in the Eco System. ES can not be
                    used outside Era swap Ecosystem.<br></br><br></br>
                    10. The User can claim rewards based on the work performed in the ecosystem or vesting done in
                    TimeAlly. As per preset rules, if the user has performed tasks, then they are eligible for rewards.
                    In this case only, user can come and withdraw from TimeAlly DApp. The users will be solely
                    responsible for claiming the rewards.<br></br><br></br>
                    11. Phishing websites often go hand-in-hand with phishing emails. Phishing emails can link to a
                    replica website designed to steal login credentials or prompt one to install malware. Do not
                    install software or log in to a website unless you are 100% sure it isn't a fake one. Phishing
                    websites may also appear as sponsored results on search engines or in app marketplaces used
                    by mobile devices. Be wary that you aren't downloading a fake app or clicking a sponsored link
                    to a fake website. It is completely on User’s risk and the user is only liable for any such activity.<br></br><br></br>
                    No warranties<br></br><br></br>
                    The TimeAlly DApp is opted by users on an "as is" basis without any warranties of any kind regarding the
                    Website interface and/or any content, data, materials and/or services provided on the Website.<br></br><br></br>
                    THE TIMEALLY DAPP SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                    PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
                    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
                    CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
                    OR THE USE OR OTHER DEALINGS IN THE SOFTWARE<br></br><br></br>
                    <a  class="btn btn-primary btn-sm">Create Wallet</a>
                  </p>
                  </div>
                </Modal>
        <Card>
          <Form onSubmit={this.onFirstSubmit} style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', width: '400px', padding:'20px 40px', margin: '15px auto'}}>

            <h3 style={{marginBottom: '15px'}}>New Staking - Step 1 of 3</h3>

            <Form.Group controlId="stakingAmount">
              <Form.Control onKeyUp={this.onAmountUpdate} type="text" placeholder="Enter amount to stake" style={{width: '325px'}} />

              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control as="select" onChange={this.onPlanChange}>
                  <option value="0">1 Year</option>
                  <option value="1">2 Year</option>
                </Form.Control>
              </Form.Group>
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
        </Header>
      );
    } else if(this.state.currentScreen === 1) {
      return (
        <Header>
        <Card>
          <div style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', width: '400px', padding:'20px 40px', margin: '15px auto'}}>
            <h3 style={{marginBottom: '15px'}}>New Staking - Step 2 of 3</h3>
            <Button onClick={this.onApproveClick} disabled={this.state.spinner}>
              {this.state.spinner ?
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{marginRight: '2px'}}
              /> : null}
              {this.state.waiting ? 'Waiting for confirmation' : ( this.state.spinner ? 'Sending transaction' : 'Approve TimeAlly')}
            </Button>
          </div>
        </Card>
        </Header>
      );
    } else if(this.state.currentScreen === 2) {
      return (
        <Header>
        <Card>
          <div style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', width: '400px', padding:'20px 40px', margin: '15px auto'}}>
            <h3 style={{marginBottom: '15px'}}>New Staking - Step 3 of 3</h3>
            <p>Please click the following button to confirm your staking.</p>
            <Button onClick={this.stakeNowClick} disabled={this.state.spinner}>
              {this.state.spinner ?
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{marginRight: '2px'}}
              /> : null}
              {this.state.waiting ? 'Waiting for confirmation' : ( this.state.spinner ? 'Sending transaction' : 'Stake')}
            </Button>
            { this.state.txHash
              ? <p>You can view your transaction on <a href={`https://${network}.etherscan.io/tx/${this.state.txHash}`} target="_blank" rel="noopener noreferrer">EtherScan</a>.</p>
              : null
            }
          </div>
        </Card>
        </Header>
      );
    } else {
      return (
        <Header>
        <Card>
          <div style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', width: '400px', padding:'20px 40px', margin: '15px auto'}}>
            <h3 style={{marginBottom: '15px'}}>Staking created!</h3>
            <p>Your staking is done. You can view your transaction on <a href={`https://${network}.etherscan.io/tx/${this.state.txHash}`} target="_blank" rel="noopener noreferrer">EtherScan</a></p>
          </div>
        </Card>
        </Header>
      );
    }
  }
}

export default connect(state => {return{store: state}})(NewStaking)
