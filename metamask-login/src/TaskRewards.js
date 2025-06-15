import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./TaskRewards.css";

const Task = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [points, setPoints] = useState(0);
  const [contract, setContract] = useState(null);
  const [walletAddress, setWalletAddress] = useState("Not connected");
  const [isTransactionInProgress, setIsTransactionInProgress] = useState(false); // Track transaction state

  const contractAddress = "0xCaA50464ced36e53349E62fD735E8b9fA22e84fd"; // Replace with your contract address
  const contractABI = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "userPoints",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      stateMutability: "payable",
      type: "receive",
      payable: true,
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "user",
          type: "address",
        },
      ],
      name: "completeTask",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "user",
          type: "address",
        },
      ],
      name: "sendEtherOnReward",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  // Connect to MetaMask on page load
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const initWeb3 = new Web3(window.ethereum);

      // Request account access
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async () => {
          const userAccount = (await initWeb3.eth.getAccounts())[0];
          setWeb3(initWeb3);
          setAccount(userAccount);
          setWalletAddress(userAccount);

          // Initialize the contract
          const contractInstance = new initWeb3.eth.Contract(
            contractABI,
            contractAddress
          );
          setContract(contractInstance);
        })
        .catch((error) => {
          console.error("Error accessing account:", error);
          alert("Error connecting to MetaMask");
        });
    } else {
      alert("MetaMask not found. Please install MetaMask.");
    }
  }, []);

  // Function to simulate task completion and reward points
  const completeTask = async (taskName) => {
    // If the transaction is already in progress, exit the function
    if (isTransactionInProgress) return;

    setPoints((prevPoints) => {
      const newPoints = prevPoints + 1;
      if (newPoints >= 10 && !isTransactionInProgress) {
        // Prevent further transactions if one is already in progress
        setIsTransactionInProgress(true);

        // Send 5 Ether from the default account to the user
        const amountInWei = web3.utils.toWei("5", "ether"); // Convert 5 Ether to Wei

        web3.eth
          .sendTransaction({
            from: account,
            to: account, // You can replace it with the recipient's address if different
            value: amountInWei,
            gas: 21000, // Standard gas for simple transfer
            gasPrice: web3.utils.toWei("20", "gwei"), // Adjust gas price if needed
          })
          .then(() => {
            alert(
              `Congratulations! You've reached 10 points. 5 Ether has been credited to your account.`
            );
            setPoints(0); // Reset points after reward
            setIsTransactionInProgress(false); // Reset the transaction flag
          })
          .catch((error) => {
            console.error("Error sending Ether:", error);
            alert("Transaction failed. Please try again.");
            setIsTransactionInProgress(false); // Reset the transaction flag on failure
          });
      }
      return newPoints;
    });
  };

  return (
    <div>
      <h1>Welcome to Task Rewards</h1>

      <h2>Complete Tasks to Earn Points</h2>
      <div>
        <button onClick={() => completeTask("Task 1")}>Complete Task 1</button>
        <button onClick={() => completeTask("Task 2")}>Complete Task 2</button>
      </div>

      <h2>Your Info</h2>
      <p>Address: {walletAddress}</p>
      <br></br>
      <p>Points: {points}</p>
    </div>
  );
};

export default Task;
