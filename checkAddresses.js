const fs = require('fs');
const path = require('path');

const ethers = require('ethers');

console.log('\nPlease wait reading csv file and converting information into JavaScript Object');
const filePath = path.join(__dirname, 'Book6.csv');

const contents = fs.readFileSync(filePath, {encoding: 'utf-8'});
const addressObj = {};

for(const content of contents.split('\n')) {
  (async ()=>{const addressAndAmount = content.split(',');
    const address = addressAndAmount[0].split(' ').join('').split('"').join('');
    try{
      // const provider = ethers.getDefaultProvider();
      ethers.utils.getAddress(address);
    }catch (e){
      console.log(
        // 'error',
        address,
        // e.message.slice(0,25)
      );
    }})()
}
