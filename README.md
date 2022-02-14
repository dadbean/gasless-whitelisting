These files are my implementation of the gasless whitelisting strategy discussed in :

this post from Humans of NFT :
https://medium.com/better-programming/handling-nft-presale-allow-lists-off-chain-47a3eb466e44

& this repo - EIP721 - Whitelisting : 
https://github.com/msfeldstein/EIP712-whitelisting

<h1>HIGH LEVEL OVERVIEW :</h1>

<ol>
<h2>ON LOCAL CHAIN</h2>
<li> Hash the whitelisted public key on your local chain with an "admin" key pair. </li>

<h2>FRONT END</h2>
<li> Pass the result as a parameter to the smart contract minting function</li>

<h2>ONCHAIN</h2>
<li> Recover signer of original Hash</li>

<li> Verify signer as "admin" public key</li>

<li> Hash msg.senders address</li>

<li> Verify new hash against original hash</li>