const { esContract, timeally } = require('./src/env');

const ethers = require('ethers');
const provider = ethers.getDefaultProvider('kovan');

//24C4FE6063E62710EAD956611B71825B778B041B18ED53118CE5DA5F02E494BA
if(!process.argv[2]) {
  throw '\nNOTE: Please pass your private key as comand line argument.\neg => node deploy.js 0x24C4FE063E...\n'
}

console.log('\nPlease wait loading wallet...');
const wallet = new ethers.Wallet(process.argv[2], provider);
console.log(`Loaded wallet @ ${wallet.address}`);

const esInstance = new ethers.Contract(esContract.address, esContract.abi, wallet);
const timeallyInstance = new ethers.Contract(timeally.address, timeally.abi, wallet);

//console.log(esInstance, timeallyInstance);

const addressObj = {
  '0xC8e1F3B9a0CdFceF9fFd2343B943989A22517b26': ethers.utils.parseEther('330'),
  // '0x1031a1C7Cc8edc64Cae561DcEA4285f8ab97e02F': ethers.utils.parseEther('40'),
  // '0x3D2bB9D34D96307942b7cCe133bBF1aAd361C529': ethers.utils.parseEther('50')
}

//console.log(Object.keys(addressObj), Object.values(addressObj));

let sum = ethers.utils.bigNumberify(0);
console.log(ethers.utils.formatEther(sum));
for(const key in addressObj) {
  sum = sum.add(addressObj[key]);
  //console.log(ethers.utils.formatEther(sum));
}


let tx;
(async()=>{

  console.log('\nWallet Balance:', await esInstance.functions.balanceOf(wallet.address));

  console.log(`\nPlease wait giving allowance of ${ethers.utils.formatEther(sum)} ES by owner to timeally`);
  tx = await esInstance.functions.approve( timeallyInstance.address, sum );
  await tx.wait();
  console.log('done');

  console.log('\nPlease wait transferring this amount from owner to timeally');
  tx = await timeallyInstance.functions.topupRewardBucket( sum );
  await tx.wait();
  console.log('done');

  console.log('\nPlease wait alloting rewards for users');
  tx = await timeallyInstance.functions.giveLaunchRewardSeperate( Object.keys(addressObj), Object.values(addressObj) );
  await tx.wait();
  console.log('done');
})();
