const eraSwapTokenJSON = require('./ethereum/compiledContracts/Eraswap_0.json');
const nrtManagerJSON = require('./ethereum/compiledContracts/NRTManager_0.json');
const timeAllyJSON = require('./ethereum/compiledContracts/TimeAlly_0.json');

module.exports = {
  network: 'kovan',
  esContract: {
    address: '0x1e9eb4A77E22EA60a4F3207534044713E0fd71EB',
    abi: eraSwapTokenJSON.abi
  },
  nrtManager: {
    address: '0x6AE6C7454587e5949765C757Ea12F1a03f105347',
    abi: nrtManagerJSON.abi
  },
  timeally: {
    address: '0x6056C61529911b18Ba17165C030B7bD2B47197ee',
    abi: timeAllyJSON.abi
  }
};
