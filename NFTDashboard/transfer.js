import { keys } from "../keys.js";

const appId = keys.appId;
const serverUrl = keys.serverUrl;
const CONTRACT_ADDRESS = keys.CONTRACT_ADDRESS;
// const CONTRACT_ABI = keys.CONTRACT_ABI;
// const options = { address: CONTRACT_ADDRESS, chain: "bsc testnet" };
Moralis.start({ serverUrl, appId });
Moralis.enableWeb3();

// let web3;
// let accounts;
 

async function initializeApp() {
    let currentUser = Moralis.User.current();
    if(!currentUser) {
        window.location.pathname = "/index.html";
    }

    // web3 = await Moralis.Web3.enableWeb3();
    // accounts = await web3.eth.getAccounts();


    const urlParams = new URLSearchParams(window.location.search);
    const nftId = urlParams.get("nftId");
    document.getElementById("token_id_input").value = nftId;
    // document.getElementById("address_input").value = accounts[0];
}

async function transfer() { 
    let tokenId = parseInt(document.getElementById("token_id_input").value);
    let address = document.getElementById("address_input").value;
    let amount = parseInt(document.getElementById("amount_input").value);

    // Transfer
    const options = {
        contract_address: CONTRACT_ADDRESS,
        type: "erc1155",
        receiver: address,
        token_id: tokenId,
        amount: amount
    }

    let result = await Moralis.transfer(options);
    console.log(result);
}

document.getElementById("submit_transfer").onclick = transfer;

initializeApp();