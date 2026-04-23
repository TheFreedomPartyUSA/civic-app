import { useState } from "react";
import ScenarioEngine from "../engine/ScenarioEngine";
import { scenarios } from "../data/scenarios";

const engine = new ScenarioEngine(scenarios);

export default function Scenario() {
  const scenario = engine.getScenario("traffic_search");
  const [result, setResult] = useState(null);

  const handleChoice = (index) => {
    const res = engine.checkAnswer(scenario, index);
    setResult(res);
  };

  return (
    <div>
      <h2>🚨 Scenario</h2>
      <p>{scenario.situation}</p>
      <p>{scenario.prompt}</p>

      {scenario.choices.map((c, i) => (
        <button key={i} onClick={() => handleChoice(i)}>
          {c.text}
        </button>
      ))}

      {result && (
        <p>{result.message}</p>
      )}
    </div>
  );
}