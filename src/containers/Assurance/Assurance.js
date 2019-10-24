import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Info from './Info';
import Calculate from './Calculate';
import New from './New';
import View from './View/View';
import AssuranceId from './View/AssuranceId';
import './Assurance.css';
import AssuranceIdBenefits from './View/AssuranceIdBenefits';

class Assurance extends Component {
  render() {
    return (
      <>
        <Route path ="/assurance" exact component={Info} />

        <Route path ="/assurance/calculate" exact component={Calculate} />

        <Route path ="/assurance/new" exact component={New} />

        <Route path ="/assurance/view" exact component={View} />

        <Route path ="/assurance/view/:id" exact component={AssuranceId} />

        <Route path ="/assurance/view/:id/benefits" exact component={AssuranceIdBenefits} />
      </>
    );
  }
};

export default Assurance;
