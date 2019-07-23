const eraSwapTokenJSON = require('./ethereum/compiledContracts/Eraswap_0.json');
const nrtManagerJSON = require('./ethereum/compiledContracts/NRTManager_0.json');
const timeAllyJSON = require('./ethereum/compiledContracts/TimeAlly_0.json');

module.exports = {
  network: 'kovan',
  esContract: {
    address: '0x3e9923Eae5a0Ae954235e28631f36eB13362490e',
    abi: eraSwapTokenJSON.abi
  },
  nrtManager: {
    address: '0x13709D7585949902637a6baBa43D7909b8b95402',
    abi: nrtManagerJSON.abi
  },
  timeally: {
    address: '0x1F3fE67eb6C2bE76DED8A054e0E29D89F18E405F',
    abi: timeAllyJSON.abi
  }
};
