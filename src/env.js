const eraSwapTokenJSON = require('./ethereum/compiledContracts/Eraswap_0.json');
const nrtManagerJSON = require('./ethereum/compiledContracts/NRTManager_0.json');
const timeAllyJSON = require('./ethereum/compiledContracts/TimeAlly_0.json');

const env = {
  network:
          // 'homestead',
            'kovan',
  esContract: {
    address: '0x53E750ee41c562C171D65Bcb51405b16a56cF676',
    abi: eraSwapTokenJSON.abi
  },
  nrtManager: {
    address: '0x5967A8d4884150F49E271798B715092B084dD424',
    abi: nrtManagerJSON.abi
  },
  timeally: {
    address: '0xd8710F2F5335BaAcd4e4e35AbeC57D594891d497',
    abi: timeAllyJSON.abi
  }
};

if (env.network === 'homestead') {
  env.esContract.address = '0xef1344bdf80bef3ff4428d8becec3eea4a2cf574';
  env.nrtManager.address = '0x20ee679D73559e4c4B5E3B3042B61bE723828d6C';
  env.timeally.address = '0x5630ee5f247bd6b61991fbb2f117bbeb45990876';
}

module.exports = env;
