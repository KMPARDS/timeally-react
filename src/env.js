const eraSwapTokenJSON = require('./ethereum/compiledContracts/Eraswap_0.json');
const nrtManagerJSON = require('./ethereum/compiledContracts/NRTManager_0.json');
const timeAllyJSON = require('./ethereum/compiledContracts/TimeAlly_0.json');

module.exports = {
  network: 'kovan',
  esContract: {
    address: '0x0269f9BE76A6e55A3c8dC099e7c157bA60Cb3F16',
    abi: eraSwapTokenJSON.abi
  },
  nrtManager: {
    address: '0x4CdEC678773c79a4dBE995aDaa857Da3D10c04c1',
    abi: nrtManagerJSON.abi
  },
  timeally: {
    address: '0x4B0a6D7f5460CcDF76fE4acc251228D568c2a2dd',
    abi: timeAllyJSON.abi
  }
};
