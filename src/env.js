const eraSwapTokenJSON = require('./ethereum/compiledContracts/Eraswap_0.json');
const nrtManagerJSON = require('./ethereum/compiledContracts/NRTManager_0.json');
const timeAllyJSON = require('./ethereum/compiledContracts/TimeAlly_0.json');

module.exports = {
  network: 'kovan',
  esContract: {
    address: '0xE7433182D27456426f23E6FF09E3425c9bf0391A',
    abi: eraSwapTokenJSON.abi
  },
  nrtManager: {
    address: '0x6Ba673Bb40Fee525A1cD5Ccf3e58d092bF2C3b56',
    abi: nrtManagerJSON.abi
  },
  timeally: {
    address: '0xb69e6316CCD86C023392d411848D47a8207F4F51',
    abi: timeAllyJSON.abi
  }
};
