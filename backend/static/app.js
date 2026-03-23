const contractAddress = "0x99aBAa48Ce825dB8A71e93fc2a0e3bDC48591BB8";

const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "payer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "payee",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "TransactionRecorded",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "amount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "check_transaction",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "payee",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "payer",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "payer_add",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "payee_add",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount_transfer",
          "type": "uint256"
        }
      ],
      "name": "weixin",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ];

let web3;
let contract;

async function init() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        contract = new web3.eth.Contract(contractABI, contractAddress);
    } else {
        alert("Please install MetaMask");
    }
}

init();

async function transfer() {
    const accounts = await web3.eth.getAccounts();

    const payer = document.getElementById("payer").value;
    const payee = document.getElementById("payee").value;
    const ethAmount = document.getElementById("amount").value;

    const weiAmount = web3.utils.toWei(ethAmount, "ether");

    await contract.methods.weixin(payer, payee, weiAmount).send({
        from: accounts[0],
        value: weiAmount
    });

    alert("Transaction sent!");
}

async function transaction() {
    const result = await contract.methods.check_transaction().call();

    document.getElementById("view_payer").innerText = "Payer: " + result[0];
    document.getElementById("view_payee").innerText = "Payee: " + result[1];
    document.getElementById("view_amount").innerHTML = "Amount (ETH): " + web3.utils.fromWei(result[2], "ether");
}