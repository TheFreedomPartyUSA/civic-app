"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const steps = [
    "Learn your rights",
    "Practice real scenarios",
    "Build confidence under pressure",
  ];

  return (
    <div>
      <h1>Welcome</h1>
      <p>{steps[step]}</p>

      <button onClick={() => setStep(step + 1)}>
        Next
      </button>

      {step >= steps.length && (
        <button onClick={() => router.push("/train")}>
          Start Training
        </button>
      )}
    </div>
  );
}