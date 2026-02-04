import { useEffect, useState } from "react";
import { ChainType } from "@/assets/chainConfig";
import { walletStorage } from "@/assets/storage";
import { getEthBalance, getSolanaBalance } from "@/assets/provider";
import { getEthPriceInUsd, getSolPriceInUsd } from "@/assets/priceFetcher";

export interface BalanceData {
  address: string;
  balance: string;
  usdValue: string;
  loading: boolean;
}

export function useBalance(chain: ChainType): BalanceData {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("0.00");
  const [usdValue, setUsdValue] = useState("0.00");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBalance = async () => {
      try {
        const walletState = await walletStorage.getValue();

        if (chain === "ethereum") {
          const ethWallet = walletState.chains.ethereum?.accounts["0"];
          if (!ethWallet) {
            setLoading(false);
            return;
          }

          setAddress(ethWallet.address);

          const [ethBal, price] = await Promise.all([
            getEthBalance(ethWallet.address),
            getEthPriceInUsd(),
          ]);

          const totalUsd = parseFloat(ethBal) * price;
          setBalance(parseFloat(ethBal).toFixed(4));
          setUsdValue(totalUsd.toFixed(2));
        } else if (chain === "solana") {
          const solanaWallet = walletState.chains.solana?.accounts["0"];
          if (!solanaWallet) {
            setLoading(false);
            return;
          }

          setAddress(solanaWallet.address);

          const [solAmount, price] = await Promise.all([
            getSolanaBalance(solanaWallet.address),
            getSolPriceInUsd(),
          ]);

          const totalUsd = parseFloat(solAmount) * price;
          setBalance(solAmount);
          setUsdValue(totalUsd.toFixed(2));
        }
      } catch (error) {
        console.error(`Error fetching ${chain} balance:`, error);
        setBalance("0.00");
        setUsdValue("0.00");
      } finally {
        setLoading(false);
      }
    };

    loadBalance();
  }, [chain]);

  return { address, balance, usdValue, loading };
}
