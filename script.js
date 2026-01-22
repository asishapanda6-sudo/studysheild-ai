// Button aur elements ko select karo
const summarizeBtn = document.getElementById("summarizeBtn");
const notesInput = document.getElementById("notesInput");
const summaryText = document.getElementById("summaryText");

// Button click event
summarizeBtn.addEventListener("click", function () {

    const notes = notesInput.value.trim();

    // Agar notes empty ho
    if (notes === "") {
        summaryText.innerText = "Please paste some notes first.";
        return;
    }

    // Demo AI-style summary (temporary)
    summaryText.innerText = 
        "📌 Key Concepts:\n" +
        "• Main definition and core idea\n" +
        "• Important keywords\n\n" +

        "📌 Important Points:\n" +
        "• Focus on basics first\n" +
        "• Revise examples\n\n" +

        "📌 Exam Focus:\n" +
        "• Frequently asked questions\n" +
        "• Short notes and formulas\n\n" +

        "⚠️ Note: This is a demo summary. Real AI summary will be added soon.";
});