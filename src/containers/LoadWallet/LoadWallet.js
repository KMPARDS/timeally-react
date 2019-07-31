import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ListOfLoadMethods from './ListOfLoadMethods';
import ScanFromApp from './ScanFromApp';
import UsingKeystoreFile from './UsingKeystoreFile';
import UsingPrivateKey from './UsingPrivateKey';
import UsingMnemonic from './UsingMnemonic';
import UsingMetamask from './UsingMetamask';


class LoadWallet extends Component {
  render() {
    return (
      <div>

        <Route path ="/load-wallet" exact component={ListOfLoadMethods} />

        <Route path ="/load-wallet/scan-from-app" exact component={ScanFromApp} />

        <Route path ="/load-wallet/using-keystore" exact component={UsingKeystoreFile} />

        <Route path ="/load-wallet/using-private-key" exact component={UsingPrivateKey} />

        <Route path ="/load-wallet/using-mnemonic" exact component={UsingMnemonic} />

        <Route path ="/load-wallet/using-metamask" exact component={UsingMetamask} />
        {/* <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
            <div className="bg-white pinside40 number-block highlight-outline outline mb60 bg-boxshadow">

              <h3 className="number-title">Choose Loan Amount</h3>
              <p>Suspendisse accumsan imperdue ligula dignissim sit amet vestibulum in mollis etfel.</p>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
            <div className="bg-white pinside40 number-block highlight-outline outline mb60 bg-boxshadow">

              <h3 className="number-title">Approved Your Loan</h3>
              <p>Fusce tempor sstibulum varius sem nec mi luctus viverra edcongue lobortis faucibus.</p>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
            <div className="bg-white pinside40 number-block highlight-outline outline mb60 bg-boxshadow">

              <h3 className="number-title">Get Your Cash</h3>
              <p>Get your money in minutes simtibulm varius semnec mluctus gue lobortis faucibus.</p>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
            <div className="bg-white pinside40 number-block highlight-outline outline mb60 bg-boxshadow">

              <h3 className="number-title">Get Your Cash</h3>
              <p>Get your money in minutes simtibulm varius semnec mluctus gue lobortis faucibus.</p>
            </div>
          </div>
      </div>        */}

      </div>
    );
  }
};

export default LoadWallet;
