import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { timeally } from '../../env';

const ethers = require('ethers');

class Withdrawls extends Component {
  state = {
    stakings: []
  }

  async componentDidMount() {
    this.showStakings();
  }

  showStakings = async () => {
    console.log('benefit');
    const benefitWithdrawlEventSig = ethers.utils.id("BenefitWithdrawl(address,uint256,uint256[],uint256)");
    console.log('benefit', benefitWithdrawlEventSig);
    const topics = [ benefitWithdrawlEventSig, ethers.utils.hexZeroPad(this.props.store.walletInstance.address, 32) ];

    const logs = await this.props.store.providerInstance.getLogs({
      address: timeally.address,
      fromBlock: 0,
      toBlock: 'latest',
      topics
    });

    console.log(logs);

    const withdrawls = [];
    for(let i = logs.length - 1; i >= 0; i--) {
      const log = logs[i];
      const dataChunks = [];
      let str = log.data.slice(2);
      while(str.length) {
        dataChunks.push(str.substr(0,64));
        str = str.slice(64);
      }
      console.log('dataChunks', dataChunks);
      const address = log.topics[1].slice(0,2) + log.topics[1].slice(26,log.topics[1].length);
      const stakingId = Number('0x'+dataChunks[0]);
      const months = dataChunks.slice(4).map(hex => Number('0x'+hex));
      // console.log(staking);
      // withdrawls.push({
      //   address,
      //   stakingId,
      //   amount: window.lessDecimals(ethers.utils.bigNumberify(dataChunks[2]),
      //
      // });
    }

    // await this.setState({ stakings });

    console.log('fetching logs from the ethereum blockchain', logs, this.state.stakings);
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
                    <li><a href="index.html">Home</a></li>
                    <li className="active">Stakings</li>
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
                          <Button className="btn-default" onClick={() => this.props.history.push('/transactions/stakings')}>View only stakings</Button>
                          <Button onClick={() => this.props.history.push('/transactions/withdrawls')}>View only Withdrawls</Button>
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
              <table className="table table-image">
                {this.state.stakings.map(staking => (
                  <div>
                    <thead>
                      <tr>
                        <th scope="col" style={{fontSize:'11px', fontWeight:'500'}}>{staking.hash}</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"  style={{fontSize:'11px', fontWeight:'500', textAlign:'right'}}>{new Date(staking.timestamp * 1000).toLocaleString()}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row" style={{fontSize:'14px', fontWeight:'500'}}>
                          {this.props.store.walletInstance.address}
                        </th>
                        <td style={{fontSize:'35px', fontWeight:'100', color: '#971802'}}><i className="fa fa-long-arrow-right"></i></td>
                        <td>
                          <span style={{color: '#007bff'}}>TimeAlly Smart Contract <br />{this.props.store.timeallyInstance.address}</span><br />
                        </td>
                        <td style={{textAlign:'right'}}><br></br>
                        {staking.amount} ES<br></br>
                        <br></br>
                        <button type="button" className="btn btn-secondary small-btn">{staking.amount} ES</button>
                        </td>
                      </tr>
                    </tbody>
                  </div>
                ))}
                  </table>
              </div>
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


export default connect(state => {return{store: state}})(Withdrawls);
