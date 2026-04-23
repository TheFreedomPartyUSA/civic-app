"use client";

import { useEffect, useState } from "react";
import { getUser } from "../lib/auth";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getUser().then((u) => {
      if (!u) router.push("/");
      else setUser(u);
    });
  }, []);

  if (!user) return <p>Loading...</p>;

  return children;
}