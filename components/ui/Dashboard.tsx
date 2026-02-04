import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { walletStorage, WalletState } from "@/assets/storage";
import { useBalance } from "@/hooks/useBalance";
import { WalletDetailsModal } from "@/components/ui/WalletDetailsModal";
import { DashboardHeader } from "@/components/ui/DashboardHeader";
import { BalanceDisplay } from "@/components/ui/BalanceDisplay";
import { AssetsList } from "@/components/ui/AssetsList";
import { CHAIN_CONFIGS, ChainType } from "@/assets/chainConfig";

export function Dashboard() {
  const [walletState, setWalletState] = useState<WalletState | null>(null);
  const [copied, setCopied] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Fetch balance only for the currently selected chain
  const currentChain = walletState?.selectedChain || "ethereum";
  const currentBalanceData = useBalance(currentChain);

  useEffect(() => {
    walletStorage.getValue().then(setWalletState);

    const unwatch = walletStorage.watch((val) => {
      setWalletState(val);
    });
    return () => unwatch();
  }, []);

  const handleLock = async () => {
    const current = await walletStorage.getValue();
    await walletStorage.setValue({ ...current, isLocked: true });
  };

  const handleSelectChain = async (chain: ChainType) => {
    const current = await walletStorage.getValue();
    await walletStorage.setValue({ ...current, selectedChain: chain });
  };

  const copyAddress = () => {
    if (currentBalanceData) {
      navigator.clipboard.writeText(currentBalanceData.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!walletState) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  const currentAccount = walletState.chains[currentChain]?.accounts["0"];
  const chainConfig = CHAIN_CONFIGS[currentChain as ChainType];

  if (!currentAccount) {
    return (
      <div className="p-4 text-center space-y-4">
        <p>No wallet found for {chainConfig.name}</p>
        <Button onClick={() => handleSelectChain("ethereum")}>
          Back to Ethereum
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Lock Button - Top Right */}
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:text-destructive transition-colors"
          onClick={handleLock}
        >
          <Lock className="h-4 w-4" />
        </Button>
      </div>

      {/* Header */}
      <DashboardHeader
        walletState={walletState}
        address={currentBalanceData.address}
        copied={copied}
        onSelectChain={handleSelectChain}
        onCopyAddress={copyAddress}
        onShowDetails={() => setShowDetailsModal(true)}
      />

      {/* Balance Display */}
      <BalanceDisplay
        balance={currentBalanceData.balance}
        symbol={CHAIN_CONFIGS[currentChain].symbol}
        usdValue={currentBalanceData.usdValue}
        loading={currentBalanceData.loading}
      />

      {/* Assets List */}
      <AssetsList
        chain={currentChain}
        balance={currentBalanceData.balance}
        symbol={CHAIN_CONFIGS[currentChain].symbol}
        usdValue={currentBalanceData.usdValue}
      />

      {/* Wallet Details Modal */}
      {showDetailsModal && (
        <WalletDetailsModal
          chain={currentChain}
          wallet={currentAccount}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
}
