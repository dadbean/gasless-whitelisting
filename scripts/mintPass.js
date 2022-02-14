
const {
  keccak256,
  toBuffer,
  ecsign,
  bufferToHex,
  ecrecover,
  pubToAddress,
  abiCoder
} = require("ethereumjs-utils");
const { ethers } = require('ethers');


//account7 (admin) #15
const adminPub = "0xcd3B766CCDd6AE721141F452C550Ca635964ce71".toLowerCase();
const adminPriv = "xxx".toLowerCase();


let  presaleAddress = "0x90F79bf6EB2c4f870365E785982E1f101E93b906";

try{
  const userAddress = ethers.utils.getAddress(presaleAddress);

  //HASH WHITELISTED ADDRESS
  whitelistBuffer = keccak256(toBuffer(userAddress));

  //HASH LOCAL PRIVATE KEY
  privateBuffer = (toBuffer(adminPriv));
  console.log(privateBuffer);

  //PASS HASHES TO CREATE SIGNITURE
  const mintPassBuff = createmintPass(whitelistBuffer, privateBuffer);

  //TAKE OUT OF BUFFER
  const mintPass =  serializemintPass(mintPassBuff);
  

  /*--------------SIMULATE BLOCKCHAIN CONTRACT CODE---------------------*/
  //recover key from MintPass
  const signKey = recoverKey(mintPass, whitelistBuffer);

  //check if signer of mintpass is admin key
  if (signKey != adminPub) throw "MintPass Invalid";

  //check if sender = mintPass
  //cannot do off chain

}
catch(error){
  console.log(error);
}



function recoverKey(c, userAddy){

    pub =  ecrecover(userAddy,c.v,c.r,c.s);
    buff = pubToAddress(pub);
    addr = bufferToHex(buff);

    return addr;

}




// HELPER FUNCTIONS
function createmintPass(hash, signerPvtKey) {
    sign = ecsign(hash, signerPvtKey);
   return sign;
}
function generateHashBuffer(typesArray, valueArray) {
  console.log("hbuffer");
   return keccak256(
     toBuffer(ethers.utils.defaultAbiCoder.encode(typesArray,
     valueArray))
   );
}
function serializemintPass(mintPass) {
   return {
     "r": bufferToHex(mintPass.r),
     "s": bufferToHex(mintPass.s),
     "v": mintPass.v //'0x' + (mintPass.v).toString(16),
   };
}
