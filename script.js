const checkBtn = document.getElementById("checkBtn");
const subjectInput = document.getElementById("subjectInput");
const totalClassesInput = document.getElementById("totalClasses");
const attendedClassesInput = document.getElementById("attendedClasses");
const resultText = document.getElementById("resultText");

checkBtn.addEventListener("click", function () {
    const subject = subjectInput.value.trim();
    const total = parseInt(totalClassesInput.value);
    const attended = parseInt(attendedClassesInput.value);

    // Validation
    if (!subject || isNaN(total) || isNaN(attended)) {
        resultText.innerText = "Please fill all fields correctly.";
        return;
    }

    if (attended > total || total <= 0 || attended < 0) {
        resultText.innerText = "Entered values are not valid.";
        return;
    }

    // Attendance percentage
    const percentage = ((attended / total) * 100).toFixed(2);

    // Status logic
    let status = "";
    if (percentage >= 75) {
        status = "✅ Safe";
        resultText.innerText =
            `Subject: ${subject}\n` +
            `Attendance: ${percentage}%\n` +
            `Status: ${status}\n\n` +
            `Good job! Your attendance is above 75%.`;
    } else if (percentage >= 65) {
        status = "⚠️ Risk";
        const needed = Math.ceil((0.75 * total - attended) / (1 - 0.75));
        resultText.innerText =
            `Subject: ${subject}\n` +
            `Attendance: ${percentage}%\n` +
            `Status: ${status}\n\n` +
            `You should attend the next ${needed} classes to reach 75%.`;
    } else {
        status = "❌ Danger";
        const needed = Math.ceil((0.75 * total - attended) / (1 - 0.75));
        resultText.innerText =
            `Subject: ${subject}\n` +
            `Attendance: ${percentage}%\n` +
            `Status: ${status}\n\n` +
            `Immediate action needed! Attend the next ${needed} classes to reach 75%.`;
    }
});