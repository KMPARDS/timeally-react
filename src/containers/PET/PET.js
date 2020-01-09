import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Info from './Info';
import New from './New';
import View from './View/View';
import PETId from './View/PETId/PETId';
import Deposit from './View/Deposit/Deposit';
import LumSumDeposit from './View/Deposit/LumSumDeposit';
import Nominee from './View/Nominee/Nominee';
import NewNominee from './View/Nominee/NewNominee';

// import './PET.css';

class PET extends Component {
  render() {
    return (
      <>
        <Route path ="/pet" exact component={Info} />

        <Route path ="/pet/new" exact component={New} />

        <Route path ="/pet/view" exact component={View} />

        <Route path ="/pet/view/:id" exact component={PETId} />

        <Route path ="/pet/view/:id/deposit/" exact component={Deposit} />
        <Route path ="/pet/view/:id/lum-sum-deposit/" exact component={LumSumDeposit} />

        <Route path ="/pet/view/:id/nominees" exact component={Nominee} />
        <Route path ="/pet/view/:id/nominees/new" exact component={NewNominee} />
      </>
    );
  }
};

export default PET;
