const eraSwapTokenJSON = require('./ethereum/compiledContracts/Eraswap_0.json');
const nrtManagerJSON = require('./ethereum/compiledContracts/NRTManager_0.json');
const timeAllyJSON = require('./ethereum/compiledContracts/TimeAlly_0.json');

module.exports = {
  network: 'kovan',
  esContract: {
    address: '0xCD36e87d3606E479B937c46318882BC77B400976',
    abi: eraSwapTokenJSON.abi
  },
  nrtManager: {
    address: '0xAb138Ced38F5C2D8EDB6DA5C0E078075fc2BFf02',
    abi: nrtManagerJSON.abi
  },
  timeally: {
    address: '0x401CABee9749fF0C5b7280F04D62784C5d465C27',
    abi: timeAllyJSON.abi
  }
};
