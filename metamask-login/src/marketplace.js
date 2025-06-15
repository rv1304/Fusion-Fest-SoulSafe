import React, { useEffect, useState } from "react";
import flowerImage from "./assets/flower.jpg";
import flowerImage1 from "./assets/gradient.jpg";
import flowerImage2 from "./assets/imp1.jpg";
import flowerImage3 from "./assets/pea.jpg";
import flowerImage4 from "./assets/r.jpg";
import Web3 from "web3";

const MerchCards = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [web3Instance, setWeb3Instance] = useState(null); // Web3 instance state

  const merchItems = [
    {
      name: "Peace",
      artist: "@Johny",
      price: 2,
      img: flowerImage,
    },
    {
      name: "Yellow Painting",
      artist: "@Johny",
      price: 2,
      img: flowerImage1,
    },
    {
      name: "The Universe",
      artist: "@Johny",
      price: 2,
      img: flowerImage2,
    },
    {
      name: "The Hope",
      artist: "@Johny",
      price: 2,
      img: flowerImage3,
    },
  ];

  const recipientAddress = "0x20995cDd39aEF4ce44C82A5fc22d83b8c092626d"; // Replace with the actual recipient address

  // Initialize Web3 and check if it's available
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      setWeb3Instance(web3); // Save the Web3 instance to the state
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async () => {
          const userAccount = (await web3.eth.getAccounts())[0];
          setAccount(userAccount);

          const userBalance = await web3.eth.getBalance(userAccount);
          setBalance(web3.utils.fromWei(userBalance, "ether"));
        })
        .catch((err) => {
          console.error("User denied account access or an error occurred.", err);
        });
    } else {
      alert("MetaMask not found. Please install MetaMask.");
    }
  }, []);

  // Function to handle item purchase (transfer Ether)
  const buyItem = async (item, priceInEther) => {
    if (!web3Instance) {
      alert("Web3 not initialized");
      return;
    }

    const priceInWei = web3Instance.utils.toWei(priceInEther.toString(), "ether");

    try {
      // MetaMask transaction (just like when you send ETH manually)
      await web3Instance.eth.sendTransaction({
        from: account,
        to: recipientAddress,
        value: priceInWei,
        gas: 21000, // Standard gas limit for simple transfers
        gasPrice: web3Instance.utils.toWei("20", "gwei"), // Adjust gas price as needed
      });

      alert(`Successfully transferred ${priceInEther} Ether for ${item}.`);
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed. Please check MetaMask.");
    }
  };

  return (
    <div
      style={{
        margin: 0,
        fontFamily: "Arial, sans-serif",
        background:
          "linear-gradient(209deg, #8109DD -7.05%, #181E41 -7.05%, #34186B 36.87%, #181E41 94.47%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {/* Title Section */}
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h1 style={{ fontSize: "3rem", margin: 0 }}>Buy Our Exclusive Merch</h1>
        <p style={{ fontSize: "1.2rem", marginTop: "0.5rem", color: "#e0e0e0" }}>
          Discover premium products crafted with love and creativity
        </p>
      </div>

      {/* Wallet Info Section */}
      {account && (
        <div style={{ textAlign: "center", padding: "1rem" }}>
          <p>Address: {account}</p>
          <p>Balance: {balance} ETH</p>
        </div>
      )}

      {/* Merch Items Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // 4 cards per row
          gap: "2rem",
          width: "80%",
          maxWidth: "1650px",
          margin: "2rem auto",
        }}
      >
        {merchItems.map((item, index) => (
          <div
            key={index}
            style={{
              background: "#2c2f48",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {/* Product Image */}
            <img
              src={item.img}
              alt={item.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />

            {/* Product Details */}
            <div style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.5rem", margin: "0.5rem 0" }}>{item.name}</h3>
              <p style={{ fontSize: "1rem", color: "#bbb", margin: "0.5rem 0" }}>{item.artist}</p>
              <p style={{ fontSize: "1rem", color: "#bbb", margin: "0.5rem 0" }}>
                Current Price: {item.price} ETH
              </p>
            </div>

            {/* Buy Button */}
            <div
              style={{
                marginTop: "auto",
                padding: "1rem",
                width: "100%",
              }}
            >
              <button
                style={{
                  background: "linear-gradient(90deg, #8109DD, #34186B)",
                  color: "#fff",
                  padding: "0.7rem 1.5rem",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "linear-gradient(90deg, #34186B, #8109DD)";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "linear-gradient(90deg, #8109DD, #34186B)";
                  e.target.style.transform = "scale(1)";
                }}
                onClick={() => buyItem(item.name, item.price)} // Trigger buy function on click
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MerchCards;
