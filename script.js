const btn = document.getElementById("summarizeBtn");
const notesInput = document.getElementById("notesInput");
const summaryText = document.getElementById("summaryText");

btn.addEventListener("click", async () => {
  const notes = notesInput.value.trim();

  if (!notes) {
    summaryText.innerText = "Please paste some notes first.";
    return;
  }

  summaryText.innerText = "Generating summary...";

  try {
    const response = await fetch(
      "https://cold-math-dadb.asishapanda6.workers.dev",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: notes   // 🔥 THIS IS IMPORTANT
        }),
      }
    );

    const data = await response.json();

    if (data.summary) {
      summaryText.innerText = data.summary;
    } else {
      summaryText.innerText = "AI error. Try again.";
    }

  } catch (err) {
    summaryText.innerText = "Server error. Please try again later.";
  }
});