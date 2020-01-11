import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import Layout from '../Layout/LayoutPET';

const ethers = require('ethers');

class PET extends Component {
  state = {
    fundsDeposit: null,
    pendingBenefits: null,
    showLoginModal: false
  };

  componentDidMount = async() => {
    const fundsBucketAddress = await this.props.store.petInstance.functions.fundsBucket();

    (async() => {
      const fundsDeposit = await this.props.store.esInstance.functions.balanceOf(fundsBucketAddress);
      this.setState({ fundsDeposit });
    })();

    (async() => {
      // const pendingBenefits = await this.props.store.esInstance.functions.balanceOf(this.props.store.petInstance.address);

      const sumBN = (await this.props.store.providerInstance.getLogs({
        address: this.props.store.esInstance.address,
        fromBlock: 0,
        toBlock: 'latest',
        topics:[
          '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
          ethers.utils.hexZeroPad(fundsBucketAddress, 32),
          ethers.utils.hexZeroPad(this.props.store.petInstance.address, 32)
        ]
      })).map(log => ethers.utils.bigNumberify(log.data) ).reduce( (sumBN, valueBN) => sumBN.add(valueBN), ethers.constants.Zero);

      this.setState({ pendingBenefits: sumBN });
    })();
  }

  render = () => (
    <Layout
      breadcrumb={['Home', 'PET']}
      title="Personal EraSwap Teller"
      transparent={true}
      buttonName="New PET"
      buttonOnClick={this.props.store.walletInstance && this.props.store.walletInstance.address
        ? () => this.props.history.push('/pet/new')
        : () => (
          window.returnLocationAfterLoadWallet={
            name:'New PET',
            location:'/pet/new',
            sourceLocation:this.props.location.pathname
          },this.setState({showLoginModal:true})
        )}
    >
      <div className="container pinside30 position-top" style={{'background-color': '#EFF3F8 !important', 'margin-bottom': '30px', 'border-radius': '20px'}}>
        <h2 style={{marginTop: '1rem'}}>TimeAlly PET for Acheivers</h2>
        <p style={{marginBottom: '1rem'}}>TimeAlly Retirement Plans are a Smart Contract Protocol based plans, that are extraordinarily intended to meet your post-retirement needs, for example, medical and living costs. It is secured SAP (Systematic Accumulation Plan) since the benefits for the stakers are stored in safely in Smart Contract which is transparent & most secure system driven.</p>
      </div>
      <div className="row">
        <div className="col-xl-4 col-md-12">
          <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
            <div className="circle circle-pet"><img src="./images/Companion.png"/></div>
            <h3 className="number-title">Companion</h3>
            <p>100% Additional bounty for your next 12 month ES Accumulation Guaranteed by PET Smart Contract.</p>
          </div>
        </div>
        <div className="col-xl-4 col-md-12">
          <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
          <div className="circle circle-pet"><img src="./images/Flexible.png"/></div>
            <h3 className="number-title">Flexible</h3>
            <p>Choose your PET Plan as per your Monthly Goals & Exepected Gains to meet your milestones.</p>
          </div>
        </div>
        <div className="col-xl-4 col-md-12">
          <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
            <div className="circle circle-pet"><img src="./images/Assurance.png"/></div>
            <h3 className="number-title">Assurance</h3>
            <p>Assures monthly annuity gain consistently for 5 Annuity Years based on your Monthly Goals Achievement.</p>
          </div>
        </div>
        <div className="col-xl-4 col-md-12">
          <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
          <div className="circle circle-pet"><img src="./images/bonuss.png"/></div>
            <h3 className="number-title">Pet Bonus</h3>
            <p>End of every five months, stakers are eligible for Power Booster bonus through Smart Contract.</p>
          </div>
        </div>
        <div className="col-xl-4 col-md-12">
          <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
          <div className="circle circle-pet"><img src="./images/Secure.png"/></div>
            <h3 className="number-title">Consistent & Secured</h3>
            <p>Smart Contract based safety, security & stability on your accumulations with a predefined set of rules.</p>
          </div>
        </div>
        <div className="col-xl-4 col-md-12">
          <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
          <div className="circle circle-pet"><img src="./images/Empower.png"/></div>
            <h3 className="number-title">Empower</h3>
            <p>Pet provides you complete control & transparency on your Monthly Accumulations & Returns.</p>
          </div>
        </div>
        <div className="col-xl-4 col-md-12">
          <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
            <div className="circle circle-pet"><img src="./images/DayswappersRewards.png"/></div>
            <h3 className="number-title">Day Swappers Rewards</h3>
            <p>Help others to achieve their goals to achieve your own through Day Swappers Rewards.</p>
          </div>
        </div>
        <div className="col-xl-4 col-md-12">
          <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
            <div className="circle circle-pet"><img src="./images/Guarantee.png"/></div>
            <h3 className="number-title">Guarantee</h3>
            <p>Complete Transparency of Rewards Allocated in Advance through Smart Contracts.</p>
          </div>
        </div>
        <div className="col-xl-4 col-md-12">
          <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
            <div className="circle circle-pet"><img src="./images/Appointees.png"/></div>
            <h3 className="number-title">Appointees</h3>
            <p>Trustless consensus after inactivity using multi-signing by assigned Appointees in PET for monthly SAP.</p>
          </div>
        </div>
      </div>
      <div className="outline pinside30 custom-background">
        <img src="./images/pet-robo.png" className="robo-img" />
        <p className="text-white" style={{'text-shadow': '0 0 3px #000a'}}><strong>ES in Funds Bucket Smart Contract:</strong> {
          this.state.fundsDeposit ? window.lessDecimals(this.state.fundsDeposit) + ' ES' : 'Loading...'}</p>
        <p className="text-white" style={{'text-shadow': '0 0 3px #000a'}}><strong>Benefits Already Alloted:</strong> {this.state.pendingBenefits ? window.lessDecimals(this.state.pendingBenefits) + ' ES' : 'Loading...'}</p>
        <Button style={{margin: '10px auto'}} onClick={this.props.store.walletInstance && this.props.store.walletInstance.address
          ? () => this.props.history.push('/pet/prepaid-es')
          : () => (
            window.returnLocationAfterLoadWallet={
              name:'PET Prepaid ES',
              location:'/pet/prepaid-es',
              sourceLocation:this.props.location.pathname
            },this.setState({showLoginModal:true})
          )}>PET Prepaid ES</Button>
        <Button onClick={this.props.store.walletInstance && this.props.store.walletInstance.address
          ? () => this.props.history.push('/pet/view')
          : () => (
            window.returnLocationAfterLoadWallet={
              name:'View My PETs',
              location:'/pet/view',
              sourceLocation:this.props.location.pathname
            },this.setState({showLoginModal:true})
          )}>View My PETs</Button>
        <p className="text-white" style={{marginTop:'1rem', 'text-shadow': '0 0 3px #000a'}}><a className="text-white" href="/excel/PET_Calculator.xlsx" target="_blank" style={{color: '#000', textDecoration: 'underline', 'text-shadow': '0 0 3px #000a'}}>PET Illustration Excel</a> | <a className="text-white" href="/excel/PET_Presenter.pptx" target="_blank" style={{color: '#000', textDecoration: 'underline', 'text-shadow': '0 0 3px #000a'}}>PET Presenter</a> | <a className="text-white" href="https://etherscan.io/address/0xbad9af4db5401b7d5e8177a18c1d69c35fc03fd3#code" target="_blank" style={{color: '#000', textDecoration: 'underline', 'text-shadow': '0 0 3px #000a'}}>PET Smart Contract</a></p>
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

export default connect(state => {return{store: state}})(PET);
