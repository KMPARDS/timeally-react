import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const Transactions = props => {



  return (
    <div>
      <div style={{textAlign: 'right', margin: '10px'}}>
        <Button
          style={{margin: '0 10px'}}
          variant="outline-primary"
          onClick={() => props.history.push('/transactions/stakings')}
        >
          View only stakings
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => props.history.push('/transactions/withdrawls')}
        >
          View only withdrawls
        </Button>
      </div>
      <span>List of all transactions</span>
    </div>
  );
};

export default connect(state => {return{store: state}})(withRouter(Transactions));
