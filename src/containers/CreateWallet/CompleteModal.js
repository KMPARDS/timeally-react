import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class CompleteModal extends React.Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Congratulations! You just created your Era Swap Wallet!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            You can use this wallet on multiple devices. Learn more on <a href="https://www.eraswapwallet.com" target="_blank">www.eraswapwallet.com</a>.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
          <Link to="/load-wallet">
            <Button variant="success">Go to Login page</Button>
          </Link>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CompleteModal;
