import React, { Component } from 'react';

class Layout extends Component {
  render = () => (
    <div>
        <div className="page-header">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="page-breadcrumb">
                      <ol className="breadcrumb">
                        {this.props.breadcrumb.map((name, index) => (
                          <li className={this.props.breadcrumb.length - 1 === index ? 'active' : ''}>{name}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="bg-white pinside30">
                      <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-3 col-sm-12 col-12">
                          <h1 className="page-title">{this.props.title}</h1>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12">

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
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

        </div>
     </div>
  );
}

export default Layout;
