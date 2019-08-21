const util = require('util');
const ethers = require('ethers');
const { esContract, nrtManager, timeally } = require('./src/env');
const provider = ethers.getDefaultProvider();
const esInstance = new ethers.Contract(esContract.address, esContract.abi, provider);
const nrtManagerInstance = new ethers.Contract(nrtManager.address, nrtManager.abi, provider);
const timeallyInstance = new ethers.Contract(timeally.address, timeally.abi, provider);

(async() => {

  /// @dev getting number of total active users
  await (async() => {
    const newStakingEventSig = ethers.utils.id("NewStaking(address,uint256,uint256,uint256)");
    const topics = [ newStakingEventSig, null, null, null ];

    const logs = await provider.getLogs({
      address: timeally.address,
      fromBlock: 0, //(await this.props.store.providerInstance.getBlockNumber()) - 5760,
      toBlock: 'latest',
      topics
    });

    const addressArray = [];
    let totalAmount = ethers.utils.bigNumberify(0);

    for(const log of logs) {
      const address = ethers.utils.hexZeroPad(ethers.utils.hexStripZeros(log.topics[1]), 20);
      const amount = ethers.utils.bigNumberify(log.data.slice(0,66));
      // console.log(address);
      if(!addressArray.includes(address)) addressArray.push(address);
      // console.log(log.data.slice(0,66));
      totalAmount = totalAmount.add(amount);
    }

    console.log(`Total TimeAlly platform users are: ${addressArray.length}`);
    console.log(`Total Staking in the platform is of ${ethers.utils.formatEther(totalAmount)} ES`);
  })();

  /// @dev getting number of active users in last month
  await (async() => {
    const newStakingEventSig = ethers.utils.id("NewStaking(address,uint256,uint256,uint256)");
    const topics = [ newStakingEventSig, null, null, null ];

    const logs = await provider.getLogs({
      address: timeally.address,
      fromBlock: (await provider.getBlockNumber()) - Math.floor(2629744 / 14),
      toBlock: 'latest',
      topics
    });

    const addressArray = [];
    let totalAmount = ethers.utils.bigNumberify(0);

    for(const log of logs) {
      const address = ethers.utils.hexZeroPad(ethers.utils.hexStripZeros(log.topics[1]), 20);
      const amount = ethers.utils.bigNumberify(log.data.slice(0,66));
      // console.log(address);
      if(!addressArray.includes(address)) addressArray.push(address);
      // console.log(log.data.slice(0,66));
      totalAmount = totalAmount.add(amount);
    }

    console.log(`New TimeAlly platform users this month are: ${addressArray.length}`);
    console.log(`New Staking in the platform this month is of ${ethers.utils.formatEther(totalAmount)} ES`);
  })();

  /// @dev generate data for Anu's dashboard
  await (async() => {
    const newStakingEventSig = ethers.utils.id("NewStaking(address,uint256,uint256,uint256)");
    const topics = [ newStakingEventSig, null, null, null ];

    const logs = await provider.getLogs({
      address: timeally.address,
      fromBlock: (await provider.getBlockNumber()) - Math.floor(2629744 / 14),
      toBlock: 'latest',
      topics
    });

    const addressArray = [];
    let totalAmount = ethers.utils.bigNumberify(0);
    const anuArray = [];

    const lessDecimals = (ethersBigNumber, decimals = 2) => {
      let lessDecimals = ethers.utils.formatEther(ethersBigNumber).split('.');
      if(lessDecimals[1].length >= decimals) {
        lessDecimals[1] = lessDecimals[1].slice(0, decimals);
      }
      return lessDecimals.join('.');
    }

    for(const log of logs) {
      const amount = ethers.utils.bigNumberify(log.data.slice(0,66));
      anuArray.push([
        log.blockNumber,
        +lessDecimals(amount, 2)
      ]);
    }

    console.log(`Anu's array is:`, util.inspect(anuArray, { maxArrayLength: null }));
  })();

  (async() => {
    const currentMonth = Number(await timeallyInstance.functions.getCurrentMonth());
    const nrtRelease = await timeallyInstance.functions.timeAllyMonthlyNRT(currentMonth);
    console.log(`NRT released this month is ${ethers.utils.formatEther(nrtRelease)} ES`);
  })();
})();
