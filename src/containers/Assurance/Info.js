import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import Layout from '../Layout/LayoutTSGAP';

const ethers = require('ethers');

class SIP extends Component {
  state = {
    fundsDeposit: null,
    pendingBenefits: null,
    showLoginModal: false
  };

  componentDidMount = () => {
    (async() => {
      const fundsDeposit = await this.props.store.sipInstance.functions.fundsDeposit();
      this.setState({ fundsDeposit });
    })();

    (async() => {
      const pendingBenefits = await this.props.store.sipInstance.functions.pendingBenefitAmountOfAllStakers();
      this.setState({ pendingBenefits });
    })();
  }

  render = () => (
    <Layout
      breadcrumb={['Home', 'Assurance']}
      title="TSGAP Right SAP for Achievers"
      transparent={true}
      buttonName="New SAP"
      buttonOnClick={this.props.store.walletInstance && this.props.store.walletInstance.address
        ? () => this.props.history.push('/assurance/new')
        : () => (
          window.returnLocationAfterLoadWallet={
            name:'New SAP',
            location:'/assurance/new',
            sourceLocation:this.props.location.pathname
          },this.setState({showLoginModal:true})
        )}
    >
      <div className="container pinside30 position-top" style={{'background-color': '#EFF3F8 !important', 'margin-bottom': '30px', 'border-radius': '20px'}}>
        <h2 style={{marginTop: '1rem'}}>TSGAP Right SAP for Achievers </h2>
        <p style={{marginBottom: '1rem'}}>TimeAlly Super Goal Achiever Plan (TSGAP) is a decentralized Smart Contract powered Systematic Accumulation Plan to safeguard your interest so that you can have a helping hand to support you achieving your goal & make the most of your golden years with financial independence </p>
			<Button onClick={this.props.store.walletInstance && this.props.store.walletInstance.address
			? () => this.props.history.push('/assurance/view')
			: () => (
			window.returnLocationAfterLoadWallet={
			name:'View My SAPs',
			location:'/assurance/view',
			sourceLocation:this.props.location.pathname
			},this.setState({showLoginModal:true})
			)}>View My SAPs</Button>

	 </div>
      <div className="row tsgap-fet">
        <div className="col-xl-4 col-md-12">
          <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
            <div className="circle circle-pet"><img src="./images/guarntee.png"/></div>
            <h3 className="number-title">Guarantee </h3>
            <p>TimeAlly Guarantee Transparency of Rewards allocated in advance through pre-defined rules of Smart Contract</p>
          </div>
        </div>
        <div className="col-xl-4 col-md-12">
          <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
          <div className="circle circle-pet"><img src="./images/power-of-compounding.png"/></div>
            <h3 className="number-title">Power of Compounding</h3>
            <p>With TimeAlly Power of Compounding, user can restake ES Utility using their rewards to constantly grow the principal amount </p>
          </div>
        </div>
        <div className="col-xl-4 col-md-12">
          <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
            <div className="circle circle-pet"><img src="./images/booster-bonus.png"/></div>
            <h3 className="number-title">Booster Bonus</h3>
            <p>End of every three years, stakers are eligible for Power Booster bonus through Smart Contract </p>
          </div>
        </div>
        <div className="col-xl-4 col-md-12">
          <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
          <div className="circle circle-pet"><img src="./images/dayswappers-reward.png"/></div>
            <h3 className="number-title">Day Swappers Reward</h3>
            <p>Receive additional rewards to achieve your goals, by introducing TimeAlly Plans to your circle and bringing individuals onboard </p>
          </div>
        </div>
        <div className="col-xl-4 col-md-12">
          <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
          <div className="circle circle-pet"><img src="./images/nominate.png"/></div>
            <h3 className="number-title">Nominate Your Legacy</h3>
            <p>Stakers can nominate their trusted ones in their Accumulation Plans, who will act on stakers behalf after its inactivity</p>
          </div>
        </div>
        <div className="col-xl-4 col-md-12">
          <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
          <div className="circle circle-pet"><img src="./images/appointees-tsgap.png"/></div>
            <h3 className="number-title">Appointees</h3>
            <p>The appointee is the custodian who can facilitate preponement of benefits to the nominee, staker can add multiple number of appointees</p>
          </div>
        </div>
      </div>

      <div className="outline pinside30 tsgap-sip-bg" style={{marginBottom: '1rem', backgroundColor: '#5da7c0'}}>
         <div class="row">
	         <div className="col-xl-4"> <img src="./images/timeally-tsgap.png" className="tsgap-img" /></div>
	         <div className="col-xl-8">
	     
	        <p><strong>ES Bucket In Smart Contract:</strong> {
	          this.state.fundsDeposit ? ethers.utils.formatEther(this.state.fundsDeposit) + ' ES' : 'Loading...'}</p>
	        <p><strong>Benefits Already Alloted:</strong> {this.state.pendingBenefits ? ethers.utils.formatEther(this.state.pendingBenefits) + ' ES' : 'Loading...'} ({this.state.fundsDeposit && this.state.pendingBenefits
	          ? window.lessDecimals(this.state.pendingBenefits.mul(ethers.utils.parseEther('100')).div(this.state.fundsDeposit), 4) + '% of fund bucket is allocated' : 'Loading...'})</p>
	        <Button onClick={() => this.props.history.push('/assurance/calculate')}>SAP Calculator</Button>
	        <Button onClick={this.props.store.walletInstance && this.props.store.walletInstance.address
	          ? () => this.props.history.push('/assurance/view')
	          : () => (
	            window.returnLocationAfterLoadWallet={
	              name:'View My SAPs',
	              location:'/assurance/view',
	              sourceLocation:this.props.location.pathname
	            },this.setState({showLoginModal:true})
	          )}>View My SAPs</Button>
	        <p style={{marginTop:'1rem'}}><strong>SAP Smart Contract Link:</strong> <a href="https://etherscan.io/address/0xbad9af4db5401b7d5e8177a18c1d69c35fc03fd3#code" target="_blank" style={{color: '#000', textDecoration: 'underline'}}>EtherScan</a></p>
	         </div>
         </div>
      </div>
      <Modal
        show={this.state.showLoginModal}
        onHide={ () => this.setState({ showLoginModal: false }) }
      >
        <Modal.Header closeButton>
          <Modal.Title>Wallet Needed</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>You need to load your ethereum wallet in order to proceed. Please click the below button to go to the load wallet page.</p>
          <Button
            onClick={() => this.props.history.push('/load-wallet')}
            variant="primary"
          >
            Go to Load Wallet Page
          </Button>
        </Modal.Body>
      </Modal>
    </Layout>
  );
}

export default connect(state => {return{store: state}})(SIP);
