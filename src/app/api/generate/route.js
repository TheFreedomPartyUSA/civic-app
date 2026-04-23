import { askAI } from "../../../lib/openai";

export async function POST(req) {
  const { topic } = await req.json();

  const prompt = `
Create a branching training scenario about: ${topic}
Include:
- situation
- choices
- correct answers
- consequences
`;

  const result = await askAI(prompt);

  return Response.json({ scenario: result });
}