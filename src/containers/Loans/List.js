import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import Layout from '../Layout/Layout';
import { timeally } from '../../env';
const ethers = require('ethers');

class LoanList extends Component {
  state = {
    loans: [],
    month: 0,
    benefit: {},
    errorMessage: '',
    withdrawing: false,
    withdrawable: true,
    currentTimestamp: Math.floor(Date.now() / 1000)
  }

  intervalId = null;

  componentDidMount = async () => {
    this.showLoans();
    this.setState({ month: (await this.props.store.timeallyInstance.functions.getCurrentMonth()).toNumber() })

    this.intervalId = setInterval(() => {
      this.setState({ currentTimestamp: Math.floor(Date.now() / 1000) });
    }, 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.intervalId);
  }

  showLoans = async () => {
    const newLoanEventSig = ethers.utils.id("NewLoan(address,uint256,uint256,uint256,uint256)");
    const topics = [ newLoanEventSig, ethers.utils.hexZeroPad(this.props.store.walletInstance.address, 32) ];

    const logs = await this.props.store.providerInstance.getLogs({
      address: timeally.address,
      fromBlock: 0,
      toBlock: 'latest',
      topics
    });

    const loans = [];
    for(let i = logs.length - 1; i >= 0; i--) {
      const log = logs[i];
      //const address = log.topics[1].slice(0,2) + log.topics[1].slice(26,log.topics[1].length);
      const amount = ethers.utils.bigNumberify( '0x' + log.data.slice(2,66) );
      const loanInterest = ethers.utils.bigNumberify( '0x' + log.data.slice(66,130) );
      const loanId = Number( '0x' + log.data.slice(130,194) );
      const timestamp = (await this.props.store.providerInstance.getBlock(log.blockNumber)).timestamp;
      loans.push({
        planId: ethers.utils.bigNumberify(log.topics[2]).toNumber(),
        amount: ethers.utils.formatEther(amount),
        loanInterest: ethers.utils.formatEther(loanInterest),
        loanId,
        timestamp
      });
      //console.log(`${ethers.utils.formatEther(amount)}, ${ethers.utils.formatEther(loanInterest)}, ${loanId}`);
    }

    this.setState({ loans });

    console.log('fetching logs from the ethereum blockchain', logs);
  }


  render() {
    return (
      <Layout
        breadcrumb={['Home', 'Loans', 'View']}
        title="TimeAlly Loans View"
        transparent={true}
        buttonName="New Loan"
        buttonOnClick={this.props.store.walletInstance && this.props.store.walletInstance.address
          ? () => this.props.history.push('/loans/new')
          : () => (
            window.returnLocationAfterLoadWallet={
              name:'New Loans',
              location:'/loans/new',
              sourceLocation:this.props.location.pathname
            },this.setState({showLoginModal:true})
          )}
      >
        <Table responsive>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Time of Loan</th>
              <th>Loan Plan</th>
              <th>Amount</th>
              <th>Due</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {this.state.loans.map( (loan, index) => (
            <LoanRow
              key={`loan-${index}`}
              loan={loan}
              history={this.props.history}
              store={this.props.store}
              currentTimestamp={this.state.currentTimestamp}
            />
          ))}
          </tbody>
        </Table>
      </Layout>
    );
  }
}

class LoanRow extends Component {
  state = {
    isActive: true
  };

  componentDidMount = async() => {
    const loanObj = await this.props.store.timeallyInstance.functions.loans(
      this.props.store.walletInstance.address,
      this.props.loan.loanId
    );

    this.setState({ isActive: loanObj[3].eq(1) });
  };

  render = () => (
    <tr>
     <td>{this.props.loan.loanId}</td>
     <td>{new Date(this.props.loan.timestamp * 1000).toLocaleString()}</td>
     <td>2 month / 1%</td>
     <td>{this.props.loan.amount} ES</td>
     <td>{window.getTimeRemaining(this.props.loan.timestamp + 2629744 * 2 - this.props.currentTimestamp)}</td>
     <td>
       <Button
        onClick={() => this.props.history.push('/loans/view/repay/'+this.props.loan.loanId)}
        disabled={!this.state.isActive}
      >
         {this.state.isActive ? 'Repay' : 'Repayed'}
       </Button>
     </td>
    </tr>
  );
}

export default connect(state => {return{store: state}})(LoanList);
