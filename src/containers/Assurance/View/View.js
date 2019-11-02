import React, { Component } from 'react';
import { Button,Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import Layout from '../../Layout/Layout';
import SIPElement from './SIPElement';
import '../Assurance.css';

const ethers = require('ethers');

class View extends Component {
  state = {
    sips: [],
    loading: true
  };

  componentDidMount = async() => {
    const newSIPEventSig = ethers.utils.id('NewSIP(address,uint256,uint256)');
    const topics = [ newSIPEventSig, ethers.utils.hexZeroPad(this.props.store.walletInstance.address, 32) ];

    const logs = await this.props.store.providerInstance.getLogs({
      address: this.props.store.sipInstance.address,
      fromBlock: 0,
      toBlock: 'latest',
      topics
    });

    console.log('logs', logs);
    const sips = [];
    for(let i = logs.length - 1; i >= 0; i--) {
      const log = logs[i];
      const sipId = Number(window.sliceDataTo32Bytes(log.data,0));
      const monthlyCommitmentAmount = ethers.utils.bigNumberify(window.sliceDataTo32Bytes(log.data,1));
      sips.push({
        sipId, monthlyCommitmentAmount
      });
    }
    this.setState({ sips, loading: false });
  };

  render = () => (
        <Layout
            breadcrumb={['Home', 'Assurance','View']}
            title='Assurance View'>
            {this.state.sips.length ? <Table responsive>
            <thead>
              <tr>
                <th>SIP ID</th>
                <th>Time of Staking</th>
                <th>SIP Plan</th>
                <th>Monthly Commitment Amount</th>
                <th>Next Deposit Due</th>
                <th>Next Withdraw Release</th>
                <th>Click on the buttons to view</th>
              </tr>
            </thead>
            <tbody>
              {this.state.sips.map(sip => (
                <SIPElement
                  sipId={sip.sipId}
                  monthlyCommitmentAmount={ethers.utils.formatEther(sip.monthlyCommitmentAmount)}
                  onClick={() => this.props.history.push('/assurance/view/'+sip.sipId)}
                />
              ))}
            </tbody>
          </Table> : (
            this.state.loading
            ? <p>Please wait loading SIPs...</p>
            : <p>There are no SIPs to show.</p>
          )}
        </Layout>

    );
}

export default connect(state => {return{store: state}})(View);
