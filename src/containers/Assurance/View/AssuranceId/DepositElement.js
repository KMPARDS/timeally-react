import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class DepositElement extends Component {
  state = {
    status: null,
    text: 'Loading...',
    showDepositButton: false,
    showTimer: false,
    timerSeconds: 0,
    displayText: '',
    currentTimestamp: 0,
    loading: true
  };

  componentDidMount = async() => {
    const status = (await this.props.store.sipInstance.functions.getDepositDoneStatus(
      this.props.store.walletInstance.address,
      this.props.sipId,
      this.props.monthId
    )).toNumber();
    // console.log(status);
    this.setState({ status, loading: false });

    this.intervalId = setInterval(() => {
      this.setState({ currentTimestamp: Math.floor(Date.now()/1000) })
    }, 1000);
  };

  render = () => {
    const dueTimestampOfThisMonth = this.props.stakingTimestamp + 2629744 * (this.props.monthId - 1);

    let showDepositButton = false, showTimer = false,
    timerSeconds = 0, displayText = '', status = '';
    // console.log(this.props.monthId, dueTimestampOfThisMonth, currentTimestamp);
    if(dueTimestampOfThisMonth > this.state.currentTimestamp + 2629744) {
      // too early
      showTimer = true;
      displayText = 'Deposit window will be open after';
      // show timer of when deposit starts
      timerSeconds = dueTimestampOfThisMonth - 2629744 - this.state.currentTimestamp;
      status = 'Deposit later';
    } else if(dueTimestampOfThisMonth > this.state.currentTimestamp) {
      // on time
      if(this.state.status === 2) {
        showTimer = false;
        displayText = 'Deposited on time';
        status = 'On-time deposit done';
      } else if(this.state.status === 1) {
        showTimer = false;
        displayText = 'Deposited during grace';
        status = 'Grace deposit done';
      } else {
        showTimer = true;
        showDepositButton = true;
        displayText = 'To avoid grace penalty, deposit before';
        // show timer of ontime due date
        timerSeconds = dueTimestampOfThisMonth - this.state.currentTimestamp;
        status = 'Deposit pending';
      }
    } else if(dueTimestampOfThisMonth + 864000 > this.state.currentTimestamp) {
      // grace period
      if(this.state.status === 2) {
        showTimer = false;
        displayText = 'Deposited on time';
        status = 'On-time deposit done';
      } else if(this.state.status === 1) {
        showTimer = false;
        displayText = 'Deposited during grace';
        status = 'Grace deposit done';
      } else {
        showTimer = true;
        showDepositButton = true;
        displayText = 'To avoid default penalty, deposit before';
        status = 'Deposit pending';
      }
      // show timer of when grace period finishes
      timerSeconds = dueTimestampOfThisMonth + 864000 - this.state.currentTimestamp;
    } else {
      // old month
      if(this.state.status === 2) {
        displayText = 'Deposited on time';
        status = 'On-time deposit done';
      } else if(this.state.status === 1) {
        displayText = 'Deposited during grace';
        status = 'Grace deposit done';
      } else {
        displayText = 'Defaulted';
        status = 'Deposit defaulted';
      }
    }

    return (
      <tr>
        <td>{this.props.monthId}</td>
        <td>{this.props.depositAmount ? this.props.depositAmount+' ES' : '-'}</td>
        <td>{status}</td>
        <td>{!this.state.loading
          ? <>
            {displayText}<br />
            {showTimer ? <>{window.getTimeRemaining(timerSeconds)}</> : null}<br />
            {showDepositButton
              ? <Button
                  className="mt-2"
                  onClick={() => this.props.history.push(this.props.location.pathname+'/deposit/'+this.props.monthId)}
                >
                  Deposit
                </Button>
              : null}
            </>
          : 'Loading...'}
          </td>
      </tr>
    )
  };
}

export default connect(state => {return{store: state}})(DepositElement);
