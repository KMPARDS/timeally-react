import React, { Component } from 'react';
import { network } from '../../env';
import './Entry.css';

class Entry extends Component {
  render = () => (
    <table className="table table-image staking-entry">
      <thead>
        <tr>
          <th scope="col" style={{fontSize:'11px', fontWeight:'500'}}><span className="mono-font">{this.props.staking.hash}</span> <a href={`https://${network === 'homestead' ? '' : 'kovan.' }etherscan.io/tx/${this.props.staking.hash}`} style={{color: 'black'}} target="_blank" rel="noopener noreferrer">(View on EtherScan)</a></th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"  style={{fontSize:'11px', fontWeight:'500', textAlign:'right'}}>{new Date(this.props.staking.timestamp * 1000).toLocaleString()}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th className="mono-font" scope="row" style={{fontSize:'14px', fontWeight:'500'}}>
            {this.props.store.walletInstance.address}
          </th>
          <td style={{fontSize:'35px', fontWeight:'100', color: '#971802'}}><i className="fa fa-long-arrow-right"></i></td>
          <td>
            <span style={{color: '#007bff'}}>TimeAlly Smart Contract <br /><span className="mono-font">{this.props.store.timeallyInstance.address}</span></span><br />
          </td>
          <td style={{textAlign:'right'}}><br></br>
          {this.props.staking.amount} ES<br></br>
          <br></br>
          <button type="button" className="btn btn-secondary small-btn">{this.props.staking.amount} ES</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Entry;
