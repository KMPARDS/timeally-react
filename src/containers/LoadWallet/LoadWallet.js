import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ListOfLoadMethods from './ListOfLoadMethods';
import ScanFromApp from './ScanFromApp';
import UsingKeystoreFile from './UsingKeystoreFile';
import UsingPrivateKey from './UsingPrivateKey';
import UsingMnemonic from './UsingMnemonic';


class LoadWallet extends Component {
  render() {
    return (
      <div>

        <Route path ="/load-wallet" exact component={ListOfLoadMethods} />

        <Route path ="/load-wallet/scan-from-app" exact component={ScanFromApp} />

        <Route path ="/load-wallet/using-keystore" exact component={UsingKeystoreFile} />

        <Route path ="/load-wallet/using-private-key" exact component={UsingPrivateKey} />

        <Route path ="/load-wallet/using-mnemonic" exact component={UsingMnemonic} />

      </div>
    );
  }
};

export default LoadWallet;
