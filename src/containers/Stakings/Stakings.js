import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import New from './New/New';
import StakingId from './StakingId';
import List from './List';

const Staking = props => (
  <Switch>
    <Route path="/stakings" exact component={List} />
    <Route path="/stakings/new" exact component={New} />
    <Route path="/stakings/:id" exact component={StakingId} />

  </Switch>
);

export default withRouter(Staking);
