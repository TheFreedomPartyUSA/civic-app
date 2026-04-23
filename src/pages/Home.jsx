import scripts from "../data/scripts.json";
import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);

  const handleAsk = () => {
    if (question.toLowerCase().includes("lawyer")) {
      setAnswer(scripts.lawyer);
    } else if (question.toLowerCase().includes("search")) {
      setAnswer(scripts.search);
    } else {
      setAnswer(null);
    }
  };

  return (
    <div>
      <h1>🇺🇸 Know Your Rights AI</h1>

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question..."
      />

      <button onClick={handleAsk}>Ask</button>

      {answer && (
        <div>
          <h2>Answer:</h2>
          <p><strong>Explanation:</strong> {answer.explanation}</p>
          <p><strong>Your Rights:</strong> {answer.rights}</p>
          <p><strong>What You Should Do:</strong> {answer.action}</p>
          <p><strong>What You Can Say:</strong> "{answer.script}"</p>
        </div>
      )}
    </div>
  );
}