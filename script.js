const summarizeBtn = document.getElementById("summarizeBtn");
const notesInput = document.getElementById("notesInput");
const summaryText = document.getElementById("summaryText");

summarizeBtn.addEventListener("click", async () => {
    const notes = notesInput.value.trim();

    if (!notes) {
        summaryText.innerText = "Please paste some notes first.";
        return;
    }

    summaryText.innerText = "⏳ Generating AI summary... Please wait.";

    try {
        const response = await fetch(
            "https://hf.space/embed/facebook/bart-large-cnn/+/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    inputs: notes
                })
            }
        );

        const data = await response.json();

        if (!data || !data.data) {
            summaryText.innerText = "⚠️ AI is busy. Try again in a moment.";
            return;
        }

        summaryText.innerText = data.data[0];

    } catch (error) {
        summaryText.innerText = "❌ AI service unavailable. Please try later.";
        console.error(error);
    }
});