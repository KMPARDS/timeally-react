import React, { Component } from 'react';
import Layout from '../../../Layout/Layout';

class NewNominee extends Component {
  render = () => {
    return (
      <Layout
        breadcrumb={['Home', 'Assurance','View', this.props.match.params.id, 'Nominee', 'New']}
        title='New Nominee'
      >
        Add new nominee
      </Layout>
    );
  }
}

export default NewNominee;
