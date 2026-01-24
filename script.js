async function summarizeNotes() {
  const notes = document.getElementById("notes").value.trim();
  const output = document.getElementById("output");

  if (!notes) {
    output.innerText = "Please enter some notes.";
    return;
  }

  output.innerText = "Summarizing...";

  try {
    const response = await fetch(
      "https://cold-math-dadb.asishpanda6.workers.dev",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: notes
        })
      }
    );

    if (!response.ok) {
      throw new Error("Server error");
    }

    const data = await response.json();

    output.innerText = data.summary || "No summary received.";

  } catch (error) {
    output.innerText = "Server error 😕";
  }
}