import { ethers } from "ethers";

const RPC_URL = import.meta.env.VITE_RPC_URL;

export const rpcProvider = new ethers.JsonRpcProvider(RPC_URL);

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
