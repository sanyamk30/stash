import {
  ChainType,
  CHAIN_CONFIGS,
  SUPPORTED_CHAINS,
} from "@/assets/chainConfig";
import { WalletState } from "@/assets/storage";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ChainSelectorProps {
  walletState: WalletState;
  onSelectChain: (chain: ChainType) => void;
}

export function ChainSelector({
  walletState,
  onSelectChain,
}: ChainSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentChain = walletState.selectedChain;
  const availableChains = Object.keys(walletState.chains) as ChainType[];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectChain = (chain: ChainType) => {
    onSelectChain(chain);
    setIsOpen(false);
  };

  if (availableChains.length === 0) {
    return null;
  }

  const currentConfig = CHAIN_CONFIGS[currentChain];

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
          {currentConfig.icon}
        </div>
        {currentConfig.name}
        <ChevronDown className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 bg-popover border border-input rounded-lg shadow-lg z-50 min-w-[180px]">
          {availableChains.map((chain) => {
            const config = CHAIN_CONFIGS[chain];
            const isSelected = chain === currentChain;

            return (
              <Button
                key={chain}
                variant="ghost"
                onClick={() => handleSelectChain(chain)}
                className={`w-full justify-start gap-2 px-4 py-2 text-sm h-auto transition-colors ${
                  isSelected
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-muted text-foreground"
                } ${chain !== availableChains[availableChains.length - 1] ? "border-b border-border" : ""}`}
              >
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                  {config.icon}
                </div>
                <span className="flex-grow text-left">{config.name}</span>
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                )}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
