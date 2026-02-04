import { Button } from "@/components/ui/button";
import { Copy, Check, Info } from "lucide-react";
import { ChainSelector } from "@/components/ui/ChainSelector";
import { WalletState } from "@/assets/storage";
import { ChainType } from "@/assets/chainConfig";

interface DashboardHeaderProps {
  walletState: WalletState;
  address: string;
  copied: boolean;
  onSelectChain: (chain: ChainType) => void;
  onCopyAddress: () => void;
  onShowDetails: () => void;
}

export function DashboardHeader({
  walletState,
  address,
  copied,
  onSelectChain,
  onCopyAddress,
  onShowDetails,
}: DashboardHeaderProps) {
  return (
    <div className="flex justify-between items-center px-1 gap-2">
      <ChainSelector walletState={walletState} onSelectChain={onSelectChain} />
      <Button
        variant="ghost"
        size="sm"
        className="font-mono text-xs flex-1 justify-center"
        onClick={onCopyAddress}
      >
        {address.slice(0, 6)}...{address.slice(-4)}
        {copied ? (
          <Check className="ml-2 h-3 w-3 text-green-500 animate-in zoom-in" />
        ) : (
          <Copy className="ml-2 h-3 w-3" />
        )}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onShowDetails}
      >
        <Info className="h-4 w-4" />
      </Button>
    </div>
  );
}
