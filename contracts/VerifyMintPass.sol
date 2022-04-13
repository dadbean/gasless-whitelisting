

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract verifyMintPass is Ownable {
    address private proofAddress = "xxx";

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

