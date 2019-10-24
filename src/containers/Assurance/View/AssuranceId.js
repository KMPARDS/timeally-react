import React, { Component } from 'react';
import { Button,Table } from 'react-bootstrap';

import Layout from '../../Layout/Layout';
import '../Assurance.css';

class AssuranceId extends Component {
    componentDidMount = () => {
        console.log(this.props);
    }
    render = () => (
        <Layout
            breadcrumb={['Home', 'Assurance','View']}
            title={this.props.match.params.id}>
            <Table responsive>
            <thead>
              <tr>
                <th>Month Number</th>
                <th>Deposits of All Months</th>
                <th>Status of All Months</th>
                <th>Click on button to Deposit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td><Button>Deposit</Button></td>
              </tr>
              <tr>
                <td>2</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td><Button>Deposit</Button></td>
              </tr>
              <tr>
                <td>3</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td><Button>Deposit</Button></td>
              </tr>
            </tbody>
          </Table>
        
        <div class="details">
            <Button>Benefit Page</Button>
        </div>
        
        <div class="details">
            <Button>Nominee Page</Button>
        </div>
         
         <div class="details">
            <Button>Power Booster Timer</Button>
         </div>
          
        </Layout>
        
    );
}

export default AssuranceId;