import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, Circle } from "lucide-react";
import {
  SUPPORTED_CHAINS,
  CHAIN_CONFIGS,
  ChainType,
} from "@/assets/chainConfig";

interface ChainSelectionProps {
  onNext: (chains: ChainType[]) => void;
  onBack: () => void;
}

export function ChainSelection({ onNext, onBack }: ChainSelectionProps) {
  const [selectedChains, setSelectedChains] = useState<Set<ChainType>>(
    new Set(["ethereum"]),
  );

  const toggleChain = (chain: ChainType) => {
    const updated = new Set(selectedChains);
    if (updated.has(chain)) {
      updated.delete(chain);
    } else {
      updated.add(chain);
    }
    setSelectedChains(updated);
  };

  const handleNext = () => {
    if (selectedChains.size === 0) return;
    onNext(Array.from(selectedChains) as ChainType[]);
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Select Blockchains</h2>
        <p className="text-sm text-muted-foreground">
          Choose which blockchains you want to use with this wallet.
        </p>
      </div>

      {/* Chain Selection */}
      <div className="space-y-3">
        {SUPPORTED_CHAINS.map((chain) => {
          const config = CHAIN_CONFIGS[chain];
          const isSelected = selectedChains.has(chain);

          return (
            <Button
              key={chain}
              onClick={() => toggleChain(chain)}
              variant="outline"
              className={`w-full justify-start gap-3 h-auto p-4 flex items-center transition-all ${
                isSelected
                  ? "border-primary bg-primary/5 border-2"
                  : "border-muted bg-muted/30 hover:border-muted-foreground/30"
              }`}
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {config.icon}
              </div>
              <span className="flex-grow text-left font-medium">
                {config.name}
              </span>
              {isSelected ? (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
            </Button>
          );
        })}
      </div>

      {/* Info Alert */}
      <Alert className="bg-blue-50 border-blue-200 text-blue-900">
        <AlertDescription className="text-xs">
          You can add more blockchains later from the dashboard. All wallets
          will be derived from the same recovery phrase.
        </AlertDescription>
      </Alert>

      <div className="flex-grow" />

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 h-12" onClick={onBack}>
          Back
        </Button>
        <Button
          className="flex-1 h-12"
          onClick={handleNext}
          disabled={selectedChains.size === 0}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
