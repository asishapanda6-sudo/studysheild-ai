const summarizeBtn = document.getElementById("summarizeBtn");
const notesInput = document.getElementById("notesInput");
const summaryText = document.getElementById("summaryText");

// 🔐 Paste your Hugging Face token here
const HF_TOKEN = "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";

const HF_API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

summarizeBtn.addEventListener("click", async () => {
    const notes = notesInput.value.trim();

    if (!notes) {
        summaryText.innerText = "Please paste some notes first.";
        return;
    }

    summaryText.innerText = "⏳ Generating AI summary... Please wait.";

    try {
        const response = await fetch(HF_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${HF_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputs: notes,
                parameters: {
                    max_length: 150,
                    min_length: 60
                }
            })
        });

        const data = await response.json();

        if (data.error) {
            summaryText.innerText = "⚠️ AI is busy. Try again in a moment.";
            return;
        }

        summaryText.innerText = data[0].summary_text;

    } catch (error) {
        summaryText.innerText = "❌ Error connecting to AI.";
        console.error(error);
    }
});