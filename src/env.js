const eraSwapTokenJSON = require('./ethereum/compiledContracts/Eraswap_0.json');
const nrtManagerJSON = require('./ethereum/compiledContracts/NRTManager_0.json');
const timeAllyJSON = require('./ethereum/compiledContracts/TimeAlly_0.json');

module.exports = {
  network: 'kovan',
  esContract: {
    address: '0x241A7aebE3b425Ee251eb06f3D00006B9509aBcB',
    abi: eraSwapTokenJSON.abi
  },
  nrtManager: {
    address: '0x332D3Cb0071ac0FB71141dD15882304e31f2e2a4',
    abi: nrtManagerJSON.abi
  },
  timeally: {
    address: '0x32af5428F0C0e5BDeceFe4F28617e0027DD69811',
    abi: timeAllyJSON.abi
  }
};
