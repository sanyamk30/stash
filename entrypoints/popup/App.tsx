import { useState, useEffect } from "react";
import "@/assets/main.css";
import { walletStorage } from "@/assets/storage";
import { OnboardingStart } from "@/components/ui/OnboardingStart";
import { PasswordCreate } from "@/components/ui/PasswordCreate";
import { MnemonicReveal } from "@/components/ui/MnemonicReveal";
import { Dashboard } from "@/components/ui/Dashboard";
import { Unlock } from "@/components/ui/Unlock";
import { WalletImport } from "@/components/ui/WalletImport";

type Step = "landing" | "password" | "mnemonic" | "dashboard" | "import";

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>("landing");
  const [hasWallet, setHasWallet] = useState<boolean | null>(null);
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [password, setPassword] = useState("");

  const [tempMnemonic, setTempMnemonic] = useState<string | null>(null);

  useEffect(() => {
    walletStorage.getValue().then((val) => {
      if (val.address) {
        setHasWallet(true);
        setIsLocked(val.isLocked);
        setCurrentStep(val.isLocked ? "landing" : "dashboard");
      } else {
        setHasWallet(false);
      }
    });

    const unwatch = walletStorage.watch((val) => {
      setIsLocked(val.isLocked);
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
                setTempMnemonic(phrase); // Store the phrase to encrypt later
                setCurrentStep("password");
              }}
            />
          )}

          {currentStep === "password" && (
            <PasswordCreate
              onNext={(pwd) => {
                setPassword(pwd);
                setCurrentStep("mnemonic");
              }}
              onBack={() => setCurrentStep("landing")}
            />
          )}

          {currentStep === "mnemonic" && (
            <MnemonicReveal
              password={password}
              importedMnemonic={tempMnemonic}
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
