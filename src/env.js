const eraSwapTokenJSON = require('./ethereum/compiledContracts/Eraswap_0.json');
const nrtManagerJSON = require('./ethereum/compiledContracts/NRTManager_0.json');
const timeAllyJSON = require('./ethereum/compiledContracts/TimeAlly_0.json');

const env = {
  network:
          // 'homestead',
            'kovan',
  esContract: {
    address: '0x0E02F27160ef724B10D5CAE6c4D8bd3E86c8F4B3',
    abi: eraSwapTokenJSON.abi
  },
  nrtManager: {
    address: '0xDB7cD7699D735f8397E5b88489384Fa6A25A1047',
    abi: nrtManagerJSON.abi
  },
  timeally: {
    address: '0x0Fc4427C5b7167766fEdb8714d038A8f0583e516',
    abi: timeAllyJSON.abi
  }
};

if (env.network === 'homestead') {
  env.esContract.address = '0xef1344bdf80bef3ff4428d8becec3eea4a2cf574';
  env.nrtManager.address = '0x20ee679D73559e4c4B5E3B3042B61bE723828d6C';
  env.timeally.address = '0x5630ee5f247bd6b61991fbb2f117bbeb45990876';
}

module.exports = env;
