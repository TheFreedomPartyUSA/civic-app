"use client";

import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [topic, setTopic] = useState("");
  const [learnData, setLearnData] = useState<any>(null);

  const [billQuery, setBillQuery] = useState("");
  const [bills, setBills] = useState<any[]>([]);

  const [address, setAddress] = useState("");
  const [reps, setReps] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  // 🧠 Ask AI
  const askAI = async () => {
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch(`${API_BASE}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setAnswer(data.answer || "No response.");
    } catch (err) {
      setAnswer("Error connecting to server.");
    }

    setLoading(false);
  };

  // 📚 Learn
  const loadLearn = async () => {
    setLoading(true);
    setLearnData(null);

    try {
      const res = await fetch(`${API_BASE}/learn?topic=${topic}`);
      const data = await res.json();
      setLearnData(data);
    } catch (err) {
      setLearnData({ error: "Failed to load." });
    }

    setLoading(false);
  };

  // 🏛️ Bills
  const searchBills = async () => {
    setLoading(true);
    setBills([]);

    try {
      const res = await fetch(`${API_BASE}/bills?query=${billQuery}`);
      const data = await res.json();
      setBills(data.bills || []);
    } catch (err) {
      setBills([]);
    }

    setLoading(false);
  };

  // 🧑‍⚖️ Representatives
  const loadReps = async () => {
    setLoading(true);
    setReps(null);

    try {
      const res = await fetch(`${API_BASE}/representatives?address=${address}`);
      const data = await res.json();
      setReps(data);
    } catch (err) {
      setReps({ error: "Failed to load." });
    }

    setLoading(false);
  };

  return (
    <main style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🇺🇸 Civic App</h1>

      {/* 🧠 ASK AI */}
      <section>
        <h2>Ask AI</h2>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about your rights..."
        />
        <button onClick={askAI}>Ask</button>

        {loading && <p>Loading...</p>}
        {answer && <p><strong>Answer:</strong> {answer}</p>}
      </section>

      <hr />

      {/* 📚 LEARN */}
      <section>
        <h2>Learn</h2>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. 1st Amendment"
        />
        <button onClick={loadLearn}>Load</button>

        {learnData && (
          <pre>{JSON.stringify(learnData, null, 2)}</pre>
        )}
      </section>

      <hr />

      {/* 🏛️ BILLS */}
      <section>
        <h2>Search Bills</h2>
        <input
          value={billQuery}
          onChange={(e) => setBillQuery(e.target.value)}
          placeholder="e.g. healthcare"
        />
        <button onClick={searchBills}>Search</button>

        {bills.map((bill, i) => (
          <div key={i}>
            <p><strong>{bill.title}</strong></p>
            <p>{bill.summary}</p>
          </div>
        ))}
      </section>

      <hr />

      {/* 🧑‍⚖️ REPRESENTATIVES */}
      <section>
        <h2>Your Representatives</h2>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
        />
        <button onClick={loadReps}>Find</button>

        {reps && (
          <pre>{JSON.stringify(reps, null, 2)}</pre>
        )}
      </section>

      <hr />

      {/* 🚨 ALERTS */}
      <section>
        <h2>Alerts</h2>
        <p>(Coming soon — bill tracking & notifications)</p>
      </section>
    </main>
  );
}