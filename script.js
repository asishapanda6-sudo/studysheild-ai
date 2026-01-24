const button = document.getElementById("summarizeBtn");
const notesInput = document.getElementById("notesInput");
const summaryText = document.getElementById("summaryText");

button.addEventListener("click", async () => {
  const notes = notesInput.value.trim();

  if (!notes) {
    summaryText.textContent = "⚠️ Please paste some notes first.";
    return;
  }

  summaryText.textContent = "⏳ Generating AI summary...";

  try {
    const response = await fetch(
      "https://cold-math-dadb.asishpanda6.workers.dev", // YOUR WORKER URL
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: notes })
      }
    );

    const data = await response.json();

    if (data.summary) {
      summaryText.textContent = data.summary;
    } else {
      summaryText.textContent = "❌ AI failed to generate summary.";
    }
  } catch (error) {
    summaryText.textContent = "❌ Server error. Please try again.";
  }
});