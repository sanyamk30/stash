export const getEthPriceInUsd = async (): Promise<number> => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("CoinGecko API Error:", errorData);
      throw new Error(
        `Failed to fetch price: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data.ethereum.usd;
  } catch (error) {
    console.error("Error fetching ETH price:", error);
    return 0;
  }
};
