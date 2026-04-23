export async function GET() {
  const challenges = [
    "Refuse a search scenario",
    "Stay silent during questioning",
    "Identify illegal police action",
  ];

  const today = new Date().getDate();
  const challenge = challenges[today % challenges.length];

  return Response.json({ challenge });
}