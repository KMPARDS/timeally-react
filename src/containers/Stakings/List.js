import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { timeally } from '../../env';
const ethers = require('ethers');

class StakingList extends Component {
  state = {
    stakings: [],
    month: 0,
    benefit: {},
    errorMessage: '',
    withdrawing: false,
    withdrawable: true
  }

  componentDidMount = async () => {
    this.showStakings();
    this.setState({ month: (await this.props.store.timeallyInstance.functions.getCurrentMonth()).toNumber() })
  };

  showStakings = async () => {
    const newStakingEventSig = ethers.utils.id("NewStaking(address,uint256,uint256,uint256)");
    const topics = [ newStakingEventSig, ethers.utils.hexZeroPad(this.props.store.walletInstance.address, 32) ];

    const logs = await this.props.store.providerInstance.getLogs({
      address: timeally.address,
      fromBlock: 0,
      toBlock: 'latest',
      topics
    });

    const stakings = [];
    for(let i = logs.length - 1; i >= 0; i--) {
      const log = logs[i];
      const address = log.topics[1].slice(0,2) + log.topics[1].slice(26,log.topics[1].length);
      const stakingId = Number(log.data.slice(66,130));
      const staking = await this.props.store.timeallyInstance.functions.viewStaking(address, stakingId);
      console.log(staking);
      stakings.push({
        address,
        planId: ethers.utils.bigNumberify(log.topics[2]).toNumber(),
        amount: ethers.utils.formatEther(ethers.utils.bigNumberify(log.data.slice(0,66))),
        timestamp: staking[1].toNumber()
      });
    }

    this.setState({ stakings });

    console.log('fetching logs from the ethereum blockchain', logs);
  }


  showBenefit = async () => {
    this.setState({ errorMessage: '',  });

    try {
      const benefit = await this.props.store.timeallyInstance.functions.seeShareForUserByMonth(
        this.props.store.walletInstance.address,
        this.state.month
      );
      this.setState({ benefit, withdrawable: true });
    } catch (err) {
      this.setState({ errorMessage: err.message, benefit: {}, withdrawable: false });
    }
  }

  withdrawBenefit = async () => {
    try {
      this.setState({ withdrawing: true });
      const inputs = [
        this.state.month,
        50,
        false,
        0
      ];
      console.log(inputs);
      const tx = await this.props.store.timeallyInstance.functions.withdrawShareForUserByMonth(
        ...inputs
      );
      console.log(tx);
      await tx.wait();
      console.log('done');
    } catch (err) {
      this.setState({ errorMessage: err.message });
      console.log(err);
    }
    this.setState({ withdrawing: false });
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
                        <li>Stakings</li>
                      </ol>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="bg-white pinside30">
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12">
                          <h1 className="page-title">Stakings</h1>
                        </div>
                        <div className="col-xl-8 col-lg-8 col-md-3 col-sm-12 col-12">
                          <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="btn-action">
                                <Button onClick={() => this.props.history.push('/stakings/new')}>New Staking</Button>
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

                       See total monthly benefit by month: <input type="text" placeholder="enter month id" value={this.state.month ? this.state.month : undefined} onChange={
                         event => {
                           console.log(+event.target.value);
                           this.setState({ month: +event.target.value });
                         } } />
                       <button onClick={this.showBenefit}>Query</button>

                     {Object.keys(this.state.benefit).length
                       ?

                       <p>
                         Your benefit above month is {ethers.utils.formatEther(this.state.benefit)} ES
                         <br />
                         <button disabled={this.state.withdrawing} onClick={this.withdrawBenefit}>
                           {this.state.withdrawing ? 'Withdrawing...' : 'Withdraw this now'}</button>
                       </p>


                   :null}

                   {this.state.errorMessage ? <p>Error from blockchain: {this.state.errorMessage}</p> : null}

                    {this.state.stakings.map((staking, index) => (
                      <div onClick={() => this.props.history.push('/stakings/'+index)}>
                        <p><strong>StakingId:</strong> {index} - <strong>Plan:</strong> {staking.planId ? '2 Year' : '1 Year'} and <strong>Amount:</strong> {staking.amount} ES at <strong>Time:</strong> {new Date(staking.timestamp * 1000).toLocaleString()}</p>

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

export default connect(state => {return{store: state}})(StakingList);
