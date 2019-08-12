const fs = require('fs');
const path = require('path');

const ethers = require('ethers');

console.log('\nPlease wait reading csv file and converting information into JavaScript Object');
const filePath = path.join(__dirname, 'Book6.1mac.csv');

const contents = fs.readFileSync(filePath, {encoding: 'utf-8'});
const addressObj = {};

//console.log('con', contents.length);

// for(const content of contents.split('\n')) {

const contentArray = contents.split('\n');
for(let i = 0;
  // i < 100;
  i < contentArray.length;
  i++) {
  const content = contentArray[i];
  (async ()=>{const addressAndAmount = content.split(',');
  //if(addressAndAmount.length === 2) {
    // console.log(addressAndAmount);

    try{
      addressObj[addressAndAmount[0].split(' ').join('').split('"').join('')] = ethers.utils.parseEther(addressAndAmount[1].split(' ').join('').split('"').join(''));
    }
    catch (e) {
      console.log(e.message);
      console.log('error', addressAndAmount[1]);

    }


    try{
      const provider = ethers.getDefaultProvider();
      provider.getBalance(addressAndAmount[0].split(' ').join('').split('"').join(''));
    }catch (e){
      console.log(e, addressAndAmount[0].split(' ').join('').split('"').join(''))
    }})()
  //}
}
// console.log('done');
// // console.log('\nAddress vs ES tokens');
console.log(addressObj);
//
// const { esContract, timeally } = require('./src/env');
//
//
// // const { network } from './src/env';
// const network = 'kovan';
// const provider = ethers.getDefaultProvider(network);
//
// //24C4FE6063E62710EAD956611B71825B778B041B18ED53118CE5DA5F02E494BA
// // if(!process.argv[2]) {
// //   throw '\nNOTE: Please pass your private key as comand line argument.\neg => node deploy.js 0x24C4FE063E...\n'
// // }
// //
// // console.log('\nPlease wait loading wallet...');
// // const wallet = new ethers.Wallet(process.argv[2], provider);
// // console.log(`Loaded wallet @ ${wallet.address}`);
// //
// // const esInstance = new ethers.Contract(esContract.address, esContract.abi, wallet);
// // const timeallyInstance = new ethers.Contract(timeally.address, timeally.abi, wallet);
//
// //console.log(esInstance, timeallyInstance);
//
// // const addressObj = {
// //   '0xb2d0ff1108086063e6E4FF0171D7Bfa279FeCa25': ethers.utils.parseEther('100'),
// //   '0xC8e1F3B9a0CdFceF9fFd2343B943989A22517b26': ethers.utils.parseEther('100'),
// //   '0xC9082b2B3c4b099aDCE27afa079699D3e65d7527': ethers.utils.parseEther('100'),
// //   // '0x1031a1C7Cc8edc64Cae561DcEA4285f8ab97e02F': ethers.utils.parseEther('40'),
// //   // '0x3D2bB9D34D96307942b7cCe133bBF1aAd361C529': ethers.utils.parseEther('50')
// // }
//
// //console.log(Object.keys(addressObj), Object.values(addressObj));
//
let sum = ethers.utils.bigNumberify(0);
//console.log(ethers.utils.formatEther(sum));
for(const key in addressObj) {
  sum = sum.add(addressObj[key]);
  //console.log(ethers.utils.formatEther(sum));
}
//
// console.log('total ES to send as rewards', ethers.utils.formatEther(sum));
//
// // console.log(
// //   Object.keys(addressObj),
// //   Object.values(addressObj)
// // );
//
console.log('[');
// for(const address of Object.keys(addressObj)) {
//   console.log(`"${address}",`);
// }

let start = 0;//100;
let end = 0;
      //Object.keys(addressObj).length;
      //220;
start--;
end--;

for(
  let i = start;
  i <= end;
  i++
) {
  const address = Object.keys(addressObj)[i];
  console.log(`"${address}"${i !== Object.keys(addressObj).length - 1 ? ',' : ''}`);
}
console.log(']');

console.log('[');
// for(const address of Object.values(addressObj)) {
//   console.log(`"${address}",`);
// }
let sumOfValue = ethers.utils.bigNumberify(0);
for(
  let i = start;
  i <= end;
  i++
) {
  const value = Object.values(addressObj)[i];
  console.log(`"${value}"${i !== Object.values(addressObj).length - 1 ? ',' : ''}`);
  sumOfValue = sumOfValue.add(value);
}
console.log(']');
//
// console.log('total being sent', ethers.utils.formatEther(sumOfValue));
// // let tx;
// // (async()=>{
// //
// //   console.log('\nWallet Balance Currently:', ethers.utils.formatEther(await esInstance.functions.balanceOf(wallet.address)), 'ES');
// //
// //   console.log(`\nPlease wait giving allowance of ${ethers.utils.formatEther(sum)} ES by owner to timeally`);
// //   tx = await esInstance.functions.approve( timeallyInstance.address, sum );
// //   await tx.wait();
// //   console.log('done');
// //
// //   console.log('\nPlease wait transferring this amount from owner to timeally');
// //   tx = await timeallyInstance.functions.topupRewardBucket( sum );
// //   await tx.wait();
// //   console.log('done');
// //
// //   console.log('\nPlease wait alloting rewards for users');
// //   const args = [
// //     Object.keys(addressObj),
// //     Object.values(addressObj)
// //   ];
// //   console.log(args);
// //   tx = await timeallyInstance.functions.giveLaunchReward( ...args );
// //   await tx.wait();
// //   console.log('done');
// //
// //   console.log('\nWallet Balance Currently:', ethers.utils.formatEther(await esInstance.functions.balanceOf(wallet.address)), 'ES');
// // })();
