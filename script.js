document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("codeInput");
    const button = document.getElementById("explainBtn");

    const overviewEl = document.getElementById("overview");
    const lineByLineEl = document.getElementById("lineByLine");
    const issuesEl = document.getElementById("issues");

    button.disabled = true;

    input.addEventListener("input", () => {
        const hasText = input.value.trim().length > 0;
        button.disabled = !hasText;

        overviewEl.textContent = "";
        lineByLineEl.textContent = "";
        issuesEl.textContent = "";
    });

    button.addEventListener("click", async () => {
        button.disabled = true;

        overviewEl.textContent = "Analyzing...";
        lineByLineEl.textContent = "";
        issuesEl.textContent = "";

        try {
            const response = await fetch("https://explain-my-code.onrender.com/explain", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code: input.value
                })
            });
            
            const result = await response.json();
            renderResult(result);
        } catch (err) {
            overviewEl.textContent = "Backend error.";
        }

        button.disabled = false
    });

    function renderResult(result) {
        overviewEl.textContent = result.overview;
        lineByLineEl.textContent = result.lineByLine;
        issuesEl.textContent = result.issues;
    }
});