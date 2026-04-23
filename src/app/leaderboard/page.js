"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    supabase
      .from("users")
      .select("*")
      .order("xp", { ascending: false })
      .limit(10)
      .then(({ data }) => setUsers(data));
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>

      {users.map((u, i) => (
        <p key={u.id}>
          {i + 1}. {u.email} — {u.xp} XP
        </p>
      ))}
    </div>
  );
}