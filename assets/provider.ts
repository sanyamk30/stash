import { ethers } from "ethers";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

const RPC_URL = import.meta.env.VITE_RPC_URL;
const SOLANA_RPC_URL = import.meta.env.VITE_SOLANA_RPC_URL;

export const rpcProvider = new ethers.JsonRpcProvider(RPC_URL);
export const solanaConnection = new Connection(SOLANA_RPC_URL, "confirmed");

export const getEthBalance = async (address: string) => {
  try {
    const balance = await rpcProvider.getBalance(address);
    // Convert BigInt (Wei) to human-readable string (ETH)
    return ethers.formatEther(balance);
  } catch (error) {
    console.error("Error fetching balance:", error);
    return "0.00";
  }
};

export const getSolanaBalance = async (address: string) => {
  try {
    const pubkey = new PublicKey(address);
    const balanceLamports = await solanaConnection.getBalance(pubkey);
    return (balanceLamports / LAMPORTS_PER_SOL).toFixed(4);
  } catch (error) {
    console.error("Error fetching Solana balance:", error);
    return "0.00";
  }
};
