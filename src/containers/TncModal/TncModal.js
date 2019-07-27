import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class TCmodal extends Component {
    state = {
        show: false
    }

    componentDidMount = () => {
        this.setState({ show: this.props.show });
    }
    //const [show, setShow] = useState(false);

    //const handleShow = () => setShow(true);
  
    render() {
        return (
            <>        
              <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => this.setState({ show: false })}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => this.setState({ show: false })}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          );
    }
  }
  export default TCmodal;
  