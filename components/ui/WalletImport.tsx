import { useState } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export function WalletImport({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: (mnemonic: string) => void;
}) {
  const [words, setWords] = useState(Array(12).fill(""));
  const [error, setError] = useState("");

  const handleInputChange = (value: string, index: number) => {
    const newWords = [...words];

    // Handle Paste Logic: If the user pastes a whole phrase
    if (value.includes(" ")) {
      const pastedWords = value.trim().split(/\s+/).slice(0, 12);
      pastedWords.forEach((word, i) => {
        if (i < 12) newWords[i] = word.toLowerCase();
      });
    } else {
      newWords[index] = value.toLowerCase().trim();
    }

    setWords(newWords);
    setError("");
  };

  const handleImport = () => {
    const mnemonic = words.join(" ");
    if (ethers.Mnemonic.isValidMnemonic(mnemonic)) {
      onNext(mnemonic);
    } else {
      setError("Invalid mnemonic phrase. Please check for typos.");
    }
  };

  const isComplete = words.every((word) => word.length > 0);

  return (
    <div className="flex flex-col h-full space-y-4 animate-in fade-in slide-in-from-right-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={onBack}
        className="-ml-2 w-8 h-8"
      >
        <ArrowLeft className="w-4 h-4" />
      </Button>

      <div className="space-y-1">
        <h2 className="text-xl font-bold">Import Wallet</h2>
        <p className="text-xs text-muted-foreground">
          Enter your 12-word recovery phrase.
        </p>
      </div>

      {/* 12-Input Grid */}
      <div className="grid grid-cols-3 gap-2 pt-2">
        {words.map((word, i) => (
          <div key={i} className="relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground select-none">
              {i + 1}
            </span>
            <Input
              value={word}
              onChange={(e) => handleInputChange(e.target.value, i)}
              className="pl-6 h-9 text-xs font-mono"
              autoComplete="off"
            />
          </div>
        ))}
      </div>

      {error && (
        <p className="text-[10px] text-destructive font-medium">{error}</p>
      )}

      <div className="bg-primary/5 p-3 rounded-lg flex gap-3 items-start border border-primary/10">
        <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
        <p className="text-[10px] leading-tight text-muted-foreground">
          Stash encrypts your keys locally. Your phrase never leaves this
          device.
        </p>
      </div>

      <div className="flex-grow" />

      <Button
        className="w-full h-11"
        onClick={handleImport}
        disabled={!isComplete}
      >
        Import Wallet
      </Button>
    </div>
  );
}
