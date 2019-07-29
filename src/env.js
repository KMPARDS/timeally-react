const eraSwapTokenJSON = require('./ethereum/compiledContracts/Eraswap_0.json');
const nrtManagerJSON = require('./ethereum/compiledContracts/NRTManager_0.json');
const timeAllyJSON = require('./ethereum/compiledContracts/TimeAlly_0.json');

const env = {
  network:
          // 'homestead',
            'kovan',
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

if (env.network === 'homestead') {
  env.esContract.address = '0xef1344bdf80bef3ff4428d8becec3eea4a2cf574';
  env.nrtManager.address = '0x20ee679D73559e4c4B5E3B3042B61bE723828d6C';
  env.timeally.address = '0x5630ee5f247bd6b61991fbb2f117bbeb45990876';
}

module.exports = env;
