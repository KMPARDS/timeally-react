import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Info from './Info';
import CalculateSIP from './CalculateSIP';


class SIP extends Component {
  render() {
    return (
      <>
        <Route path ="/sip" exact component={Info} />

        <Route path ="/sip/calculate" exact component={CalculateSIP} />
      </>
    );
  }
};

export default SIP;
