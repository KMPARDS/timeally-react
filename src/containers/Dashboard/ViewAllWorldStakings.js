import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import StakingEntry from './StakingEntry';
import { timeally } from '../../env';
const ethers = require('ethers');

class ViewAllWorldStakings extends Component {
  state = {
    stakings: [],
    downloadReady: false
  };

  database = {};

  componentDidMount = async() => {
    const newStakingEventSig = ethers.utils.id("NewStaking(address,uint256,uint256,uint256)");
    const topics = [ newStakingEventSig, null, null, null ];

    const logs = await this.props.store.providerInstance.getLogs({
      address: timeally.address,
      fromBlock: 0, //(await this.props.store.providerInstance.getBlockNumber()) - 5760,
      toBlock: 'latest',
      topics
    });

    console.log('fetching logs from the ethereum blockchain', logs);

    let stakingsInLast24Hours = ethers.utils.bigNumberify(0);
    const stakings = [];
    for(let i = logs.length - 1; i >= 0; i--) {
      const log = logs[i];

      const address = log.topics[1].slice(0,2) + log.topics[1].slice(26,log.topics[1].length);
      const stakingId = Number('0x'+log.data.slice(66,130));
      console.log(stakingId);
      // const staking = await this.props.store.timeallyInstance.functions.stakings(address, stakingId);
      //console.log(staking);
      stakings.push({
        address,
        stakingId,
        planId: ethers.utils.bigNumberify(log.topics[2]).toNumber(),
        amount: window.lessDecimals(ethers.utils.bigNumberify(log.data.slice(0,66))),
        transactionHash: log.transactionHash
      });
    }

    this.setState({ stakings });

    await new Promise((resolve, reject) => {
      const intervalId = setInterval(() => {
        if(this.state.stakings.length && this.state.stakings.length === Object.keys(this.database).length) {
          clearInterval(intervalId);
          resolve();
        }
      }, 500);
    });

    this.setState({ downloadReady: true })
  };

  downloadCsv = () => {
    const element = document.createElement("a");
    console.log(this.database);
    const file = new Blob([(() => {
      const rows = [];
      rows.push(['address', 'plan', 'amount', 'stakingType', 'timestamp', 'formattedDate', 'transactionHash'].join(','));
      Object.values(this.database).forEach(obj => {
        const row = [obj.address, obj.plan, obj.amount, obj.stakingType, obj.timestamp, new Date(+obj.timestamp).toLocaleString().split(',').join(''), obj.transactionHash];
        rows.push(row.join(','));
      });
      return rows.join('\n');
    })()], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'view-all-stakings.csv';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  render() {
    return (
      <>
        {this.state.stakings.length
        ? <>
          <Button
            onClick={this.downloadCsv}
            disabled={!this.state.downloadReady}
          >
              {this.state.downloadReady
                ? 'Download this data' : 'Please wait...'}
          </Button>
          <Table responsive>
            <thead style={{textAlign:'center'}}>
              <tr>
                <th>Address</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Staking Type</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
            {this.state.stakings.map((staking, index) => (
              <StakingEntry
                key={staking.address+'-'+staking.stakingId}
                index={index}
                address={staking.address}
                stakingId={staking.stakingId}
                planId={staking.planId}
                amount={staking.amount}
                transactionHash={staking.transactionHash}
                updateDatabase={(obj, index) => {
                  this.database[index] = obj;
                }}
              />
            ))}
            </tbody>
          </Table>
        </> : 'Please wait loading stakings...'}
      </>
    );
  }
}

export default connect(state => {return{store: state}})(ViewAllWorldStakings);
