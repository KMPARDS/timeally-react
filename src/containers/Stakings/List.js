import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Spinner } from 'react-bootstrap';
import { timeally, network } from '../../env';
import StakingElement from './StakingElement';
const ethers = require('ethers');

class StakingList extends Component {
  state = {
    stakings: [],
    month: 0,
    errorMessage: '',
    loadingStakings: true,
    benefits: {},
    benefitSpinner: {},
    withdraw: {},
    withdrawSpinner: {},
    time: {}
  }

  componentDidMount = async () => {
    if(this.props.store.walletInstance.address) {
      this.showStakings();
      this.setState({ month: (await this.props.store.timeallyInstance.functions.getCurrentMonth()).toNumber() });
    }
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

    const mou = network === 'homestead' ? Math.floor(Date.now() / 1000) : (await this.props.store.esInstance.functions.mou());

    const stakings = [];
    for(let i = logs.length - 1; i >= 0; i--) {
      const log = logs[i];
      const address = log.topics[1].slice(0,2) + log.topics[1].slice(26,log.topics[1].length);
      const stakingId = Number('0x'+log.data.slice(66,130));
      // const staking = await this.props.store.timeallyInstance.functions.stakings(address, stakingId);
      // const timestamp = staking[1].toNumber();
      // console.log(staking);
      stakings.push({
        address,
        stakingId,
        planId: ethers.utils.bigNumberify(log.topics[2]).toNumber(),
        amount: ethers.utils.formatEther(ethers.utils.bigNumberify(log.data.slice(0,66))),
        // timestamp
      });
      let currentTime;
      try {
        currentTime = (mou).toNumber();
      } catch (e) {
        currentTime = Math.floor(Date.now()/1000);
      }
      // const time = {...this.state.time}; let factor = 0;
      // while(!(time[stakingId] > 0)) {
      //   time[stakingId] = (timestamp + 2629744 * factor++) - currentTime;
      // }

      // console.log(stakingId, timestamp, factor, time[stakingId]);

      // this.setState({ time });
    }

    this.setState({ stakings, loadingStakings: false });

    setInterval(() => {
      const time = {...this.state.time};
      for (const stakingId in time) {
        time[stakingId]--;
      }
      this.setState({ time });
    }, 1000);

    console.log('fetching logs from the ethereum blockchain', logs);
  }

  withdraw = async stakingId => {
    // 1 => please wait
    // 2 => sending tx
    // 3 => waiting for conf
    // 4 => done
    // 5 => error
    (()=>{
      const withdrawSpinner = {...this.state.withdrawSpinner};
      withdrawSpinner[stakingId] = 1;
      this.setState({ withdrawSpinner });
    })();

    const currentMonth = await this.props.store.timeallyInstance.functions.getCurrentMonth();
    const staking = await this.props.store.timeallyInstance.functions.stakings(
      this.props.store.walletInstance.address,
      stakingId
    );
    const stakingMonth = Number(staking[2]);
    const stakingPlanId = staking[3];
    const stakingPlan = await this.props.store.timeallyInstance.functions.stakingPlans(stakingPlanId);
    const monthsOfStaking = Number(stakingPlan[0]);
    const months = [];
    for(let i = stakingMonth + 1; i <= currentMonth; i++) {
      months.push(i);
    }
    console.log('seeing months ',months);
    const benefits = {...this.state.benefits};
    try {
      (()=>{
        const withdrawSpinner = {...this.state.withdrawSpinner};
        withdrawSpinner[stakingId] = 2;
        this.setState({ withdrawSpinner });
      })();

      const tx = await this.props.store.timeallyInstance.functions.withdrawBenefitOfAStakingByMonths(
        // this.props.store.walletInstance.address,
        stakingId,
        months
      );
      console.log(tx);

      (()=>{
        const withdrawSpinner = {...this.state.withdrawSpinner};
        withdrawSpinner[stakingId] = 3;
        this.setState({ withdrawSpinner });
      })();

      await tx.wait();

      (()=>{
        const withdrawSpinner = {...this.state.withdrawSpinner};
        withdrawSpinner[stakingId] = 4;
        this.setState({ withdrawSpinner });
      })();

    } catch (err) {
      console.log('error from bl chain', err.message);
      (()=>{
        const withdrawSpinner = {...this.state.withdrawSpinner};
        withdrawSpinner[stakingId] = 5;
        this.setState({ withdrawSpinner });
      })();
    }
    // console.log('output', output);
  };

  query = async stakingId => {
    (()=>{
      const benefitSpinner = {...this.state.benefitSpinner};
      benefitSpinner[stakingId] = true;
      this.setState({ benefitSpinner });
    })();

    const currentMonth = await this.props.store.timeallyInstance.functions.getCurrentMonth();
    const staking = await this.props.store.timeallyInstance.functions.stakings(
      this.props.store.walletInstance.address,
      stakingId
    );
    const stakingMonth = Number(staking[2]);
    const stakingPlanId = staking[3];
    const stakingPlan = await this.props.store.timeallyInstance.functions.stakingPlans(stakingPlanId);
    const monthsOfStaking = Number(stakingPlan[0]);
    const months = [];
    for(let i = stakingMonth + 1; i <= currentMonth; i++) {
      months.push(i);
    }
    console.log('seeing months ',months);
    const benefits = {...this.state.benefits};
    try {
      const output = await this.props.store.timeallyInstance.functions.seeBenefitOfAStakingByMonths(
        this.props.store.walletInstance.address,
        stakingId,
        months
      );
      console.log(output);
      let lessDecimals = ethers.utils.formatEther(output).split('.');
      if(lessDecimals[1].length >= 2) {
        lessDecimals[1] = lessDecimals[1].slice(0,2);
      }
      benefits[stakingId] = lessDecimals.join('.');
    } catch (err) {
      console.log('error from bl chain', err.message);
    }
    // console.log('output', output);

    (()=>{
      const benefitSpinner = {...this.state.benefitSpinner};
      benefitSpinner[stakingId] = false;
      this.setState({ benefitSpinner, benefits });
    })();
  };

  render() {
    if(!this.props.store.walletInstance.address) return <p>Please load your wallet to view your stakings</p>;

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

                    {this.state.loadingStakings ? <p>Please wait loading your stakings</p> : (
                      <>
                     <div className="tablebg">
                      {this.state.stakings.length
                      ? <table className="table table-striped" border="1">
                        <thead>
                          <tr>
                            <th>Staking ID</th>
                            <th>Staking Amount</th>
                            <th>Plan</th>
                            <th>Time</th>
                            <th>Estimated Next benefit time</th>
                            <th>Unclaimed Benefits</th>
                            <th>Details</th>
                            {/*<th>Actions</th>*/}
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.stakings.map((staking, index) => (
                            <StakingElement
                              key={'StakingElement'+index}
                              address={staking.address}
                              stakingId={staking.stakingId}
                              routerFunction={() => this.props.history.push('/stakings/'+ staking.stakingId)}
                            />
                          ))}
                        </tbody>
                      </table>
                      : <p>There are no stakings to show. <span onClick={() => this.props.history.push('/stakings/new')}>You can create a new staking by clicking here.</span></p>
                      } </div></>
                      )
                    }
                      {/*<div className="pagination">
                          <a href="#">«</a>
                          <a className="active" href="#">1</a>
                          <a href="#">2</a>
                          <a href="#">3</a>
                          <a href="#">4</a>
                          <a href="#">5</a>
                          <a href="#">6</a>
                          <a href="#">»</a>
                      </div>*/}

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
