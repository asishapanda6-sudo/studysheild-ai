const summarizeBtn = document.getElementById("summarizeBtn");
const notesInput = document.getElementById("notesInput");
const summaryText = document.getElementById("summaryText");

// 🔴 Cloudflare Worker URL (AI Backend)
const BACKEND_URL = "https://cold-math-dadb.asishapanda6.workers.dev";

summarizeBtn.addEventListener("click", async () => {
  const notes = notesInput.value.trim();

  if (!notes) {
    summaryText.innerText = "Please paste some notes first.";
    return;
  }

  summaryText.innerText = "⏳ Generating AI summary... Please wait.";

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: notes })
    });

    const data = await response.json();

    if (data.error) {
      summaryText.innerText = "⚠️ AI error. Try again.";
      return;
    }

    summaryText.innerText =
      data[0]?.summary_text || "⚠️ No summary generated.";

  } catch (error) {
    summaryText.innerText = "❌ Server error. Please try later.";
    console.error(error);
  }
});