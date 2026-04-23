import { openai } from "../../../lib/openai";

export async function POST(req) {
  try {
    const { input } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: input }],
    });

    return Response.json({
      reply: response.choices[0].message.content,
    });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}