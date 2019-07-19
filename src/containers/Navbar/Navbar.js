import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, DropdownButton, Dropdown } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';

class NavbarComponent extends Component {
  state = {
    userAddress: ''
  };

  componentDidMount = () => {
    window.updateTheNavbar = async action => {
      if(action.type === 'LOAD-WALLET-INSTANCE') {
        let userAddress = '';
        if(Object.entries(action.payload).length) {
          userAddress = await action.payload.getAddress();
        }
        this.setState({ userAddress });
      }
    };
  }

  render() {
    return (
      <div>

      <div className="top-bar">
        {/* top-bar */}
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-4 col-sm-6 col-6 d-none d-xl-block d-lg-block">
              <p className="mail-text">Welcome to Time Ally</p>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 d-none d-xl-block d-lg-block">
              <p className="mail-text text-center">ES Price: 52445</p>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 d-none d-xl-block d-lg-block">
              <p className="mail-text text-center">Ether Price: 5747</p>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 d-none d-xl-block d-lg-block">
              <p className="mail-text text-center">Gas Price: 541</p>
            </div>
          </div>
        </div>
      </div>
      <div className="header-standard header">
        <div className="top-header">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6">
                {/* logo */}
                <div className="logo">
                  <img onClick={() => this.props.history.push('/')} src="/images/logo.png" alt="Time Ally" />
                </div>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-9 col-sm-12 col-12">
                <div className="quick-info">
                  {/* <span className="mr10">Call: 1-800-123-4567</span>
                  <span className="mr10"><a href="#">ATM &amp; Branches</a></span> */}
                  <span><a onClick={() => this.props.history.push('/create-wallet')} className="btn btn-primary btn-sm">Create Wallet</a></span>  
                  <span><a href="#" className="btn btn-default btn-sm">Welcome Prafull M</a></span>               
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-light-blue">
          <div className="container">
            <div className="row">
              {/* logo */}
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div id="navigation">
                  {/* navigation start*/}
                  <ul>
                    <li className="active"><a onClick={() => this.props.history.push('/')}>Home</a></li>
                    <li className="active"><a onClick={() => this.props.history.push('/Dashboard')}>Dashboard</a></li>
                    <li className="active"><a onClick={() => this.props.history.push('/Wallet')}>Wallet</a></li>
                    {/* <li><a onClick={() => this.props.history.push('/Staking')}>Staking</a></li> */}
                    <li><a onClick={() => this.props.history.push('/transactions')}>Transactions</a>
                      <ul>
                          <li><a onClick={() => this.props.history.push('/transactions/stakings')}>Staking Transactions</a></li>
                          <li><a onClick={() => this.props.history.push('/transactions/withdrawls')}>Withdrawal Transactions</a></li>
                        </ul>
                    </li>
                    <li className="active"><a onClick={() => this.props.history.push('/loans')}>Apply for Loan</a></li>
                    {/* <li><a href="about.html" className="animsition-link">About us</a>
                      <ul>
                        <li><a href="about.html" title="About us" className="animsition-link">About us</a></li>
                        <li><a href="team.html" title="Team" className="animsition-link">Team</a></li>
                      </ul>
                    </li> */}                  
                  </ul>
                </div>
                {/* /.navigation start*/}
              </div>
            </div>
          </div>
        </div>
      </div>
       </div>
      // <Navbar style={{backgroundColor: '#070707'}} {...this.props}>
      //   <Link to="/">
      //     <Navbar.Brand>
      //       <img
      //         src="/logo.png"
      //         width="30"
      //         height="30"
      //         className="d-inline-block align-top"
      //         alt="React Bootstrap logo"
      //       />
      //     </Navbar.Brand>
      //   </Link>
      //   <Nav.Link style={{color: 'white'}} onClick={() => this.props.history.push('/dashboard')}>Dashboard</Nav.Link>
      //   <Nav.Link style={{color: 'white'}} onClick={() => this.props.history.push('/transactions')}>Transactions</Nav.Link>

      //   <Navbar.Toggle />

      //   <Navbar.Collapse className="justify-content-end">

      //     <DropdownButton alignRight id="dropdown-basic-button" title={this.state.userAddress ? `Welcome ${String(this.state.userAddress).substr(0,6)}...` : 'Era Swap Wallet'} variant="outline-light" drop="down">

      //       {/*<Dropdown.Header>Your HD Accounts</Dropdown.Header>
      //       <Dropdown.Item>Signed in as 0x124B7... (23.75 ES)</Dropdown.Item>*/}

      //       {/* show if not signed in*/
      //       !this.state.userAddress ? <Dropdown.Item onClick={() => this.props.history.push('/create-wallet')}>Create Wallet</Dropdown.Item> : null}

      //       {/* show if not signed in*/
      //       !this.state.userAddress ? <Dropdown.Item onClick={() => this.props.history.push('/load-wallet')}>Load Wallet</Dropdown.Item> : null}

      //       {/* show if not signed in*/
      //       this.state.userAddress ? <Dropdown.Item onClick={() => this.props.history.push('/user')}>Account page</Dropdown.Item> : null}

      //       {/* show if not signed in*/
      //       this.state.userAddress ? <Dropdown.Item onClick={() => {
      //         this.props.dispatch({ type: 'LOAD-WALLET-INSTANCE', payload: {} });
      //         window.historyy = this.props.history;
      //         this.props.history.push('/logout');
      //       }}>Log out</Dropdown.Item> : null}
      //     </DropdownButton>
      //   </Navbar.Collapse>
      // </Navbar>     

      
    );
  }
}

export default connect(state => {return{store: state}})(withRouter(NavbarComponent));
