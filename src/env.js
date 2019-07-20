const eraSwapTokenJSON = require('./ethereum/compiledContracts/Eraswap_0.json');
const nrtManagerJSON = require('./ethereum/compiledContracts/NRTManager_0.json');
const timeAllyJSON = require('./ethereum/compiledContracts/TimeAlly_0.json');

module.exports = {
  network: 'kovan',
  esContract: {
    address: '0x16EC3ad7bc3a3177916Bfb58B1A223aEe70CfAE9',
    abi: eraSwapTokenJSON.abi
  },
  nrtManager: {
    address: '0xD7E9b6A96DD41eC2c5542C1E8D240000039BB529',
    abi: nrtManagerJSON.abi
  },
  timeally: {
    address: '0x9f0220686128dCFFE6d18Ee46188c9c82717FE4D',
    abi: timeAllyJSON.abi
  }
};
