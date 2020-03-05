import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import New from './New';
//import LoanId from './LoanId';
import List from './List';
import LoanInfo from './loans-info';
import Repay from './Repay';

const Loans = props => (
  <Switch>
    <Route path="/loans" exact component={LoanInfo} />
    <Route path="/loans/new" exact component={New} />
    <Route path="/loans/view" exact component={List} />
    <Route path="/loans/view/repay/:id" exact component={Repay} />
  </Switch>
);

export default withRouter(Loans);
