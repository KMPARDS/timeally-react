const eraSwapTokenJSON = require('./ethereum/compiledContracts/Eraswap_0.json');
const nrtManagerJSON = require('./ethereum/compiledContracts/NRTManager_0.json');
const timeAllyJSON = require('./ethereum/compiledContracts/TimeAlly_0.json');

module.exports = {
  network: 'kovan',
  esContract: {
    address: '0x430aa05aFaE25F08180fb82C9155270A6c9ecB24',
    abi: eraSwapTokenJSON.abi
  },
  nrtManager: {
    address: '0x5aba1E60351db825Ab983406588fF8977F6EDbDe',
    abi: nrtManagerJSON.abi
  },
  timeally: {
    address: '0xe11e6B7bcDcbeB0D654a8f8C52a4B1DeEbe36F56',
    abi: timeAllyJSON.abi
  }
};
