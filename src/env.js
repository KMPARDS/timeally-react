const eraSwapTokenJSON = require('./ethereum/compiledContracts/Eraswap_0.json');
const nrtManagerJSON = require('./ethereum/compiledContracts/NRTManager_0.json');
const timeAllyJSON = require('./ethereum/compiledContracts/TimeAlly_0.json');

module.exports = {
  network: 'kovan',
  esContract: {
    address: '0x94FE8BAC9C897D5c51D189796A0D7cEA749Aa209',
    abi: eraSwapTokenJSON.abi
  },
  nrtManager: {
    address: '0x1Ff7add413c10E2F96CddF210f89AdDc607d9540',
    abi: nrtManagerJSON.abi
  },
  timeally: {
    address: '0x9F239f20A3c506c2B0c941C5160eC6c8F0874dD6',
    abi: timeAllyJSON.abi
  }
};
