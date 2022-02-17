import { BigNumber, ethers } from "ethers";
import './App.css';

const contractAddress = "xxx";

const mintPasses = {
  '0x90F79bf6EB2c4f870365E785982E1f101E93b906': {
    mintPass: {
      message: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
      r: '0x60f1d5ff5361970db5c03400e8faec4c795d6a9a275e58b82d7d6eac709981e5',
      s: '0x7c2358f618db21a64dce2424b10b62902867e2bcb8a4c9901e48c9d8074e2ba5',
      v: 27
    }
  },
  '0xBcd4042DE499D14e55001CcbB24a551F3b954096': {
    mintPass: {
      message: '0xBcd4042DE499D14e55001CcbB24a551F3b954096',
      r: '0x344ba9b60fed3af00b5ab00e46386690a89037cb57b1fbdd04e1af99441766c5',
      s: '0x3b1d451ebef57cf271e8ec9c5facfaf270c54bdfa9c5d5f73caf273d4e680c49',
      v: 27
    }
  }
}

export default function App() {

  const verify = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractABI, signer);
       
        //CHECK IF PRESALE FIRST-----------------
        /*--new stuff-*/
        const checksumAccount = ethers.utils.getAddress(currentAccount);        
        if(checksumAccount in mintPasses == false) throw "No Valid MintPass for this Address.";
        const mintPass = mintPasses[checksumAccount];
        /*-----*/
        
        //get cost / set price / mint
        let price = await nftContract.cost();
        await price.wait;
        console.log(price.toNumber());
        
        const overrides = {value: price,}
        
        
        console.log(mintPass.mintPass.message);
        //const result = await nftContract.mint(mintPass.mintPass.v, mintPass.mintPass.r, mintPass.mintPass.s, mintPass.mintPass.message, overrides);
        const result = await nftContract.mint(mintPass.mintPass, overrides);
        console.log("minting nft...")
        await result.wait();
        console.log("Minted --", result.hash);
        
        //refresh display to show NFT image
        const callgetSupply = getSupply();
      } else {
        console.log("Ethereum object doesn't exist!");
        
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  }
