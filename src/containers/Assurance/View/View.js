import React, { Component } from 'react';
import { Button,Table } from 'react-bootstrap';

import Layout from '../../Layout/Layout';
import '../Assurance.css';


class View extends Component {
    render = () => (
        <Layout
            breadcrumb={['Home', 'Assurance','View']}
            title='Assurance View'>
            <Table responsive>
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Date of Staking</th>
                <th>Plan</th>
                <th>Commitment Amount</th>
                <th>Next Due</th>
                <th>Date of Deposit</th>
                <th>Click on the buttons to view</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td><Button onClick={() => this.props.history.push('/assurance/view/1')}>View</Button></td>
              </tr>
              <tr>
                <td>2</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td><Button>View</Button></td>
              </tr>
              <tr>
                <td>3</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td><Button>View</Button></td>
              </tr>
            </tbody>
          </Table>
        </Layout>
        
    );
}

export default View;