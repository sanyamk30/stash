import { useState, useEffect } from "react";
import "@/assets/main.css";
import { walletStorage } from "@/assets/storage";
import OnboardingStart from "@/components/ui/OnboardingStart";
import { PasswordCreate } from "@/components/ui/PasswordCreate";
import { MnemonicReveal } from "@/components/ui/MnemonicReveal";
import { Dashboard } from "@/components/ui/Dashboard";

type Step = "landing" | "password" | "mnemonic" | "dashboard";

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>("landing");
  const [hasWallet, setHasWallet] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");

  useEffect(() => {
    walletStorage.getValue().then((val) => {
      if (val.address) {
        setHasWallet(true);
        setCurrentStep("dashboard");
      } else {
        setHasWallet(false);
      }
    });
  }, []);

  if (hasWallet === null)
    return <div className="p-4 text-center">Initializing...</div>;

  return (
    <div className="w-[360px] min-h-[500px] bg-background p-4">
      {currentStep === "landing" && (
        <OnboardingStart onNext={() => setCurrentStep("password")} />
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
          onComplete={() => setCurrentStep("dashboard")}
        />
      )}

      {currentStep === "dashboard" && (
        // <Dashboard onLock={() => setCurrentStep("password")} />
        <Dashboard />
      )}
    </div>
  );
}
