import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import Header from './Header';
import { esContract, timeally, network } from '../../../env';

const ethers = require('ethers');



class NewStaking extends Component {
  state = {
    currentScreen: 0,
    userAmount: 0,
    plan:0,
    spinner: false,
    waiting: false,
    txHash: ''
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

  render() {

    if(this.state.currentScreen === 0) {
      return (
        <Header>
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
