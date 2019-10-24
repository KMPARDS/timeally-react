import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import Layout from '../Layout/Layout';

class SIP extends Component {
  render = () => (
    <Layout
      breadcrumb={['Home', 'SIP']}
      title="TimeAlly Super Goal Achiever Plan"
    >
      <p>TimeAlly Retirement Plans are a Smart Contract Protocol based plans, that
are extraordinarily intended to meet your post-retirement needs, for
example, medical and living costs. To safeguard your interest, so that you
can make the most of your golden years with financial independence, these
arrangements help you plan for your expenses and secure your future.</p>

  <p>There are multiple plans including short and long durations. All you have to
do is choose one plan and stake ES monthly until the due date, and get
returns with profits for 9 years, monthly. So you can be financially
independent while enjoying life with your loved ones.
Why TimeAlly Super Goal Achiever Plan?
● Monthly Annuity in Era Swap (ES)
Annuity received per month will be 20% of ES staked every month for
the next 9 years.
● Booster Bonus
33.33% of total stacked ES- 1st Accumulation Year gets released on
every 49/85/109th Month.
● DaySwapper Partners Rewards
DaySwappers Reward is applicable on monthly ES Stacked for 1
year on 5% Direct Bounty in Es as well 5% Bounty as per
Dayswappers Tree, and Monthly Annuity for 9 Years 1% Direct
Bounty and Bounty as per DaySwappers Tree.
SIP Payment Terms
1. SIP Starts with Minimum 500 ES and above
2. SIP Payment Grace period in 10 Days. If Default there will 10%
reduction on Booster bonus applicable.
3. Month is defined as per NRT month.
4. There will be an additional 10% on TOP-UP ES staked for any month.

You should also check what rules and protections apply to your respective
jurisdictions before investing or participating in any way. The Creators &amp;
community will not compensate you for any losses from trading, investment
or participating in any way. You should read whitepaper carefully before
participating and consider whether these products are right for you.
*White-paper Link*</p>

  <Button onClick={() => this.props.history.push('/sip/calculate')}>Calculate</Button>

    </Layout>
  );
}

export default SIP;
