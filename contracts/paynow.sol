// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract paynow {

    uint public amount;
    address public payee;
    address public payer;
    address public owner;

    event TransactionRecorded(
        address indexed payer,
        address indexed payee,
        uint amount,
        uint timestamp
    );

    constructor() {
        owner = msg.sender;
    }

    function weixin(
        address payer_add,
        address payee_add,
        uint amount_transfer
    ) public payable {

        require(msg.value == amount_transfer, "ETH mismatch");

        payer = payer_add;
        payee = payee_add;
        amount = amount_transfer;

        (bool sent, ) = payable(payee).call{value: amount_transfer}("");
        require(sent, "ETH transfer failed");

        emit TransactionRecorded(
            payer_add,
            payee_add,
            amount_transfer,
            block.timestamp
        );
    }

    function check_transaction()
        public
        view
        returns (address, address, uint)
    {
        return (payer, payee, amount);
    }
}