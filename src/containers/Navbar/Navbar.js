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
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 d-none d-xl-block d-lg-block d-md-block">
              <p className="mail-text">Welcome to Time Ally</p>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 d-none d-xl-block d-lg-block d-md-block">
              <p className="mail-text text-center">Personal</p>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 d-none d-xl-block d-lg-block d-md-block">
              <p className="mail-text text-center">Business</p>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12 d-none d-xl-block d-lg-block d-md-block">
              <p className="mail-text text-center">Corporate</p>
            </div>
          </div>
        </div>
      </div>
       <div className="header-2">
         <div className="container">
           <div className="row">
             <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
               {/* logo */}
               <div className="logo">
                 <img onClick={() => this.props.history.push('/create-wallet')} src="images/logo.png" alt="" />
               </div>
             </div>
             {/* logo */}
             <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 text-right d-none d-xl-block d-lg-block ">
               <div className="header-action">
                 <a href="#" className="btn btn-primary">Loan Available</a>
                 <a href="#" className="btn btn-default ">Get Quote Now</a></div>
             </div>
           </div>
         </div>
         <div className="navigation-2">
           <div className="container">
             <div className="row">
               <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                 <div id="navigation">
                   {/* navigation start*/}
                   <ul>
                     <li className="active"><a href="#" className="animsition-link">Home</a>
                       
                     </li>
                     <li><a href="#" className="animsition-link">Time Ally Loan</a>
                      
                     </li>
                     <li><a href="about.html" className="animsition-link">Time Ally Insurance</a>
                      
                     </li>
                     <li><a href="blog-listing.html" className="animsition-link">Time Ally Card</a>
                     
                     </li>
                     
                   </ul>
                 </div>
                 
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
