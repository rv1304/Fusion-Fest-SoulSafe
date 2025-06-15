// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TaskPoints { // Changed the name from TaskRewards to TaskPoints
    address public owner;
    address public defaultAccount; // Default account to fund rewards

    mapping(address => uint256) public points; // Tracks points for each user
    uint256 public constant POINTS_THRESHOLD = 10; // Points required to earn Ether
    uint256 public constant REWARD_AMOUNT = 1 ether; // Reward amount in Ether

    event TaskCompleted(address indexed user, uint256 pointsEarned);
    event RewardClaimed(address indexed user, uint256 rewardAmount);

    constructor(address _defaultAccount) {
        owner = msg.sender;
        defaultAccount = _defaultAccount;
    }

    // Function to complete a task and earn points
    function completeTask(address user) public {
        require(user != address(0), "Invalid user address.");

        points[user] += 1; // Increment points
        emit TaskCompleted(user, points[user]);

        // Check if the user has reached the points threshold
        if (points[user] >= POINTS_THRESHOLD) {
            claimReward(user); // Only claim reward if threshold is met
        }
    }

    // Function to claim Ether reward
    function claimReward(address user) internal {
        require(points[user] >= POINTS_THRESHOLD, "Not enough points to claim reward.");

        uint256 reward = REWARD_AMOUNT; // Ether reward to claim
        points[user] = 0; // Reset points after claiming the reward

        // Transfer Ether to the user
        payable(user).transfer(reward);
        emit RewardClaimed(user, reward);
    }

    // Function to fund the contract (by owner or default account)
    function fundContract() public payable {
        require(msg.sender == owner || msg.sender == defaultAccount, "Only owner or default account can fund.");
    }

    // Function to withdraw funds (only by owner)
    function withdrawFunds() public {
        require(msg.sender == owner, "Only the owner can withdraw funds.");
        payable(owner).transfer(address(this).balance);
    }
}
