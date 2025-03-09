"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const contractAddress = "0x40ae3553a2dbbe463f84da97bda5607cfd03b40d";
const abi = [
  "function mintReserve(address creatorContractAddress, uint256 instanceId, uint32 mintCount) external"
];

const MintNFT = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Reset success message after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        setLoading(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setWalletAddress(await signer.getAddress());
        setError("");
      } catch (err) {
        console.error("Wallet connection error:", err);
        setError("Gagal connect wallet!");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Install MetaMask dulu!");
    }
  };

  const mintNFT = async () => {
    if (!walletAddress) return setError("Harap connect wallet dulu!");

    try {
      setLoading(true);
      setError(""); // Reset error sebelum transaksi
      setSuccess(false);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // Coba estimate gas dulu buat deteksi error sebelum transaksi
      try {
        await contract.mintReserve.estimateGas(
          "0xa8863bf1c8933f649e7b03eb72109e5e187505ea",
          1,
          1
        );
      } catch (gasError) {
        console.error("Estimate Gas Error:", gasError);
        return setError("Estimasi gas gagal. Cek apakah wallet bisa mint NFT!");
      }

      // Jika berhasil estimate, lanjutkan transaksi
      const tx = await contract.mintReserve(
        "0xa8863bf1c8933f649e7b03eb72109e5e187505ea",
        1,
        1
      );
      await tx.wait();

      setSuccess(true);
    } catch (err) {
      console.error("Minting error:", err);
      setError(err.reason || err.message || "Mint gagal!");
    } finally {
      setLoading(false);
    }
  };

  // Format wallet address for display
  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      {/* Header with glow effect */}
      <div className="relative py-8 px-6 text-center border-b border-blue-700">
        <div className="absolute inset-0 bg-blue-500 opacity-10 blur-xl"></div>
        <h2 className="text-3xl font-bold relative z-10">Premium NFT Collection</h2>
        <p className="mt-2 text-blue-200 relative z-10">Limited Edition Digital Collectibles</p>
      </div>

      {/* Main content */}
      <div className="p-6">
        {/* Status messages */}
        {error && (
          <div className="mb-6 p-3 bg-red-900/40 border border-red-500 rounded-lg text-red-200 text-sm flex items-start">
            <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-3 bg-green-900/40 border border-green-500 rounded-lg text-green-200 text-sm flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Mint berhasil! NFT sudah masuk ke wallet Anda.</span>
          </div>
        )}

        {/* Wallet status */}
        <div className="mb-6 bg-blue-800/30 backdrop-blur-sm rounded-xl p-4 border border-blue-700/50">
          <div className="flex items-center justify-between">
            <span className="text-blue-300 text-sm">Status Wallet</span>
            <span className={`px-2 py-1 rounded-full text-xs ${walletAddress ? 'bg-green-800 text-green-200' : 'bg-yellow-800/50 text-yellow-200'}`}>
              {walletAddress ? 'Connected' : 'Not Connected'}
            </span>
          </div>
          {walletAddress && (
            <div className="mt-2 flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-white font-mono text-sm">{formatAddress(walletAddress)}</p>
            </div>
          )}
        </div>

        {/* Action buttons */}
        {!walletAddress ? (
          <button
            className="w-full relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-all hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 disabled:opacity-70"
            onClick={connectWallet}
            disabled={loading}
          >
            <span className="relative z-10 flex items-center justify-center">
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connecting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Connect Wallet
                </>
              )}
            </span>
          </button>
        ) : (
          <button
            className="w-full relative overflow-hidden bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium py-3 px-4 rounded-lg transition-all hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 disabled:opacity-70"
            onClick={mintNFT}
            disabled={loading}
          >
            <span className="relative z-10 flex items-center justify-center">
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Minting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Mint NFT Now
                </>
              )}
            </span>
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="py-4 px-6 bg-blue-900/50 text-center border-t border-blue-800">
        <p className="text-xs text-blue-300">
          Deployed on Ethereum • 2025 Limited Edition
        </p>
      </div>
    </div>
  );
};

export default MintNFT;