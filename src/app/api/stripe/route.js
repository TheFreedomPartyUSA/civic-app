import { stripe } from "../../../lib/stripe";

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "Pro Access" },
          unit_amount: 999,
          recurring: { interval: "month" },
        },
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000",
    cancel_url: "http://localhost:3000",
  });

  return Response.json({ url: session.url });
}