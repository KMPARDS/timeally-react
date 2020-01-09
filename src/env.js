const eraSwapTokenJSON = require('./ethereum/compiledContracts/Eraswap_0.json');
const nrtManagerJSON = require('./ethereum/compiledContracts/NRTManager_0.json');
const timeAllyJSON = require('./ethereum/compiledContracts/TimeAlly_0.json');
const sipJSON = require('./ethereum/compiledContracts/TimeAllySIP_TimeAllySIP.json');
const petJSON = require('./ethereum/compiledContracts/TimeAllyPET_TimeAllyPET.json');
const fundsBucketJSON = require('./ethereum/compiledContracts/TimeAllyPET_FundsBucketPET.json');

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
  },
  sip: {
    address: '0x54D47C34d92D6BbaEeb8e7f530c0f585d17361DF',
    abi: sipJSON.abi
  },
  pet: {
    address: '0x7AB972A66497fd122Ea3A4D55671Fea968Fb9753',
    abi: petJSON.abi
  },
  fundsBucket: {
    address: '0x65211ee4481669E21f8fA792f5F2e22D25024A1D',
    abi: fundsBucketJSON.abi
  }
};

if (env.network === 'homestead') {
  env.esContract.address = '0xef1344bdf80bef3ff4428d8becec3eea4a2cf574';
  env.nrtManager.address = '0x20ee679D73559e4c4B5E3B3042B61bE723828d6C';
  env.timeally.address = '0x5630ee5f247bd6b61991fbb2f117bbeb45990876';
  env.sip.address = '0xbad9af4db5401b7d5e8177a18c1d69c35fc03fd3';
}

module.exports = env;
