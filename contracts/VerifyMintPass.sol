/*
0
{
  '0x90F79bf6EB2c4f870365E785982E1f101E93b906': {
    coupon: {
      r: '0x571d0c85879076de2ec2e2b46ef300e9b1087a41756960a4023e58724fa91c8c',
      s: '0x7283123d2f972af0f42b6bfcf8ad47cd1aa33ae13f9fe4bff6ea55a15c9b12fa',
      v: 28
    }
  }
}

no 0, just address
{
  '0x90F79bf6EB2c4f870365E785982E1f101E93b906': {
    coupon: {
      r: '0x1611812ab29b0055ef47d22fd7c55e14237e296b61c23100928f1d33fbe122bb',
      s: '0x0511630b4b9be94b81f5d20cc93c222a835d212d285bb4bbaf12facc9c08dee3',
      v: 27
    }
  }
}
*/

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract verifyMintPass is Ownable {
    address private proofAddress = "0xcd3B766CCDd6AE721141F452C550Ca635964ce71";

    constructor() {

     }

     function approveSender(string memory mintPass) public returns(bool){
         address signer = ecrecover(digest, mintPass.v, mintPass.r, mintPass.s);
         require(signer == proofAddress, "MintPass invalid");
         address sender = msg.sender;
         require(keccak256(abi.encode(digest)) == keccak256(sender), "This MintPass is not for this address");

         return true;

     }
}

