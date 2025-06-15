pragma solidity ^0.8.0;

contract TaskRewards {
    address public owner;

    mapping(address => uint256) public userPoints;

    constructor() {
        owner = msg.sender; // The owner is the account deploying the contract
    }

    // Function to add points when a task is completed
    function completeTask(address user) public {
        userPoints[user]++;
    }

    // Send Ether to the user when they reach 10 points
    function sendEtherOnReward(address payable user) public {
        // Ensure the contract has enough balance
        require(address(this).balance >= 5 ether, "Insufficient contract balance");

        // Reset the user's points to 0 after sending Ether
        userPoints[user] = 0;

        // Transfer 5 Ether to the user
        user.transfer(5 ether);
    }

    // Function to receive Ether into the contract
    receive() external payable {}
}
