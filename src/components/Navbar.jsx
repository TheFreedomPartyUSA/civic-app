"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <h1>🇺🇸 Know Your Rights AI</h1>

      <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
        <Link href="/">Ask</Link>
        <Link href="/learn">Learn</Link>
        <Link href="/train">Train</Link>
      </div>
    </nav>
  );
}