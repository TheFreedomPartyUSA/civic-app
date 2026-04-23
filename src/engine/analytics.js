export function trackEvent(name, data = {}) {
  console.log("EVENT:", name, data);

  fetch("/api/progress", {
    method: "POST",
    body: JSON.stringify({ name, data }),
  });
}