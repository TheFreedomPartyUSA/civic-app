export function shareResult(text) {
  if (navigator.share) {
    navigator.share({
      title: "Know Your Rights AI",
      text,
    });
  } else {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  }
}