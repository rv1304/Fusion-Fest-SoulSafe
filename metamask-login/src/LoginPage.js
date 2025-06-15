import React from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import "./LoginPage.css"; // Import the CSS file for styling

function LoginPage() {
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Initialize provider and signer
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        console.log("Connected Wallet Address:", address);

        // Redirect to Dashboard after successful connection
        navigate("/dashboard");
      } catch (error) {
        console.error("Error connecting to wallet:", error);
        alert("Failed to connect to wallet. Please try again.");
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this feature.");
    }
  };

  return (
    <div className="login-page">
      <h1>Login to Soul Safe</h1>
      <p>Link your MetaMask wallet to Soul Safe for a secure and personalized journey.</p>
      <button onClick={connectWallet}>Connect MetaMask</button>
    </div>
  );
}

export default LoginPage;
