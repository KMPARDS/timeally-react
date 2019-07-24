const eraSwapTokenJSON = require('./ethereum/compiledContracts/Eraswap_0.json');
const nrtManagerJSON = require('./ethereum/compiledContracts/NRTManager_0.json');
const timeAllyJSON = require('./ethereum/compiledContracts/TimeAlly_0.json');

module.exports = {
  network: 'kovan',
  esContract: {
    address: '0xc8920122D600464F50249B2f13dd36324EF42bf0',
    abi: eraSwapTokenJSON.abi
  },
  nrtManager: {
    address: '0x74ceb681194D24Fcbb8EA80e743c4ca4C0fA4414',
    abi: nrtManagerJSON.abi
  },
  timeally: {
    address: '0x48896154AEA29827887A6F96BB7D99Fb19C40A8C',
    abi: timeAllyJSON.abi
  }
};
