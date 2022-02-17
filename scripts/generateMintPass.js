const {
  keccak256,
  toBuffer,
  ecsign,
  bufferToHex,
  ecrecover,
  pubToAddress
} = require("ethereumjs-utils");
const { ethers } = require('ethers');


//account7 (admin) #15
const adminPub = "0xcd3B766CCDd6AE721141F452C550Ca635964ce71".toLowerCase();
const adminPriv = "xxx".toLowerCase();



let presaleAddresses = ["0x90F79bf6EB2c4f870365E785982E1f101E93b906","0xbcd4042de499d14e55001ccbb24a551f3b954096"]; //Account 8, 10


let mintPasses = {};
for (let i = 0; i < presaleAddresses.length; i++) {
  const userAddress = ethers.utils.getAddress(presaleAddresses[i]);
  try {

    //HASH WHITELISTED ADDRESS
    whitelistBuffer = keccak256(toBuffer(ethers.utils.defaultAbiCoder.encode(["uint256","address"],[0,userAddress]))); 
  
   
    //HASH LOCAL PRIVATE KEY
    privateBuffer = toBuffer(adminPriv);

    //PASS HASHES TO CREATE SIGNITURE
    const mintPassBuff = createPass(whitelistBuffer, privateBuffer);

    //TAKE OUT OF BUFFER   
    mintPasses[userAddress] = {    
      mintPass: serializePass(mintPassBuff, userAddress)
    };

  }
  catch (error) {
    console.log(error);
  }
}

console.log(mintPasses);


  // HELPER FUNCTIONS
  function createCoupon(hash, signerPvtKey) {
    sign = ecsign(hash, signerPvtKey);
    return sign;
  }
  function generateHashBuffer(typesArray, valueArray) {
    return keccak256(
      toBuffer(ethers.utils.defaultAbiCoder.encode(typesArray,
        valueArray))
    );
  }
  function serializePass(mintPass, userAddress) {
    return {
      "message": userAddress,
      "r": bufferToHex(mintPass.r),
      "s": bufferToHex(mintPass.s),
      "v": mintPass.v //'0x' + (mintPass.v).toString(16),
    };
  }
