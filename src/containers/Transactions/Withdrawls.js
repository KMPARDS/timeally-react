import React from 'react';
import { Container, Button } from 'react-bootstrap';

export default props => (
  <div>
  <div className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li><a href="index.html">Home</a></li>
                  <li className="active">Withdrawals</li>
                </ol>
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="bg-white pinside30">
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12">
                    <h1 className="page-title">Withdrawals</h1>
                  </div>
                  <div className="col-xl-8 col-lg-8 col-md-3 col-sm-12 col-12">                                
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">                              
                        <Button className="btn-default" onClick={() => props.history.push('/transactions/stakings')}>View only stakings</Button>
                        <Button onClick={() => props.history.push('/transactions/withdrawls')}>View only Withdrawals</Button>                              
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>        
  <div>
<div className="container">
    <div className="row">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="wrapper-content bg-white pinside10">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <table className="table table-image">
                  <thead>
                    <tr>
                      <th scope="col" style={{fontSize:'11px', fontWeight:'500'}}>f57c2b95cfa2e7e722508ac8e524df5d86a8bd6565ae4b05d28cc2e74bb199d2</th>                  
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"  style={{fontSize:'11px', fontWeight:'500', textAlign:'right'}}>2019-07-18 11:52:16</th>                          
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row" style={{fontSize:'14px', fontWeight:'500'}}>No Inputs (Newly Generated Coins)</th> 
                      <td style={{fontSize:'35px', fontWeight:'100', color: '#971802'}}><i class="fa fa-long-arrow-right"></i></td>
                      <td>
                        <span style={{color: '#007bff'}}>1KFHE7w8BhaENAswwryaoccDb6qcT6DbYY</span><br></br>
                        <span style={{color: '#971802'}}>Unable to decode output address </span><br></br>
                        <span style={{color: '#971802'}}>Unable to decode output address </span>
                      </td>
                      <td style={{textAlign:'right'}}>13.15531269 BTC<br></br>
                      0 BTC<br></br>
                      0 BTC<br></br>
                      <button type="button" class="btn btn-secondary small-btn">13.15531269 BTC</button>
                      </td>                  
                    </tr>                                       
                  </tbody>
                  <thead>
                    <tr>
                      <th scope="col" style={{fontSize:'11px', fontWeight:'500'}}>f57c2b95cfa2e7e722508ac8e524df5d86a8bd6565ae4b05d28cc2e74bb199d2</th>                  
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"  style={{fontSize:'11px', fontWeight:'500', textAlign:'right'}}>2019-07-18 11:52:16</th>                          
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row" style={{fontSize:'14px', fontWeight:'500'}}>No Inputs (Newly Generated Coins)</th> 
                      <td style={{fontSize:'35px', fontWeight:'100', color: '#971802'}}><i class="fa fa-long-arrow-right"></i></td>
                      <td>
                        <span style={{color: '#007bff'}}>1KFHE7w8BhaENAswwryaoccDb6qcT6DbYY</span><br></br>
                        <span style={{color: '#971802'}}>Unable to decode output address </span><br></br>
                        <span style={{color: '#971802'}}>Unable to decode output address </span>
                      </td>
                      <td style={{textAlign:'right'}}>13.15531269 BTC<br></br>
                      0 BTC<br></br>
                      0 BTC<br></br>
                      <button type="button" class="btn btn-secondary small-btn">13.15531269 BTC</button>
                      </td>                  
                    </tr>                                       
                  </tbody>
                </table>   
            </div>                
          </div>
        </div>
      </div>
    </div>
    </div>
</div>
</div>
);
