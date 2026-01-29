import { useState, useEffect } from "react";
import { getEthBalance } from "@/assets/provider";
import { getEthPriceInUsd } from "@/assets/priceFetcher";
import { walletStorage } from "@/assets/storage";

export const useEthBalance = () => {
  const [address, setAddress] = useState<string>("");
  const [ethBalance, setEthBalance] = useState("0.00");
  const [usdValue, setUsdValue] = useState("0.00");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const storedWallet = await walletStorage.getValue();
      if (storedWallet.address) {
        setAddress(storedWallet.address);

        const [balance, price] = await Promise.all([
          getEthBalance(storedWallet.address),
          getEthPriceInUsd(),
        ]);

        const totalUsd = parseFloat(balance) * price;
        setEthBalance(parseFloat(balance).toFixed(4));
        setUsdValue(totalUsd.toFixed(2));
      }
      setLoading(false);
    }
    loadData();
  }, []);

  return { address, ethBalance, usdValue, loading };
};
