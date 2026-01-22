document.getElementById("summarizeBtn").addEventListener("click", () => {
  const text = document.getElementById("notesInput").value.trim();
  const output = document.getElementById("summaryText");

  if (!text) {
    output.innerText = "Please paste some notes first.";
    return;
  }

  output.innerText = "Summarizing...";

  // Simple intelligent summary logic
  const sentences = text.split(".").map(s => s.trim()).filter(s => s);
  const summary = sentences.slice(0, 4).map(s => "• " + s).join("\n");

  setTimeout(() => {
    output.innerText = summary || "Could not summarize.";
  }, 600);
});