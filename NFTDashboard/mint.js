appId = "OMMWpue0pgjSfWCypiQeu4QMEtdBeO3czkWArsZc";
serverUrl = "https://xntjjz8dhvme.usemoralis.com:2053/server";
Moralis.start({ serverUrl, appId });
CONTRACT_ADDRESS = "0x7c890C40E8114f6F21A075035dBEb22813502481";
const options = { address: CONTRACT_ADDRESS, chain: "bsc testnet" };
let web3;
 

async function initializeApp() {
    let currentUser = Moralis.User.current();
    if(!currentUser) {
        window.location.pathname = "/index.html";
    }

    web3 = await Moralis.Web3.enableWeb3();
    let accounts = await web3.eth.getAccounts(); 
    console.log()

    const urlParams = new URLSearchParams(window.location.search);
    const nftId = urlParams.get("nftId");
    document.getElementById("token_id_input").value = nftId;
    document.getElementById("address_input").value = accounts[0];
}

async function mint() { 
    let tokenId = parseInt(document.getElementById("token_id_input"));
    let address = document.getElementById("address_input");
    let amount = parseInt(document.getElementById("amount_input"));
    const contract = new web3.eht.contract("CONTRACT ABI", CONTRACT_ADDRESS)
}

initializeApp();