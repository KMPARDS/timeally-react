import React from 'react';
import { Route } from 'react-router-dom';

import AllTransactions from './AllTransactions';

export default () => {
  return (
    <div>
      <Route path ="/transactions" exact component={AllTransactions} />
      <Route path ="/transactions/stakings" exact render={
        () => <div>List of staking transactions</div>
      } />
      <Route path ="/trasnactions/withdrawls" exact render={
        () => <div>List of withdrawl transactions</div>
      } />
    </div>
  );
}
