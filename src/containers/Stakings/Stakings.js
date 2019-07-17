import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import New from './New/New';

const Staking = props => (
  <div>
    <Route path="/stakings/new" exact component={New} />
    <Route path="/stakings/:id" exact />
  </div>
);

export default withRouter(Staking);
