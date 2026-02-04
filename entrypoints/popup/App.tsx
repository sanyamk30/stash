import { useState, useEffect } from "react";
import "@/assets/main.css";
import { walletStorage } from "@/assets/storage";
import { OnboardingStart } from "@/components/ui/OnboardingStart";
import { PasswordCreate } from "@/components/ui/PasswordCreate";
import { ChainSelection } from "@/components/ui/ChainSelection";
import { MnemonicReveal } from "@/components/ui/MnemonicReveal";
import { Dashboard } from "@/components/ui/Dashboard";
import { Unlock } from "@/components/ui/Unlock";
import { WalletImport } from "@/components/ui/WalletImport";
import { ChainType } from "@/assets/chainConfig";

type Step =
  | "landing"
  | "password"
  | "chains"
  | "mnemonic"
  | "dashboard"
  | "import";

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>("landing");
  const [hasWallet, setHasWallet] = useState<boolean | null>(null);
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [password, setPassword] = useState("");
  const [selectedChains, setSelectedChains] = useState<ChainType[]>([
    "ethereum",
  ]);
  const [tempMnemonic, setTempMnemonic] = useState<string | null>(null);

  useEffect(() => {
    walletStorage.getValue().then((val) => {
      if (val && val.chains && Object.keys(val.chains).length > 0) {
        setHasWallet(true);
        setIsLocked(val.isLocked);
        setCurrentStep(val.isLocked ? "landing" : "dashboard");
      } else {
        setHasWallet(false);
      }
    });

    const unwatch = walletStorage.watch((val) => {
      if (val) {
        setIsLocked(val.isLocked);
      }
    });
    return () => unwatch();
  }, []);

  if (hasWallet === null)
    return <div className="p-4 text-center">Initializing...</div>;

  return (
    <div className="w-[360px] min-h-[500px] bg-background p-4">
      {/* 1. Onboarding Flow (No Wallet) */}
      {!hasWallet && (
        <>
          {currentStep === "landing" && (
            <OnboardingStart
              onNext={() => {
                setCurrentStep("password");
                setTempMnemonic(null);
              }}
              onImport={() => setCurrentStep("import")}
            />
          )}

          {currentStep === "import" && (
            <WalletImport
              onBack={() => setCurrentStep("landing")}
              onNext={(phrase) => {
                setTempMnemonic(phrase);
                setCurrentStep("password");
              }}
            />
          )}

          {currentStep === "password" && (
            <PasswordCreate
              onNext={(pwd) => {
                setPassword(pwd);
                setCurrentStep("chains");
              }}
              onBack={() => setCurrentStep("landing")}
            />
          )}

          {currentStep === "chains" && (
            <ChainSelection
              onNext={(chains) => {
                setSelectedChains(chains);
                setCurrentStep("mnemonic");
              }}
              onBack={() =>
                setCurrentStep(tempMnemonic ? "import" : "password")
              }
            />
          )}

          {currentStep === "mnemonic" && (
            <MnemonicReveal
              password={password}
              importedMnemonic={tempMnemonic}
              selectedChains={selectedChains}
              onComplete={() => {
                setHasWallet(true);
                setIsLocked(false);
                setCurrentStep("dashboard");
              }}
            />
          )}
        </>
      )}

      {/* 2. Unlock Screen (Wallet exists but is Locked) */}
      {hasWallet && isLocked && <Unlock onUnlock={() => setIsLocked(false)} />}

      {/* 3. Dashboard (Wallet exists and is Unlocked) */}
      {hasWallet && !isLocked && <Dashboard />}
    </div>
  );
}
