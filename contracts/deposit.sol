// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract store_money {

    address public customer;
    uint public amount;

    event DepositRecorded(
        address indexed customer,
        uint amount,
        uint timestamp
    );

    function deposit_money(address customer_input, uint amount_input)
        public
    {
        customer = customer_input;
        amount = amount_input;

        emit DepositRecorded(
            customer_input,
            amount_input,
            block.timestamp
        );
    }

    function deposit_view()
        public
        view
        returns (address, uint)
    {
        return (customer, amount);
    }
}