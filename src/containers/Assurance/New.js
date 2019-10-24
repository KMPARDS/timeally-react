import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import Layout from '../Layout/Layout';

class New extends Component {
    render = () => (
        <Layout
            breadcrumb={['Home', 'Assurance','New']}
            title='New Assurance'
        >
            <div class="card">
                <h2>New Assurance Step 1</h2>
                <input class="form-control new-form" type="text" placeholder="Enter amount for New Assurance"></input>
                <select class="form-control new-form">
                    <option>Select Assurance Plan</option>
                    <option>1</option>
                    <option>2</option>
                </select>
            </div>

            <div class="card">
                <div class="assurance-steps">
                    <h2>New Assurance Step 2</h2>
                    <div class="details">This step is for approving TimeAlly Smart Contract to collect 1 ES from your account. No funds will not be debited from your account in this step. Funds will be debited in Step 3 and sent into TimeAlly when you do New Staking transaction.</div>
                </div>
                <div class="details">
                    <Button>Approve Timeally</Button>
                    <Button variant="secondary">Back</Button>
                </div>
            </div>
            

            <div class="card">
                <div class="assurance-steps">
                    <h2>New Assurance Step 3</h2>
                    <p>Please click the following button to confirm your Assurance.</p>
                </div>
                <div class="details">
                    <Button>Assure</Button>
                </div>
            </div>
        </Layout>
        
    );
}

export default New;