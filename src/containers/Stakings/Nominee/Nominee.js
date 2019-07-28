import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { timeally } from '../../../env';
const ethers = require('ethers');

class Nominee extends Component {
  state = {
    nominees: [],
    totalNomination: 0
  }

  componentDidMount = async () => {
    this.showNominees();
    this.setState({ month: (await this.props.store.timeallyInstance.functions.getCurrentMonth()).toNumber() })
  };

  showNominees = async () => {
    const nomineeNewEventSig = ethers.utils.id("NomineeNew(address,uint256,address)");
    const topics = [
      nomineeNewEventSig,
      ethers.utils.hexZeroPad(this.props.store.walletInstance.address, 32),
      ethers.utils.hexZeroPad(ethers.utils.bigNumberify(this.props.match.params.id)._hex, 32)
    ];

    const logs = await this.props.store.providerInstance.getLogs({
      address: timeally.address,
      fromBlock: 0,
      toBlock: 'latest',
      topics
    });

    const nominees = [];
    //for(let i = logs.length - 1; i >= 0; i--) {
      //const log = logs[i];
    for(let log of logs) {
      const stakingId = Number(log.topics[2]);
      const nomineeAddress = log.topics[3].slice(0,2) + log.topics[3].slice(26,log.topics[3].length);

      const nomination = await this.props.store.timeallyInstance.functions.viewNomination(
        this.props.store.walletInstance.address,
        stakingId,
        nomineeAddress
      );

      nominees.push({
        nomineeAddress,
        nomination: nomination.toString()
      });
    }

    this.setState({ nominees });

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
                          <h1 className="page-title">Nominees</h1>
                        </div>
                        <div className="col-xl-8 col-lg-8 col-md-3 col-sm-12 col-12">
                          <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="btn-action">
                                <Button onClick={() => this.props.history.push(`${this.props.match.url}/new`)}>New Nominee</Button>
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

                       {!this.state.nominees.length ? 'There are no nominees associated with this staking' : null}

                    {this.state.nominees.map((nominee, index) => (
                      <div>
                        <p>
                          <strong>Nominee Address:</strong> {nominee.nomineeAddress}&nbsp;
                          <strong>Nomination:</strong> {nominee.nomination} Shares
                        </p>
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

export default connect(state => {return{store: state}})(Nominee);
