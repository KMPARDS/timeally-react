import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Form, Alert, Button, Row, Col, Spinner } from 'react-bootstrap';
import { network } from '../../../../env';
import Layout from '../../../Layout/Layout';
import TransactionModal from '../../../TransactionModal/TransactionModal';

const ethers = require('ethers');

class NewNominee extends Component {
  state = {
    currentScreen: 0,
    nomineeAddress: '',
    isAddressInvalid: false,
    showNomineeTransactionModal: false,
    spinner: false,
    txHash: ''
  };

  render = () => {
    let screen = (
      <Card>
        <Form className="custom-width" style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', padding:'20px 40px', margin: '15px auto'}}>

          <h3 style={{marginBottom: '15px'}}>New Nominee - Step 1 of 2</h3>

          <p>
            Adding a nominee to your staking gives access to your unwithdrawn SIP benefits to the nominee delayed for 1 year.
            &nbsp;
          </p>

          <Form.Group controlId="nomineeAddress">
            <Form.Control
              onKeyUp={event => {
                try {
                  this.setState({
                    nomineeAddress: ethers.utils.getAddress(event.target.value),
                    isAddressInvalid:false
                  });
                } catch (error) {
                  this.setState({isAddressInvalid:Boolean(event.target.value)});
                }

              }}
              type="text"
              placeholder="Enter ETH address of Nominee"
              style={{width: '325px'}}
              autoComplete="off"
            />
          </Form.Group>
          {this.state.isAddressInvalid ? <Alert variant="danger">Address is invalid</Alert> : null}

          <Button
            variant="primary"
            type="submit"
            disabled={!this.state.nomineeAddress || this.state.isAddressInvalid || this.state.spinner}
            onClick={() => this.setState({ currentScreen: 1 })}
          >
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

            <Row>
              <Col>
                <Button
                  variant="secondary"
                  onClick={() => this.setState({ currentScreen: 0 })}
                >
                  Go Back
                </Button>
              </Col>

              <Col>
                <Button
                  variant="primary"
                  id="firstSubmit"
                  disabled={this.state.spinner}
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
            <h3>Confirmed!</h3>
            <Alert variant="success">Nominee is added to your SIP!</Alert>
            <p>You can view the transaction on <a href={`https://${network === 'homestead' ? '' : 'kovan.' }etherscan.io/tx/${this.state.txHash}`} rel="noopener noreferrer" target="_blank" style={{color: 'black', textDecoration: 'underline', cursor:'pointer'}}>EtherScan</a> or you can go back to <span onClick={() => {
              const pathArray = this.props.location.pathname.split('/');
              pathArray.pop();
              this.props.history.push(pathArray.join('/'));
            }} style={{color: 'black', textDecoration: 'underline', cursor:'pointer'}}>nominees page</span>.</p>
          </div>
        </Card>
      );
    }

    return (
      <Layout
        breadcrumb={['Home', 'Assurance','View', this.props.match.params.id, 'Nominee', 'New']}
        title='New Nominee'
      >
        {screen}

        <TransactionModal
            show={this.state.showNomineeTransactionModal}
            hideFunction={() => this.setState({ showNomineeTransactionModal: false, spinner: false })}
            ethereum={{
              transactor: this.props.store.sipInstance.functions.toogleNominee,
              estimator: this.props.store.sipInstance.estimate.toogleNominee,
              contract: this.props.store.sipInstance,
              contractName: 'TimeAllySIP',
              arguments: [
                this.props.match.params.id,
                this.state.nomineeAddress,
                true
              ],
              ESAmount: '0',
              headingName: 'Toggle Nominee',
              functionName: 'Toggle Nominee',
              directGasScreen: true,
              continueFunction: txHash => this.setState({
                spinner: false,
                currentScreen: 2,
                showNomineeTransactionModal: false,
                txHash
              })
            }}
          />
      </Layout>
    );
  }
}

export default connect(state => {return{store: state}})(NewNominee);
