const eraSwapTokenJSON = require('./ethereum/compiledContracts/Eraswap_0.json');
const nrtManagerJSON = require('./ethereum/compiledContracts/NRTManager_0.json');
const timeAllyJSON = require('./ethereum/compiledContracts/TimeAlly_0.json');

module.exports = {
  network: 'kovan',
  esContract: {
    address: '0xDe33921D187f99Fb23dee1d7254ff1610d0a087E',
    abi: eraSwapTokenJSON.abi
  },
  nrtManager: {
    address: '0x3A24159a19D85e4E940468d472d8c2D40Fe1B6Fb',
    abi: nrtManagerJSON.abi
  },
  timeally: {
    address: '0x688B0B3739CE85216b783B829852E815Cf1AEC38',
    abi: timeAllyJSON.abi
  }
};
