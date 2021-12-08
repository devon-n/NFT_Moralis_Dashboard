import { keys } from "../keys.js";

const appId = keys.appId;
const serverUrl = keys.serverUrl;
const CONTRACT_ADDRESS = keys.CONTRACT_ADDRESS;
const CONTRACT_ABI = keys.CONTRACT_ABI;
const options = { address: CONTRACT_ADDRESS, chain: "bsc testnet" };
Moralis.start({ serverUrl, appId });

let web3;
let accounts;
 

async function initializeApp() {
    let currentUser = Moralis.User.current();
    if(!currentUser) {
        window.location.pathname = "/index.html";
    }

    web3 = await Moralis.Web3.enableWeb3();
    accounts = await web3.eth.getAccounts();


    const urlParams = new URLSearchParams(window.location.search);
    const nftId = urlParams.get("nftId");
    document.getElementById("token_id_input").value = nftId;
    document.getElementById("address_input").value = accounts[0];
}

async function mint() { 
    let tokenId = parseInt(document.getElementById("token_id_input").value);
    let address = document.getElementById("address_input").value;
    let amount = parseInt(document.getElementById("amount_input").value);

    // Tutorial Method
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    contract.methods.mint(address, tokenId, amount).send({ from: accounts[0], value:0 })
    .on("receipt", function(receipt) {
        alert("Mint Completed");
    })


    // // Docs Method // Does not allow a .on function after
    // const options = {
    //     contractAddress: CONTRACT_ADDRESS,
    //     functionName: "mint",
    //     abi: CONTRACT_ABI,
    //     params: {
    //         account: address,
    //         id: tokenId,
    //         amount: amount
    //     }
    // }

    // const mintFunction = await Moralis.executeFunction(options)
    // .on("receipt", function(receipt) {
    //     alert("Mint Completed");
    // })
}

document.getElementById("submit_mint").onclick = mint;

initializeApp();