import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import New from './New/New';
import StakingId from './StakingId';
import List from './List';

const Staking = props => (
  <div>
    <Route path="/stakings/new" exact component={New} />
    <Route path="/stakings/:id" exact component={StakingId} />
    <Route path="/stakings" exact component={List} />
  </div>
);

export default withRouter(Staking);
