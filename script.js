document.getElementById("summarizeBtn").addEventListener("click", async () => {
  const text = document.getElementById("notesInput").value.trim();
  const output = document.getElementById("summaryText");

  if (!text) {
    output.innerText = "Please paste some notes first.";
    return;
  }

  output.innerText = "AI is thinking...";

  try {
    const res = await fetch("https://YOUR-WORKER-URL.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await res.json();
    output.innerText = data.summary || "AI failed to respond.";

  } catch (e) {
    output.innerText = "Server error. Please try again.";
  }
});