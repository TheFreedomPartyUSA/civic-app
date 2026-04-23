import { trackEvent } from "./analytics";

export function updateProgress({ correct, user }) {
  let xp = parseInt(localStorage.getItem("xp") || "0");
  let streak = parseInt(localStorage.getItem("streak") || "0");

  if (correct) {
    xp += 10;
    streak += 1;
  } else {
    streak = 0;
  }

  localStorage.setItem("xp", xp);
  localStorage.setItem("streak", streak);

  trackEvent("progress_update", { xp, streak });

  // 🔥 SEND TO DATABASE
  fetch("/api/progress", {
    method: "POST",
    body: JSON.stringify({
      userId: user?.id,
      xp,
      streak,
    }),
  });

  return { xp, streak };
}