// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PointsSystem {
    mapping(address => uint256) public userPoints;
    mapping(uint256 => string) public itemsForSale;
    uint256 public itemCount;

    // Constructor to initialize items
    constructor() {
        itemsForSale[1] = "Item A"; // Item 1
        itemsForSale[2] = "Item B"; // Item 2
        itemCount = 2;
    }

    // Function to add points to a user's account
    function addPoints(address user, uint256 points) public {
        userPoints[user] += points;
    }

    // Function to allow users to purchase an item with points
    function purchaseItem(uint256 itemId) public {
        require(itemId > 0 && itemId <= itemCount, "Item does not exist");
        uint256 pointsRequired = itemId * 100; // For example, Item 1 costs 100 points
        require(userPoints[msg.sender] >= pointsRequired, "Insufficient points");

        // Deduct points
        userPoints[msg.sender] -= pointsRequired;

        // Record transaction (In real case, you'd have a log event here)
        // In this example, just print it to the console
        emit ItemPurchased(msg.sender, itemId, pointsRequired);
    }

    event ItemPurchased(address indexed user, uint256 itemId, uint256 pointsSpent);
}
