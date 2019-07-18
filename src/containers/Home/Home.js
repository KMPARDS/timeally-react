import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

import { timeally } from '../../env';

const ethers = require('ethers');

class Home extends Component {

  render() {
    return (
 <div>     
  <div className="hero-section">
      <div className="container">
        <div className="row">
          <div className="offset-xl-7 col-xl-5 offset-lg-2 col-lg-8 col-md-12 col-sm-12 col-12 ">
            <div className="hero-tab-block">
               <div class="lead-calculator pinside40">
                         <div class="row">
                             <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb10">
                             <div class="card-hero-block">
                                 <h1 class="text-white">Borrow Bonus Cash Back Platinum card</h1>
                                 <p class="text-white">After you spend $3,000 on purchases in the first 3 months after account opening. </p>                                    
                                 <div class="mt30">
                                     <a href="#" class="btn btn-default">find my rate</a>
                                 </div>
                             </div>   
                             </div>                            
                         </div>
                     </div>
               </div>
          </div>
        </div>
      </div>      
    </div>
    <div className="rate-table">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="rate-counter-block">
                <div className="icon rate-icon  "> <img src="images/mortgage.svg" alt="Borrow - Loan Company Website Template" className="icon-svg-1x" /></div>
                <div className="rate-box">
                  <h1 className="loan-rate">8,85,854</h1>
                  <small className="rate-title">Staking Amount</small>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="rate-counter-block">
                <div className="icon rate-icon  "> <img src="images/loan.svg" alt="Borrow - Loan Company Website Template" className="icon-svg-1x" /></div>
                <div className="rate-box">
                  <h1 className="loan-rate">21,21,558</h1>
                  <small className="rate-title">Available Stakes</small>
                </div>
              </div>
            </div>                           
          </div>
        </div>
      </div>
    <div className="section-space80 bg-light">
    <div className="container">
      <div className="row">
        <div className="offset-xl-2 col-xl-8 offset-lg-2 col-lg-8 col-md-12 col-sm-12 col-12">
          <div className="section-title text-center mb60">
            <h1>What is TimeAlly</h1>
            <p>TimeAlly is a decentralized social media platform that rewards all content creators.</p>
            <video width={400} controls poster="img/videobg.jpg">
          <source src="img/BLOCKLOGY-final1.mp4" type="video/mp4" />
          <source src="mov_bbb.ogg" type="video/ogg" />
          Your browser does not support HTML5 video.
        </video>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="card-hero-section">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12 col-12">
              {/* hero-caption */}
              <div className="card-hero-block">
                <h1 className="text-white">Erswap EcoSystem</h1>
                <p className="text-white">After you spend $3,000 on purchases in the first 3 months after account opening. </p>
                <span className="icon rate-done mb10 mr20"><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /> </span> <a href="#" className="btn-link-white">Read all 9,111 reviews</a>
                <div className="mt30">
                  <a href="#" className="btn btn-default">find my rate</a>
                </div>
              </div>
              {/* /.hero-caption */}
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-right">
              <div className="mt10">
                <img src="./images/card-img-1.png" alt className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    <div className="section-space80">
        <div className="container">
          <div className="row">
            <div className="offset-xl-2 col-xl-8 offset-md-2 col-md-8 offset-md-2 col-md-8 col-sm-12 col-12">
              <div className="section-title mb60 text-center">
                {/* section title start*/}
                <h1>Our Time Ally Products</h1>
                <p>If you know which productyou would like to apply for, choose one from below:</p>
              </div>
              {/* /.section title start*/}
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="business-loan-products bg-boxshadow">
                <div className="loan-products-icon"><i className="flaticon-get-money icon-4x icon-primary" /></div>
                <div className="loan-products-content">
                  <h3>Fast Business Cash</h3>
                  <p>Donec magna augue, mollis ac eros id, viverra facilisis lectus. Aliquam erat volutpat.</p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="business-loan-products bg-boxshadow">
                <div className="loan-products-icon"><i className="flaticon-time-is-money icon-4x icon-primary" /></div>
                <div className="loan-products-content">
                  <h3>Flexible Credit Line</h3>
                  <p> Quisque eget bibendum ipsum. Mauris eget tincidunt sapien. In ut mollis metus, id dignissim ipsum.</p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="business-loan-products bg-boxshadow">
                <div className="loan-products-icon"><i className="flaticon-rich icon-4x icon-primary" /></div>
                <div className="loan-products-content">
                  <h3>Unsecured Term Loan</h3>
                  <p>Mauris facilisis id est vel lobortis. Phasellus interdum feugiat purus eget condimentum.</p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="business-loan-products bg-boxshadow">
                <div className="loan-products-icon"><i className="flaticon-store-1 icon-4x icon-primary" /></div>
                <div className="loan-products-content">
                  <h3>Merchant Funding Loan</h3>
                  <p>Quisque elementum elit tortor, at blandit ante dignissim a. Aenean ornare rhoncus nibh in laoreet.</p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="business-loan-products bg-boxshadow">
                <div className="loan-products-icon"><i className="flaticon-stand icon-4x icon-primary" /></div>
                <div className="loan-products-content">
                  <h3>Small Business owner</h3>
                  <p>Quisque elementum elit tortor, at blandit ante dignissim a. Aenean ornare rhoncus nibh in laoreet. </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="business-loan-products bg-boxshadow">
                <div className="loan-products-icon"><i className="flaticon-safebox-1 icon-4x icon-primary" /></div>
                <div className="loan-products-content">
                  <h3>Secured Business Loan </h3>
                  <p>Quisque elementum elit tortor, at blandit ante dignissim a. Aenean ornare rhoncus nibh in laoreet. </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
  </div>
    );
  }
};

export default connect(state => {return{store: state}})(withRouter(Home));
