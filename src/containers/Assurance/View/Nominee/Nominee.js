import React, { Component } from 'react';
import Layout from '../../../Layout/Layout';

class Nominee extends Component {
  render = () => {
    return (
      <Layout
        breadcrumb={['Home', 'Assurance','View', this.props.match.params.id, 'Nominee']}
        title='Nominee'
      >
        This is Nominee page. Here user will see their nominees and can add new nominees.
      </Layout>
    );
  }
}

export default Nominee;
