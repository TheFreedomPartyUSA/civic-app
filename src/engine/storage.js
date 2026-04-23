export function loadProgress() {
  const data = localStorage.getItem("progress");

  if (!data) {
    return { xp: 0, level: 1, streak: 0, lastActive: null };
  }

  return JSON.parse(data);
}

export function saveProgress(data) {
  localStorage.setItem("progress", JSON.stringify(data));
}

export function calculateLevel(xp) {
  return Math.floor(xp / 50) + 1;
}

export function updateStreak(progress) {
  const today = new Date().toDateString();

  if (progress.lastActive === today) return progress;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (progress.lastActive === yesterday.toDateString()) {
    progress.streak += 1;
  } else {
    progress.streak = 1;
  }

  progress.lastActive = today;
  return progress;
}