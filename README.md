These files are my implementation of the gasless whitelisting strategy discussed in :

this post from Humans of NFT :
https://medium.com/better-programming/handling-nft-presale-allow-lists-off-chain-47a3eb466e44

& this repo - EIP721 - Whitelisting : 
https://github.com/msfeldstein/EIP712-whitelisting

HIGH LEVEL OVERVIEW :

ON LOCAL CHAIN
1. Hash the whitelisted public key on your local chain with an "admin" key pair. 

FRONT END
2. Pass the result as a parameter to the smart contract minting function

ONCHAIN
3. Recover signer of original Hash

4. Verify signer as "admin" public key

5. Hash msg.senders address

6. Verify new hash against original hash