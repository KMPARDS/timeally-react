import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import New from './New';
//import LoanId from './LoanId';
import List from './List';

const Loans = props => (
  <Switch>
    <Route path="/loans" exact component={List} />
    <Route path="/loans/new" exact component={New} />
  </Switch>
);

export default withRouter(Loans);
