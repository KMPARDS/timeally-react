const eraSwapTokenJSON = require('./ethereum/compiledContracts/Eraswap_0.json');
const nrtManagerJSON = require('./ethereum/compiledContracts/NRTManager_0.json');
const timeAllyJSON = require('./ethereum/compiledContracts/TimeAlly_0.json');

module.exports = {
  network: 'kovan',
  esContract: {
    address: '0x6a974C032b725257df01FC647E6e1A62F36eB9a7',
    abi: eraSwapTokenJSON.abi
  },
  nrtManager: {
    address: '0x006caa77aB01f36eEe45B43D58A3dffCA6258926',
    abi: nrtManagerJSON.abi
  },
  timeally: {
    address: '0xe5B465fC56cf7212293d447bE578Ae8A127fFa00',
    abi: timeAllyJSON.abi
  }
};
