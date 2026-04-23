"use client";

import { useState } from "react";
import Loader from "../components/Loader";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  async function askAI(q) {
    setLoading(true);

    const res = await fetch("/api/ask", {
      method: "POST",
      body: JSON.stringify({ question: q }),
    });

    const data = await res.json();

    setAnswer(data.answer);
    setLoading(false);
  }

  return (
    <div>
      <h1>🇺🇸 Know Your Rights AI</h1>

      <button onClick={() => askAI("Do I need a lawyer?")}>
        Ask
      </button>

      {loading ? <Loader /> : <p>{answer}</p>}
    </div>
  );
}