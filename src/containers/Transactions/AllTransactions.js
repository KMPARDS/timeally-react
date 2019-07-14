import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const AllTransactions = props => {
  return (
    <div>
      List of all transactions<br />
      <button onClick={() => props.history.push('/transactions/stakings')}>View only stakings</button><br />
      <button onClick={() => props.history.push('/transactions/withdrawls')}>View only withdrawls</button>
    </div>
  );
};

export default connect(state => {return{store: state}})(withRouter(AllTransactions));
