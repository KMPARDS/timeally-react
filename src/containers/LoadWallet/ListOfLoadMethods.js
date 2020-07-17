import React from 'react';
import { Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const ListOfLoadMethods = props => {
  return (
    <div class="container">
      {/*<Card style={{margin: '15px 0'}} onClick={() => props.history.push('/load-wallet/scan-from-app')}>
        <Card.Body align="center">
          Log in by scaning from Era Swap Wallet App
        </Card.Body>
      </Card>*/}

      {/* <Card style={{margin: '15px 0'}} onClick={() => props.history.push('/load-wallet/using-keystore')}>
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
          Use Mnemonic to unlock wallet
        </Card.Body>
      </Card> */}

      <Card style={{margin: '15px 0', cursor: 'pointer'}} onClick={() => window.open('https://eraswap.life/','','width=1001,height=650')}>
        <Card.Body align="center">
          Connect using <strong>Era Swap Life</strong>
        </Card.Body>
      </Card>

      <Card style={{margin: '15px 0', cursor: 'pointer'}} onClick={() => props.history.push('/load-wallet/using-metamask')}>
        <Card.Body align="center">
          Connect to <strong>Metamask</strong> (supports many hardware wallets like Trezor and Ledger)
        </Card.Body>
      </Card>

      <Card style={{margin: '15px 0', cursor: 'pointer'}} onClick={() => props.history.push('/load-wallet/using-address')}>
        <Card.Body align="center">
          Use <strong>Address</strong> to read account
        </Card.Body>
      </Card>
    </div>
  );
}

export default withRouter(ListOfLoadMethods);
