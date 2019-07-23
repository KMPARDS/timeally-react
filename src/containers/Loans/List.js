import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { timeally } from '../../env';
const ethers = require('ethers');

class LoanList extends Component {
  state = {
    loans: [],
    month: 0,
    benefit: {},
    errorMessage: '',
    withdrawing: false,
    withdrawable: true
  }

  componentDidMount = async () => {
    this.showLoans();
    this.setState({ month: (await this.props.store.timeallyInstance.functions.getCurrentMonth()).toNumber() })
  };

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
      <div>
            <div className="page-header">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="page-breadcrumb">
                      <ol className="breadcrumb">
                        <li><a>Home</a></li>
                        <li>Loans</li>
                      </ol>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="bg-white pinside30">
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12">
                          <h1 className="page-title">Loans</h1>
                        </div>

                        <div className="col-xl-8 col-lg-8 col-md-3 col-sm-12 col-12">
                          <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="btn-action">
                              <Button onClick={() => this.props.history.push('/loans/new')}>Apply for Loan</Button>
                              </div>
                            </div>
                          </div>
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

                    {this.state.loans.map( (loan, index) => (
                      <div key={`loan-${index}`}>
                        <p><strong>LoanId:</strong> {loan.loanId} - <strong>Plan:</strong> 2 month / 1% and <strong>Amount:</strong> {loan.amount} ES at <strong>Time:</strong> {new Date(loan.timestamp * 1000).toLocaleString()}</p>

                      </div>
                    ))}

                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => {return{store: state}})(LoanList);
