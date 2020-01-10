import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Form, Spinner, Row, Col } from 'react-bootstrap';
import TransactionModal from '../../TransactionModal/TransactionModal';
import { timeally, network } from '../../../env';
const ethers = require('ethers');

class NewNominee extends Component {
  state = {
    currentScreen: 0,
    nomineeAddress: '',
    nomineeShares: '',
    spinner: false,
    errorMessage: '',
    txHash: '',
    showNomineeTransactionModal: false
  };

  onFirstSubmit = async event => {
    event.preventDefault();
    //await this.props.store.timeallyInstance.functions.
    this.setState({ currentScreen: 1 });
  };

  confirmNomination = async () => {
    this.setState({ spinner: 1, errorMessage: '' });
    try {
      const tx = await this.props.store.timeallyInstance.functions.addNominee(
        this.props.match.params.id,
        this.state.nomineeAddress,
        this.state.nomineeShares
      );
      this.setState({ spinner: 2, txHash: tx.hash });
      await tx.wait();
      this.setState({ spinner: 0, currentScreen: 2 });
    } catch (err) {
      this.setState({ spinner: 0, errorMessage: err.message });
    }
  };

  render() {
    // console.log(this.props);
    let screen = (
      <Card>
        <Form className="custom-width" onSubmit={this.onFirstSubmit} style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', padding:'20px 40px', margin: '15px auto'}}>

          <h3 style={{marginBottom: '15px'}}>New Nominee - Step 1 of 2</h3>

          <p>
            Adding a nominee to your staking gives a partial access to your staking holdings to the nominee after 1 year of expiry of your staking plan and you havent withdrawn your holdings.
            And adding more nominees dilutes their partial access to your staking.&nbsp;
            <span onClick={() => this.props.history.push('/nominee')}>
              Please click here for more information.
            </span>
          </p>

          <Form.Group controlId="nomineeAddress">
            <Form.Control onKeyUp={ event => this.setState({ nomineeAddress: event.target.value }) } type="text" placeholder="Enter address of Nominee" style={{width: '325px'}} />
          </Form.Group>

        <Form.Group controlId="nomineeShares">
          <Form.Control onKeyUp={ event => this.setState({ nomineeShares: event.target.value }) } type="text" placeholder="Enter number of shares to be issued" style={{width: '325px'}} />
        </Form.Group>


          <Button variant="primary" id="firstSubmit" type="submit" disabled={!this.state.nomineeAddress || !this.state.nomineeShares || this.state.spinner}>
            Next
          </Button>
        </Form>
      </Card>
    );

    if(this.state.currentScreen === 1) {
      screen = (
        <Card>
          <Form style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', width: '500px', padding:'20px 40px', margin: '15px auto'}}>
            <h3 style={{marginBottom: '15px'}}>New Nominee - Step 2 of 2</h3>
            <p>Your new nominee address: {this.state.nomineeAddress}</p>
            <p>Your new nominee shares: {this.state.nomineeAddress}</p>
            <p>Total shares in staking after this: {}</p>

            {
              this.state.errorMessage
              ? <p>Error from blockchain: {this.state.errorMessage}</p>
              : null
            }

            <Row>
              <Col>
                <Button variant="secondary">Cancel this now</Button>
              </Col>

              <Col>
                <Button
                  variant="primary"
                  id="firstSubmit"
                  disabled={!this.state.nomineeAddress || !this.state.nomineeShares || this.state.spinner}
                  onClick={() => this.setState({ showNomineeTransactionModal: true, spinner: true })}
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
                  {
                    this.state.spinner ? 'Please wait...' : 'Confirm New Nominee'
                  }
                </Button>
              </Col>
            </Row>
            {
              this.state.txHash
              ? <p>You can view the transaction on <a href={`https://${network === 'homestead' ? '' : 'kovan.'}etherscan.io/tx/${this.state.txHash}`} rel="noopener noreferrer" style={{color: 'black'}}>EtherScan</a></p>
              : null
            }
          </Form>
        </Card>
      );
    } else if(this.state.currentScreen === 2) {
      screen = (
        <Card>
          <div style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', width: '500px', padding:'20px 40px', margin: '15px auto'}}>
            <h3>Nominee is added to your staking!</h3>
            <p>You can view the transaction on <a href={`https://${network === 'homestead' ? '' : 'kovan.' }etherscan.io/tx/${this.state.txHash}`} rel="noopener noreferrer" target="_blank" style={{color: 'black'}}>EtherScan</a></p>
          </div>
        </Card>
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
                        <li>Home</li>
                        {this.props.match.url.split('/').map(folder => (
                          folder ? <li>{folder}</li> : null
                        ) )}
                      </ol>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="bg-white pinside30">
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12">
                          <h1 className="page-title">New Nominee</h1>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* content start */}
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="wrapper-content bg-white pinside40">
                   <div className="bg-white section-space80">
                     <div className="container">


                     {screen}



                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TransactionModal
            show={this.state.showNomineeTransactionModal}
            hideFunction={() => this.setState({ showNomineeTransactionModal: false, spinner: false })}
            ethereum={{
              transactor: this.props.store.timeallyInstance.functions.addNominee,
              estimator: this.props.store.timeallyInstance.estimate.addNominee,
              contract: this.props.store.timeallyInstance,
              contractName: 'TimeAlly',
              arguments: [
                this.props.match.params.id,
                this.state.nomineeAddress,
                this.state.nomineeShares
              ],
              ESAmount: '0',
              headingName: 'New Nominee',
              functionName: 'New Nominee',
              stakingPlan: this.state.plan,
              directGasScreen: true,
              continueFunction: txHash => this.setState({
                spinner: false,
                currentScreen: 2,
                showNomineeTransactionModal: false,
                txHash
              })
            }}
          />
      </div>
    );
  }
}

export default connect(state => {return{store: state}})(NewNominee);
