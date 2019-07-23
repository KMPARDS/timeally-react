import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { timeally } from '../../env';

const ethers = require('ethers');

class Dashboard extends Component {
  state = {
    stakings: [],
    nrtRelease: undefined,
    totalActiveStakings: undefined,
    currentMonth: undefined,
    myActiveStakings: undefined

  }
  componentDidMount = async () => {
    this.showStakings();

    const currentMonth = await this.props.store.timeallyInstance.functions.getCurrentMonth();
    this.setState({ currentMonth: Number(currentMonth) });

    console.log('currentMonth', this.state.currentMonth);

    (async() => {
      const totalActiveStakings = await this.props.store.timeallyInstance.functions.totalActiveStakings(currentMonth);
      this.setState({ totalActiveStakings: ethers.utils.formatEther(totalActiveStakings) });
    })();

    (async() => {
      const nrtRelease = await this.props.store.timeallyInstance.functions.timeAllyMonthlyNRT(currentMonth);
      this.setState({ nrtRelease: ethers.utils.formatEther(nrtRelease) });
    })();

    (async() => {
      const myActiveStakings = await this.props.store.timeallyInstance.functions.userActiveStakingByMonth(this.props.store.walletInstance.address, currentMonth);
      this.setState({ myActiveStakings: ethers.utils.formatEther(myActiveStakings) });
    })();

  }

  showStakings = async () => {
    const newStakingEventSig = ethers.utils.id("NewStaking(address,uint256,uint256,uint256)");
    const topics = [ newStakingEventSig, null, null, null ];

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
      //console.log(staking);
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
                          <li className="active">Dashboard</li>
                        </ol>
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="bg-white pinside30">
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12">
                            <h1 className="page-title">Dashboard</h1>
                          </div>
                          <div className="col-xl-8 col-lg-8 col-md-3 col-sm-12 col-12">
                            <div className="row">
                              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="btn-action">
                                <Button className="btn btn-default btn-sm" onClick={() => this.props.history.push('/stakings/new')}>Apply for Loan</Button>
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
          <div>
    <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="wrapper-content bg-white pinside10">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="row">
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                      <div className="bg-light pinside10 ">
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5" style={{textAlign:'center'}}>
                             <span>Current TimeAlly Month</span><br></br>
                            <span style={{fontSize:'12px'}}>{this.state.currentMonth}{this.state.currentMonth !== undefined ? null : 'Loading...'}</span>
                            <hr />
                            <span>NRT Release this month</span><br></br>
                            <span style={{fontSize:'12px'}}>{this.state.nrtRelease}{this.state.nrtRelease !== undefined ? ' ES' : 'Loading...'}</span>
                          </div>
                          <div className="vl" />
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6" style={{textAlign:'center'}}>
                            <span>Total Active Stakings in the World</span><br></br>
                            <span style={{fontSize:'12px'}}>{this.state.totalActiveStakings}{this.state.totalActiveStakings !== undefined ? ' ES' : 'Loading...'}</span>
                            <hr />
                            <span>My Active Stakings</span><br></br>
                            <span style={{fontSize:'12px'}}>{this.state.myActiveStakings}{this.state.myActiveStakings !== undefined ? ' ES' : 'Loading...'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="vl" />
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <div className="bg-light">
                            <span style={{textAlign:'center', fontSize:'11px'}}>ETHEREUM TRANSACTION HISTORY IN 14 DAYS</span>
                            <h2 id="emi" className="pull-right">Graph</h2>
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
      </div>
      <div className="container">
       <h2 className="mb20">View All Staking in the World</h2>
          <div className="row pinside40">
              <div className="tablebg">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                          <table className="table">
                              <thead style={{textAlign:'center'}}>
                                <tr>
                                  <th>Address</th>
                                  <th>Plan</th>
                                  <th>Amount</th>
                                  <th>Timestamp</th>
                                </tr>
                              </thead>
                            <tbody  style={{textAlign:'center'}}>

                          {this.state.stakings.map( (staking, index) => (
                                <tr key={`dashboard-${index}`}>
                                  <td style={{color:'#f51f8a'}}>{staking.address}</td>
                                  <td>{staking.planId ? '2 Year' : '1 Year'}</td>
                                  <td>{staking.amount}</td>
                                  <td>{new Date(staking.timestamp * 1000).toLocaleString()}</td>
                                </tr>
                              ))}
                              </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
              </div>
          {/* <Button onClick={() => this.props.history.push('/stakings/new')}>New Staking</Button> */}
          {/* <Card style={{margin: '15px 0'}}>
            <Card.Body>
              <h5>View all stakings happening in world</h5>
              {this.state.stakings.map(staking => (
                <p><strong>Address:</strong> {staking.address} and <strong>Plan:</strong> {staking.planId ? '2 Year' : '1 Year'} and <strong>Amount:</strong> {staking.amount} ES</p>
              ))}
            </Card.Body>
          </Card> */}
        </div>
      </div>
    );
  }
};

export default connect(state => {return{store: state}})(withRouter(Dashboard));
