import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class FooterComponent extends Component {
  render() {
    return (
      <>
      <div className="footer section-space20" style={{ paddingBottom: '0px'}}>
        {/* footer */}
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="footer-logo" style={{ fontSize: '30px'}}>
                {/* Footer Logo */}
                {/* <img src="images/ft-logo.png" alt="Borrow - Loan Company Website Templates" />  */}
                <ul className="list-unstyled list-inline social2 text-center text-white">
                <li className="list-inline-item">
                  <a href="https://github.com/KMPARDS" target="_blank" rel="noopener noreferrer"><i className="fa fa-github"></i></a>
                </li>
                <li className="list-inline-item telegram">
                  <a href="https://t.me/eraswap" target="_blank" rel="noopener noreferrer"><i className="fa fa-telegram"></i></a>
                </li>
                <li className="list-inline-item">
                  <a href="https://twitter.com/eraswaptec" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a>
                </li>
                <li className="list-inline-item">
                  <a href="https://www.facebook.com/eraswap" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a>
                </li>
                <li className="list-inline-item">
                  <a href="https://www.instagram.com/eraswap/?hl=en" target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram"></i></a>
                </li>
                <li className="list-inline-item">
                  <a href="https://www.youtube.com/channel/UCGCP4f5DF1W6sbCjS6y3T1g?view_as=subscriber" target="_blank" rel="noopener noreferrer"><i className="fa fa-youtube"></i></a>
                </li>
                <li className="list-inline-item">
                  <a href="https://www.linkedin.com/company/eraswap/" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin"></i></a>
                </li>
                {/* <li className="list-inline-item">
                  <a href="https://plus.google.com/u/2/107638861216745114245" target="_blank"><i className="fa fa-google-plus"></i></a>
                </li> */}
                <li className="list-inline-item">
                  <a href="https://www.reddit.com/user/EraSwap" target="_blank" rel="noopener noreferrer"><i className="fa fa-reddit"></i></a>
                </li>
                <li className="list-inline-item">
                  <a href="https://medium.com/@eraswap" target="_blank" rel="noopener noreferrer"><i className="fa fa-medium"></i></a>
                </li>
                <li className="list-inline-item">
                  <a href="https://eraswap.tumblr.com/" target="_blank" rel="noopener noreferrer"><i className="fa fa-tumblr"></i></a>
                </li>
                <li className="list-inline-item">
                  <a href="https://mix.com/eraswap" target="_blank" rel="noopener noreferrer"><i className="fa fa-stumbleupon"></i></a>
                </li>
                <li className="list-inline-item">
                <a href="https://www.pinterest.com/eraswapt" target="_blank" rel="noopener noreferrer"><i className="fa fa-pinterest"></i></a>
                </li>
                <li className="list-inline-item">
                  <a href="https://bitcointalk.org/index.php?topic=5025979.msg45502457" target="_blank" rel="noopener noreferrer"><i className="fa fa-btc"></i></a>
                </li>
                <li className="list-inline-item"><a href="https://coinmarketcap.com/currencies/era-swap/" target="_blank"><img src="/images/cmc.png" style={{height: '25px', marginBottom: '7px'}} /></a></li>
                <li className="list-inline-item" style={{marginLeft:'-4px'}}><a href="https://ethplorer.io/address/0xef1344bdf80bef3ff4428d8becec3eea4a2cf574" target="_blank"><img src="/images/ethplorer2.png" style={{height: '25px', marginBottom: '7px'}} /></a></li>
              </ul>
                </div>
              {/* /.Footer Logo */}
            </div>
          </div>
          <div className="row">
          </div>
        </div>
      </div>
      {/* /.footer */}
      <div className="tiny-footer">
        {/* tiny footer */}
        <div className="container">
          <div className="row">
            {/*<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
              <p style={{color:'#fff'}}>Time Ally</p>
            </div>*/}
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style={{ margin: '0 auto' }}>
              <p style={{color:'#fff'}}>
                <a rel="noopener noreferrer" href="https://etherscan.io/address/0x5630ee5f247bd6b61991fbb2f117bbeb45990876#code" target="_blank" rel="noopener noreferrer">TA Smart Contract Address: 0x5630ee5f247Bd6B61991FBB2f117bBEb45990876</a> | <a style={{cursor:'pointer'}} onClick={() => this.props.history.push('/view-all-world-staking')}>View All World Staking</a><br/>{/*&nbsp; | &nbsp;*/}
                <a href="/pdf/TimeAlly_Contract_Security_Software_Testing_Report.pdf" target="_blank"  >Contract, Security, and Software Testing Reports</a> &nbsp; | &nbsp;
                <a href="/pdf/TimeAlly.pdf" target="_blank">User Guide</a> &nbsp; | &nbsp;
                <a href="http://eraswaptoken.io/pdf/eraswap_whitepaper.pdf" target="_blank"  >Era Swap White Paper</a> &nbsp; | &nbsp;
                <a href="http://eraswaptoken.io/pdf/era-swap-howey-test-letter-august7-2018.pdf" target="_blank" rel="noopener noreferrer">Howey Test</a> &nbsp; | &nbsp;
               <a href="https://eraswaptoken.io/pdf/eraswap-terms-conditions.pdf" target="_blank">Era Swap Terms & Conditions</a> | &nbsp;
                 | &nbsp;  <a href="/pdf/timeally-terms-condtions.pdf" target="_blank">Terms of use</a> &nbsp;
                 | &nbsp; <a href="/pdf/timeally-privacy-policy.pdf" target="_blank">Privacy Policy</a> &nbsp;
                 | &nbsp; <a href="/pdf/TSGAP_without_DaySwappers_Incentive.pdf" target="_blank">TSGAP</a> &nbsp;
                 | &nbsp; <a href="/pdf/TimeAlly_PET_without_DaySwappers_Incentive.pdf" target="_blank">PET</a> &nbsp;
                 | &nbsp; <a href="/pdf/TimeAlly_without_DaySwappers_Incentive.pdf" target="_blank">TimeAlly</a>
                 | &nbsp; <a href="/excel/1L1T_Cal.xlsx" target="_blank">1 Life Time</a>




              </p>
            </div>

          </div>
        </div>
      </div>
      </>
    );
  }
}

export default connect(state => {return{store: state}})(withRouter(FooterComponent));
