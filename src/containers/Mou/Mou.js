import React, { Component } from 'react';
import { connect } from 'react-redux';

class Mou extends Component {
  state = {
    seconds: '',
    paraMessage: '',
    errorMessage: '',
    lastNRTrelease: 0
  };

  componentDidMount = () => {
    this.updateNRTRelease();
  };

  updateNRTRelease = async () => {
    const lastNRTrelease = await this.props.store.nrtInstance.functions.lastNRTRelease();
    this.setState({ lastNRTrelease });
  }

  goToPast = async () => {
    this.setState({ paraMessage: 'Please wait starting time machine...' });
    try {
      const tx = await this.props.store.esInstance.goToFuture( Number(this.state.seconds) );
      this.setState({ paraMessage: 'Please wait, time travelling back to the past!' });
      await tx.wait();
      this.setState({ paraMessage: 'Done! We\'ve reached destination' });
      setTimeout(()=>this.setState({ paraMessage: '' }), 1500);
      window.updateTheNavbar({ type: 'update time yaar' });
    } catch(err) {
      this.setState({ paraMessage: '', errorMessage: err.message });
    }
  };

  goToFuture = async () => {
    this.setState({ paraMessage: 'Please wait starting time machine...' });
    try {
      const tx = await this.props.store.esInstance.goToPast( Number(this.state.seconds) );
      this.setState({ paraMessage: 'Please wait, time travelling to the future!' });
      await tx.wait();
      this.setState({ paraMessage: 'Done! We\'ve reached destination' });
      setTimeout(()=>this.setState({ paraMessage: '' }), 1500);
      window.updateTheNavbar({ type: 'update time yaar' });
    } catch(err) {
      this.setState({ paraMessage: '', errorMessage: err.message });
    }
  };

  oneMonthPlusNRT = async () => {
    this.setState({ paraMessage: 'Please wait releasing the monthly NRT 🤤 !!!' });
    try {
      await this.props.store.nrtInstance.functions.MonthlyNRTRelease();
      this.setState({ paraMessage: 'Yay! NRT release is done!!!' });
      setTimeout(()=>this.setState({ paraMessage: '' }), 1500);
    } catch (err) {
      this.setState({ paraMessage: '', errorMessage: err.message });
    }


    setTimeout(()=>this.updateNRTRelease(), 2000);
  };

  render() {
    if(this.state.paraMessage) {
      return (
        <p>{this.state.paraMessage}</p>
      );
    } else {
      return (
        <div class="container mou-bg">
            <div class="row">
                <div class="col-md-12">
                    <h2 class="mt40 pdb30">The mou Time Machine </h2>
                    <button class="btn main-btn btn-default btn-sm  margin-custom" onClick={this.goToPast}>{'<='} Go to Past</button>
                    <input type="text" placeholder="Enter no of seconds" onKeyUp={e => this.setState({ seconds: e.target.value})} />
                    <button class="btn main-btn btn-default btn-sm margin-custom" onClick={this.goToFuture}>Go to Future {'=>'}</button>
                    <br /><br />
                    <button class="btn main-btn btn-success btn-sm margin-custom mt30" onClick={this.oneMonthPlusNRT}>Trigger NRT Release</button>
                    {
                      this.state.errorMessage
                      ? <div><br />
                      <p>Error from Blockchain: {this.state.errorMessage}</p></div>
                      : null
                    }
                    <h3 class="number-title">LastNrTrelease: {this.state.lastNRTrelease ? new Date(this.state.lastNRTrelease * 1000).toLocaleString() : 'Checking with NRT Contract...'}</h3>
                    <table style={{display: 'block', margin: '0 auto'}}>
                      <tr>
                        <td>30.5 days</td>
                        <td>2635200</td>
                      </tr>
                      <tr>
                        <td>366 days</td>
                        <td>31622400</td>
                      </tr>
                      <tr>
                        <td>61 days</td>
                        <td>5270400</td>
                      </tr>
                    </table>
                </div>
            </div>
        </div>
      );
    }

  }
}

export default connect(state => {return{store: state}})(Mou);
