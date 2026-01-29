import { useState, useEffect } from "react";
import "@/assets/main.css";
import { walletStorage } from "@/assets/storage";
import OnboardingStart from "@/components/ui/OnboardingStart";

export default function App() {
  const [hasWallet, setHasWallet] = useState<boolean | null>(null);
  const [onboarding, setOnboarding] = useState(false);

  useEffect(() => {
    walletStorage.getValue().then((val) => setHasWallet(!!val.address));
  }, []);

  if (hasWallet === null)
    return <div className="p-4 text-center">Initializing...</div>; // Wait for storage load

  if (!hasWallet && !onboarding) {
    return <OnboardingStart onNext={() => setOnboarding(true)} />;
  }

  if (onboarding) {
    return <div className="p-8">Step 2: Create Password UI goes here!</div>;
  }

  return <div className="p-8 font-bold">Dashboard (Wallet Found)</div>;
}
