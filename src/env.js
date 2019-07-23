const eraSwapTokenJSON = require('./ethereum/compiledContracts/Eraswap_0.json');
const nrtManagerJSON = require('./ethereum/compiledContracts/NRTManager_0.json');
const timeAllyJSON = require('./ethereum/compiledContracts/TimeAlly_0.json');

module.exports = {
  network: 'kovan',
  esContract: {
    address: '0x8737812fCF6328E0ED8A2d39B5AfC54e9f23bFDe',
    abi: eraSwapTokenJSON.abi
  },
  nrtManager: {
    address: '0xb12575AD2d4954C45Da8Ec7A1c0993F4803a3c0c',
    abi: nrtManagerJSON.abi
  },
  timeally: {
    address: '0xF90fF80d7312FAc992E3C18B57FFd07788DF5D78',
    abi: timeAllyJSON.abi
  }
};
