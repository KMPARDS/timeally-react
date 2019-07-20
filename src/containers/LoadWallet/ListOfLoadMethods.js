import React from 'react';
import { Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const ListOfLoadMethods = props => {
  return (
    <div>
      <Card style={{margin: '15px 0'}} onClick={() => props.history.push('/load-wallet/scan-from-app')}>
        <Card.Body align="center">
          Log in by scaning from Era Swap Wallet App
        </Card.Body>
      </Card>

      <Card style={{margin: '15px 0'}} onClick={() => props.history.push('/load-wallet/using-keystore')}>
        <Card.Body align="center">
          Use Keystore to unlock wallet
        </Card.Body>
      </Card>

      <Card style={{margin: '15px 0'}} onClick={() => props.history.push('/load-wallet/using-private-key')}>
        <Card.Body align="center">
          Use Private Key to unlock wallet
        </Card.Body>
      </Card>

      <Card style={{margin: '15px 0'}} onClick={() => props.history.push('/load-wallet/using-mnemonic')}>
        <Card.Body align="center">
          Use Memonic to unlock wallet
        </Card.Body>
      </Card>
    </div>
  );
}

export default withRouter(ListOfLoadMethods);
