document.getElementById("summarizeBtn").addEventListener("click", () => {
  const text = document.getElementById("notesInput").value.trim();
  const output = document.getElementById("summaryText");

  if (!text) {
    output.innerText = "Please paste some notes first.";
    return;
  }

  output.innerText = "Summarizing...";

  // Simple smart summary (no server, no error)
  const sentences = text
    .split(".")
    .map(s => s.trim())
    .filter(s => s.length > 0);

  const summary = sentences
    .slice(0, 4)
    .map(s => "• " + s)
    .join("\n");

  setTimeout(() => {
    output.innerText = summary || "Could not generate summary.";
  }, 500);
});