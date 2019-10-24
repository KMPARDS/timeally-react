import React, { Component } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';

import Layout from '../Layout/Layout';

class CalculateSIP extends Component {
  state = {
    commitmentAmount: '',
    errorMessage: '',
    montlhyAmount: null
  };

  updateCommitment = async event => {
    try {
      if(String(+event.target.value) === 'NaN') throw new Error('Only Number is allowed');
      // console.log(+event.target.value, +event.target.value === NaN);
      this.setState({
        commitmentAmount: event.target.value,
        errorMessage: '',
        montlhyAmount: +event.target.value * 20 / 100
      });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

  }

  render = () => {
    const returns = [];
    console.log(this.state.monthlyAmount);
    for(let i = 1; i <= 108; i++) {
      let amount = this.state.montlhyAmount;
      // if(i%12 === 0) amount += (+this.state.commitmentAmount)*12/3;
      returns.push(
        <tr>
          <td>Month {i} Withdraw</td>
          <td>{amount} ES + 1% to introducer + 1% to tree{i%12 === 0 ? ` + power booster ${(+this.state.commitmentAmount)*12/3} ES` : ''}</td>
        </tr>
      );
    }

    return (
      <Layout
        breadcrumb={['Home', 'SIP', 'Calculate']}
        title="Calculate Your TimeAlly Super Goal"
      >
        <div style={{width: '325px', margin: 'auto'}}>
          <Form.Group controlId="sipCommitment">
            <Form.Control
              className="sipCommitment"
              onChange={this.updateCommitment}
              value={this.state.commitmentAmount}
              type="text"
              placeholder="Enter commitment amount"

            />
          </Form.Group>

          {this.state.errorMessage ? <Alert variant="danger">{this.state.errorMessage}</Alert> : null}
        </div>

        {this.state.montlhyAmount
          ? <>
          <p>Monthly returns after accumulation period: {this.state.montlhyAmount}</p>
          <table>
            {[1,2,3,4,5,6,7,8,9,10,11,12].map(number => (
              <tr>
                <td>Month {number} Deposit</td>
                <td><strong>{this.state.commitmentAmount} ES</strong> and {+this.state.commitmentAmount*5/100} ES to Introducer, {+this.state.commitmentAmount*5/100} ES to Tree</td>
              </tr>
            ))}
          </table>
          <table>
            {returns}
          </table>

          <p>Total Deposit by Staker: {+this.state.commitmentAmount * 12} ES</p>
          <p>Total Monthly to Staker: {this.state.montlhyAmount * 108} ES</p>
          <p>Power Booster to Staker: {+this.state.commitmentAmount * 12} ES</p>
          </>
          : null}

      </Layout>
    );
  }
}

export default CalculateSIP;
