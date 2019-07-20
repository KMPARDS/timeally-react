const eraSwapTokenJSON = require('./ethereum/compiledContracts/Eraswap_0.json');
const nrtManagerJSON = require('./ethereum/compiledContracts/NRTManager_0.json');
const timeAllyJSON = require('./ethereum/compiledContracts/TimeAlly_0.json');

module.exports = {
  network: 'kovan',
  esContract: {
    address: '0x8b2C9732137bAD7e629139B1fDa9E6094368f6B4',
    abi: eraSwapTokenJSON.abi
  },
  nrtManager: {
    address: '0xe021bf70cE7C47d9744b2BdbFC7bdA1b4C7cAbD9',
    abi: nrtManagerJSON.abi
  },
  timeally: {
    address: '0x9e805A912edf6Ce7A57790f2797835Ff6220E5b0',
    abi: timeAllyJSON.abi
  }
};
