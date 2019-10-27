import React, { Component } from 'react';
import { Button,Table } from 'react-bootstrap';

import Layout from '../../../Layout/Layout';
import '../../Assurance.css';

class Benefits extends Component {
    componentDidMount = () => {
        console.log(this.props);
    }
    render = () => (
        <Layout
            breadcrumb={['Home', 'Assurance','View', this.props.match.params.id, 'Benefits']}
            title={this.props.match.params.id}>
            <Table responsive>
            <thead>
              <tr>
                <th>Month Number</th>
                <th>Benefit Amount</th>
                <th>Click on buttons to Select</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Table cell</td>
                <td><Button>Select</Button></td>
              </tr>
              <tr>
                <td>2</td>
                <td>Table cell</td>
                <td><Button>Select</Button></td>
              </tr>
              <tr>
                <td>3</td>
                <td>Table cell</td>
                <td><Button>Select</Button></td>
              </tr>
            </tbody>
          </Table>

        <div class="details">
            <Button>ABCD</Button>
        </div>

        </Layout>

    );
}

export default Benefits;
