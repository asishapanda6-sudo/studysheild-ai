const summarizeBtn = document.getElementById("summarizeBtn");
const notesInput = document.getElementById("notesInput");
const summaryText = document.getElementById("summaryText");

// ✅ Cloudflare Worker backend
const BACKEND_URL = "https://cold-math-dadb.asishapanda6.workers.dev";

summarizeBtn.addEventListener("click", async () => {
  const notes = notesInput.value.trim();

  if (!notes) {
    summaryText.innerText = "Please paste some notes first.";
    return;
  }

  summaryText.innerText = "⏳ Generating AI summary... Please wait (first time may take 30s)";

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: notes })
    });

    const data = await response.json();

    // 🔴 CASE: Hugging Face error
    if (data.error) {
      summaryText.innerText =
        "⚠️ AI model is waking up. Please click again in 20–30 seconds.";
      return;
    }

    // ✅ CASE: Correct response
    if (Array.isArray(data) && data[0]?.summary_text) {
      summaryText.innerText = data[0].summary_text;
      return;
    }

    // ❌ Unknown case
    summaryText.innerText = "⚠️ Unexpected AI response. Try again.";

  } catch (err) {
    summaryText.innerText = "❌ Server error. Please try again.";
    console.error(err);
  }
});