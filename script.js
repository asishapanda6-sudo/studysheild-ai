const WORKER_URL = "https://cold-math-dadb.asishapanda6.workers.dev";

document.getElementById("summarizeBtn").addEventListener("click", async () => {
  const notes = document.getElementById("notesInput").value.trim();
  const output = document.getElementById("summaryText");

  if (!notes) {
    output.innerText = "⚠️ Please paste some notes first.";
    return;
  }

  output.innerText = "⏳ Generating summary...";

  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: notes })
    });

    const data = await response.json();

    if (data.summary) {
      output.innerText = data.summary;
    } else {
      output.innerText = "⚠️ AI error. Try again.";
    }

  } catch (error) {
    output.innerText = "❌ Server error. Please try again later.";
    console.error(error);
  }
});