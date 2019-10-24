import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, DropdownButton, Dropdown, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { esContract, nrtManager, timeally, network } from '../../env';

const ethers = require('ethers');
const axios = require('axios');

class NavbarComponent extends Component {
  state = {
    time: 0,
    etherPrice: '',
    esPrice: '',
    gasPrice: ''
  };

  updatePrice = () => {
    (async() => {
      const response = await axios.get('https://api.coinmarketcap.com/v1/ticker/ethereum/');
      this.setState({ etherPrice: response.data[0]['price_usd'] });
      //console.log(response);
    })();

    (async()=>{
      const response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json');
      //console.log(response.data);
      this.setState({ gasPrice: response.data['fast'] / 10 });

    })();

    (async() => {
      const response = await axios.get('https://api.probit.com/api/exchange/v1/ticker?market_ids=ES-USDT%2CES-BTC');

      this.setState({ esPrice: response.data.data[0].last + ' USDT / '+response.data.data[1].last + ' BTC' })
    })();
  }

  componentDidMount = async () => {
    setInterval(this.updatePrice, 5000);

    window.zHistory = this.props.history;

    window.updateTheNavbar = async action => {
      if(action.type === 'LOAD-WALLET-INSTANCE') {

        let userAddress = '';
        if(Object.entries(action.payload).length) {
          try {
            if(!action.payload.address) {
              userAddress = await action.payload.getAddress();
              action.payload['address'] = userAddress;
            } else {
              userAddress = action.payload.address;
            }
          } catch (err) {
            console.log(err.message);
            // try {
            //
            //   this.props.store.walletInstance.address = userAddress;
            //   window.metamaskprov = action.payload;
            //
            // } catch (err) {
            //   console.log(err.message);
            // }
          }
        }
        // this.setState({ userAddress });

        const provider = action.payload._ethersType === 'Signer' ? action.payload : this.props.store.providerInstance;

        // update es instance
        this.props.dispatch({ type: 'LOAD-ES-INSTANCE', payload: new ethers.Contract(esContract.address, esContract.abi, provider) });

        // update nrt instance
        this.props.dispatch({ type: 'LOAD-NRT-INSTANCE', payload: new ethers.Contract(nrtManager.address, nrtManager.abi, provider) });

        // update timeally
        this.props.dispatch({ type: 'LOAD-TIMEALLY-INSTANCE', payload: new ethers.Contract(timeally.address, timeally.abi, provider) });
      }

      if(action.type === 'update time yaar') {
        this.setState({ time: 0 });
        const newTime = ( await this.props.store.esInstance.functions.mou() ).toNumber();
        this.setState({ time: newTime });
      }
    };

    const time = network === 'homestead'
      ? Date.now() / 1000
      : (await this.props.store.esInstance.functions.mou()).toNumber();
    this.setState({ time });

    setInterval(() => {
      this.setState({ time: this.state.time + 1 });
    }, 1000);
  }

  render() {
    const announcementLink = <span><a href="/pdf/TimeAlly_Stakers.pdf" target="_blank" className="btn main-btn btn-default btn-sm flash-button" >Announcement</a></span>;

    let navbarButtons = (
     <div>
        {/* <span><a onClick={() => this.props.history.push('/create-wallet')} className="btn main-btn btn-primary btn-sm">Create Wallet</a></span> */}
        {announcementLink}
        <span><a onClick={() => this.props.history.push('/load-wallet')} className="btn main-btn btn-default btn-sm">Connect to a Wallet</a></span>

        <span><a onClick={() => this.props.history.push('/nominee')} className="btn main-btn btn-default btn-sm" style={{backgroundColor: '#55a903'}}>Nominee</a></span>
    </div>
    );
    if(this.props.store.walletInstance.address) {
      navbarButtons = (
        <div>
          {announcementLink}
          <span><a className="btn btn-primary btn-sm" style={{backgroundColor: this.props.store.walletInstance._ethersType !== 'Signer' ? '#333' : undefined}}>Welcome {
              this.props.store.walletInstance.address.slice(0,6) + '...' + this.props.store.walletInstance.address.slice(this.props.store.walletInstance.address.length - 3, this.props.store.walletInstance.address.length - 1)
            }</a>
          </span>
          <span><a onClick={() => {
              this.props.dispatch({ type: 'LOAD-WALLET-INSTANCE', payload: {} });
              this.props.history.push('/logout');
            } } className="btn btn-default btn-sm">Logout</a></span>

        </div>
      );
    }

    return (
      <div>
      <div className="top-bar">
        {/* top-bar */}
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-4 col-sm-6 d-none d-xl-block d-lg-block">
              <p className="mail-text" onClick={() => {
                  if(network !== 'homestead') {
                    this.props.history.push('/mou');
                  }
                }
              }>
                {network === 'homestead' ? 'Current Time:' : 'mou:'} {this.state.time ? new Date(this.state.time * 1000).toLocaleString(): 'Loading...'}</p>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3  d-none d-xl-block d-lg-block">
              <p className="mail-text text-center">ES Price: {this.state.esPrice || 'Loading...'}</p>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 d-none d-xl-block d-lg-block">
              <p className="mail-text text-center">Ether Price: {this.state.etherPrice ? '$'+this.state.etherPrice : 'Loading...'}</p>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 d-none d-xl-block d-lg-block">
              <p className="mail-text text-center">Gas Price: {this.state.gasPrice ? this.state.gasPrice + ' gwei' : 'Loading...'}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="header-standard header">
        <div className="top-header">
          <div className="container">
            <div className="row">
              <div className="col-xl-2 col-lg-1 col-md-10 col-sm-6 col-6">
                {/* logo */}
                <div className="logo">
                  <img onClick={() => this.props.history.push('/')} src="/images/logo.png" alt="TimeAlly" />
                </div>
              </div>
              <div className="col-xl-10 col-lg-11 col-md-10 col-sm-12 col-12">
                <div className="quick-info">
                  {navbarButtons}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-light-blue">
          <div className="container-fluid">
            <div className="row">
              {/* logo */}
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <Navbar expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="mr-auto">
                        <Nav.Link onClick={() => this.props.history.push('/')}><span style={{color:'#fff'}}>Home</span></Nav.Link>
                        { this.props.store.walletInstance.address ?
                          <Nav.Link  onClick={() => this.props.history.push('/dashboard')}><span style={{color:'#fff'}}>Dashboard</span></Nav.Link>
                          : null
                          }
                        { this.props.store.walletInstance.address ?
                         <Nav.Link  onClick={() => this.props.history.push('/wallet')}><span style={{color:'#fff'}}>Wallet</span></Nav.Link>
                            : null
                        }

                    {/* { this.props.store.walletInstance.address ?

                          <li><a onClick={() => this.props.history.push('/transactions')}>Transactions</a>
                            <ul>
                                <li><a onClick={() => this.props.history.push('/transactions/stakings')}>Staking Transactions</a></li>
                                <li><a onClick={() => this.props.history.push('/transactions/withdrawls')}>Withdrawal Transactions</a></li>
                              </ul>
                          </li>
                    : null
                     } */}
                   { this.props.store.walletInstance.address ?
                   <Nav.Link  onClick={() => this.props.history.push('/stakings')}><span style={{color:'#fff'}}>Stakings</span></Nav.Link>
                      : null
                   }

                  { this.props.store.walletInstance.address ?
                   <Nav.Link  onClick={() => this.props.history.push('/loans-info')}><span style={{color:'#fff'}}>Apply for Loan</span></Nav.Link>
                    // <li className="active"><a onClick={() => this.props.history.push('/loans-info')}>Apply for Loan</a></li>
                     : null
                  }
                  {network === 'homestead' ? null : <Nav.Link  onClick={() => this.props.history.push('/mou')}><span style={{color:'#fff'}}>The mou Time Machine</span></Nav.Link>}

                  { this.props.store.walletInstance.address ?
                    <Nav.Link  onClick={() => this.props.history.push('/rewards')}><span style={{color:'#fff'}}>Vesting Rewards</span></Nav.Link>
                    : null
                  }

                   <Nav.Link onClick={() => this.props.history.push('/assurance')}><span style={{color:'#fff'}}>Assurance</span></Nav.Link>

                   <Nav.Link  href="/pdf/TimeAlly-Terms-Use.pdf" target="_blank" ><span style={{color:'#fff'}}>T & C</span></Nav.Link>

                        {/* <Nav.Link href="#link">Link</Nav.Link> */}
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                      </Nav>
                    </Navbar.Collapse>
                  </Navbar>
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

      //     <DropdownButton alignRight id="dropdown-basic-button" title={this.props.store.walletInstance.address ? `Welcome ${String(this.props.store.walletInstance.address).substr(0,6)}...` : 'Era Swap Wallet'} variant="outline-light" drop="down">

      //       {/*<Dropdown.Header>Your HD Accounts</Dropdown.Header>
      //       <Dropdown.Item>Signed in as 0x124B7... (23.75 ES)</Dropdown.Item>*/}

      //       {/* show if not signed in*/
      //       !this.props.store.walletInstance.address ? <Dropdown.Item onClick={() => this.props.history.push('/create-wallet')}>Create Wallet</Dropdown.Item> : null}

      //       {/* show if not signed in*/
      //       !this.props.store.walletInstance.address ? <Dropdown.Item onClick={() => this.props.history.push('/load-wallet')}>Load Wallet</Dropdown.Item> : null}

      //       {/* show if not signed in*/
      //       this.props.store.walletInstance.address ? <Dropdown.Item onClick={() => this.props.history.push('/user')}>Account page</Dropdown.Item> : null}

      //       {/* show if not signed in*/
      //       this.props.store.walletInstance.address ? <Dropdown.Item onClick={() => {
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
