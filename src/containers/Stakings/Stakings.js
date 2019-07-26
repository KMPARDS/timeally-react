import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import New from './New/New';
import StakingId from './StakingId';
import List from './List';
import Nominee from './Nominee/Nominee';
import NewNominee from './Nominee/New';

const Staking = props => (
  <Switch>
    <Route path="/stakings" exact component={List} />
    <Route path="/stakings/new" exact component={New} />
    <Route path="/stakings/:id" exact component={StakingId} />
    <Route path="/stakings/:id/nominees" exact component={Nominee} />
    <Route path="/stakings/:id/nominees/new" exact component={NewNominee} />
  </Switch>
);

export default withRouter(Staking);
