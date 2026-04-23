import { supabase } from "../../../lib/supabase";
import { openai } from "../../../lib/openai";
import { getEmbedding, cosineSimilarity } from "../../../lib/embeddings";
import data from "../../../data/constitution.json";

export async function POST(req) {
  try {
    const { question, userId } = await req.json();

    if (!question) {
      return Response.json({ error: "No question provided" }, { status: 400 });
    }

    // STEP 1: Embed user query
    const queryEmbedding = await getEmbedding(question);

    // STEP 2: Compare with all documents
    const scored = await Promise.all(
      data.map(async (item) => {
        let embedding = item.embedding;

        // Generate embedding if missing
        if (!embedding || embedding.length === 0) {
          embedding = await getEmbedding(item.text);
        }

        const score = cosineSimilarity(queryEmbedding, embedding);

        return { ...item, score };
      })
    );

    // STEP 3: Sort by relevance
    const topMatches = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    const context = topMatches
      .map((m) => `${m.title}: ${m.text}`)
      .join("\n\n");

    // STEP 4: AI Response
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are a civic legal assistant.

Use the legal context below:

${context}

Respond in:

1. Simple Explanation
2. Real-Life Example
3. What You Should Do
4. What You Can Say (short phrase)

If unsure, say "I don't know".
          `,
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    const answer = completion.choices[0].message.content;

    // STEP 5: Save history
    if (userId) {
      await supabase.from("history").insert({
        user_id: userId,
        question,
        answer,
      });
    }

    return Response.json({
      answer,
      sources: topMatches.map((m) => m.title),
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}