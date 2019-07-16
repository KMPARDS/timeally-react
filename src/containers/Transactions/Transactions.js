import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const Transactions = props => {



  return (
    <Container>
      List of all transactions
      <Button variant="outline-primary" onClick={() => props.history.push('/transactions/stakings')}>View only stakings</Button>
      <Button variant="outline-primary" onClick={() => props.history.push('/transactions/withdrawls')}>View only withdrawls</Button>
    </Container>
  );
};

export default connect(state => {return{store: state}})(withRouter(Transactions));
