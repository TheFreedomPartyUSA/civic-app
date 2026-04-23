export default class ScenarioEngine {
  constructor(scenarios) {
    this.scenarios = scenarios;
    this.score = 0;
  }

  getScenario(id) {
    return this.scenarios.find(s => s.id === id);
  }

  checkAnswer(scenario, index) {
    const choice = scenario.choices[index];

    if (choice.correct) {
      this.score++;
      return {
        correct: true,
        message: "Correct — you protected your rights."
      };
    }

    return {
      correct: false,
      message: `Incorrect. Correct response: ${scenario.correct_script}`
    };
  }
}