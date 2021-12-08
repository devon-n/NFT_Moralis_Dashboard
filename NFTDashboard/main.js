import { keys } from "../keys.js";

const appId = keys.appId;
const serverUrl = keys.serverUrl;
const CONTRACT_ADDRESS = keys.CONTRACT_ADDRESS;
const options = { address: CONTRACT_ADDRESS, chain: "bsc testnet" };

Moralis.start({ serverUrl, appId });

 

function fetchNFTMetadata(NFTs){

    let promises = [];

    for (let i = 0; i < NFTs.length; i++) {

        let nft = NFTs[i];
        let id = nft.token_id;
        promises = [];

        // Call Moralis Cloud function
        promises.push(fetch("https://xntjjz8dhvme.usemoralis.com:2053/server/functions/getNFT?_ApplicationId=OMMWpue0pgjSfWCypiQeu4QMEtdBeO3czkWArsZc&nftId=" + id)
        .then(res => res.json())
        .then(res => {nft.metadata = res.result.data})
        .then(res => {
            const options2 = { address: CONTRACT_ADDRESS, token_id: id, chain: "bsc testnet" };
            return Moralis.Web3API.token.getTokenIdOwners(options2);
        })
        .then( (res) => {
            nft.owners = [];
            res.result.forEach(element => {
                nft.owners.push(element.owner_of);
            });
            return nft;
            })
        )}
        return Promise.all(promises);
    }
    



function renderInventory(NFTs) {

    const parent = document.getElementById("app");

    for (let i = 0; i < NFTs.length; i++){
        const nft = NFTs[i];

        let nftOwners;
        try {
            nftOwners = nft.owners.length;
        } catch (err) {
            nftOwners = 1;
        }
        console.log(nft)
        let htmlString = `
        <div class="card h-100">
            <img class="card-img-top h-50" src="${nft.metadata.image}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${nft.metadata.name}</h5>
                <p class="card-text">${nft.metadata.description}</p>
                <p class="card-text">Tokens in Circulation: ${nft.amount}</p>
                <p class="card-text">No. of Owners: ${nftOwners}</p>
                <p class="card-text">Token ID: ${nft.token_id}</p>
                <a href="./mint.html?nftId=${nft.token_id}" class="btn btn-primary">Mint</a>
                <a href="./transfer.html?nftId=${nft.token_id}" class="btn btn-primary">Transfer</a>
            </div>
        </div>`

        let col = document.createElement("div");
        col.className = "col col-md-3";
        col.innerHTML = htmlString;
        parent.appendChild(col);
    }
}

async function initializeApp() {
    let currentUser = Moralis.User.current();
    if(!currentUser) {
        currentUser = await Moralis.Web3.authenticate();
    }

    let NFTs = await Moralis.Web3API.token.getAllTokenIds(options);

    

    let NFTWithMetadata = await fetchNFTMetadata(NFTs.result);
    NFTWithMetadata = NFTs.result;

    renderInventory(NFTWithMetadata);

    
}

initializeApp();