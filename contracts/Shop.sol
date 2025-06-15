// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Shop {
    address public owner;

    mapping(string => uint256) public itemPrices;
    mapping(address => uint256) public balances;

    event ItemPurchased(address indexed buyer, string itemName, uint256 price);

    constructor() {
        owner = msg.sender;
        // Add some items to the store with prices
        itemPrices["Coffee"] = 1 ether;
        itemPrices["T-shirt"] = 2 ether;
    }

    // Purchase item function
    function purchaseItem(string memory itemName) public payable {
        uint256 price = itemPrices[itemName];
        require(msg.value == price, "Incorrect payment amount.");

        balances[owner] += msg.value;

        emit ItemPurchased(msg.sender, itemName, price);
    }

    // Function to withdraw balance (for the owner)
    function withdraw() public {
        require(msg.sender == owner, "Only the owner can withdraw.");
        payable(owner).transfer(address(this).balance);
    }
}
